#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <ArduinoJson.h>

BLEServer* pServer = nullptr;
BLECharacteristic* pCharacteristic = nullptr;
bool deviceConnected = false;
bool oldDeviceConnected = false;
uint32_t value = 0;

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

#define LED_PIN 2
#define PIN_15 15
#define PIN_32 32

class MyServerCallbacks : public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
        deviceConnected = true;
        BLEDevice::startAdvertising();
    };

    void onDisconnect(BLEServer* pServer) {
        deviceConnected = false;
    }
};

void processJSON(const char* json) {
    StaticJsonDocument<100> doc;
    DeserializationError error = deserializeJson(doc, json);

    if (error) {
        Serial.print("JSON deserialization error: ");
        Serial.println(error.c_str());
        return;
    }

    if (doc.containsKey("pin") && doc.containsKey("state")) {
        if (doc["pin"].is<int>() && doc["state"].is<int>()) {
            int pin = doc["pin"].as<int>();
            int state = doc["state"].as<int>();

            // Perform actions based on the received pin and state values
            digitalWrite(pin, state);
            Serial.println(pin);
            Serial.println(state);
        } else {
            Serial.println("Invalid pin or state type in JSON");
        }
    } else {
        Serial.println("Invalid JSON format");
    }
}

class MyCallbacks : public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic* pCharacteristic) {
        std::string value = pCharacteristic->getValue();
        if (value.length() > 0) {
            // Convert the received value to a C-string
            char* json = new char[value.length() + 1];
            memcpy(json, value.c_str(), value.length() + 1);

            // Process the received JSON
            processJSON(json);

            delete[] json;
        }
    }
};

void setup() {
    Serial.begin(115200);

    pinMode(PIN_15, OUTPUT);
    pinMode(PIN_32, OUTPUT);

    pinMode(LED_PIN, OUTPUT);
    // Create the BLE Device
    BLEDevice::init("ESP32");

    // Create the BLE Server
    pServer = BLEDevice::createServer();
    pServer->setCallbacks(new MyServerCallbacks());

    // Create the BLE Service
    BLEService* pService = pServer->createService(SERVICE_UUID);

    // Create a BLE Characteristic
    pCharacteristic = pService->createCharacteristic(
        CHARACTERISTIC_UUID,
        BLECharacteristic::PROPERTY_READ   |
        BLECharacteristic::PROPERTY_WRITE  |
        BLECharacteristic::PROPERTY_NOTIFY |
        BLECharacteristic::PROPERTY_INDICATE
    );

    // Add the characteristic callbacks
    pCharacteristic->setCallbacks(new MyCallbacks());

    // Create a BLE Descriptor
    pCharacteristic->addDescriptor(new BLE2902());

    // Start the service
    pService->start();

    // Start advertising
    BLEAdvertising* pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->setScanResponse(false);
    pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
    pAdvertising->setMinPreferred(0x12);
    BLEDevice::startAdvertising();

    Serial.println("Waiting for a client connection to notify...");
}

void loop() {
    // notify changed value
    if (deviceConnected) {
        pCharacteristic->setValue((uint8_t*)&value, 4);
        pCharacteristic->notify();
        value++;
        delay(10);
    }

    // disconnecting
    if (!deviceConnected && oldDeviceConnected) {
        delay(500);
        pServer->startAdvertising();
        Serial.println("Start advertising");
        oldDeviceConnected = deviceConnected;
    }

    // connecting
    if (deviceConnected && !oldDeviceConnected) {
        // Do something on connecting
        oldDeviceConnected = deviceConnected;
    }
}