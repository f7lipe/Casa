#include <ArduinoJson.h> // Biblioteca para manipular dados JSON
#include "BluetoothSerial.h"


#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif


// Acessórios
#define RedLed 1
#define GreenLed 2
#define BlueLed 3
#define MotorPin 4


BluetoothSerial SerialBT;


// Define os UUIDs do serviço e da característica Bluetooth
#define SERVICE_UUID        "0000180d-0000-1000-8000-00805f9b34fb"
#define CHARACTERISTIC_UUID "00002a37-0000-1000-8000-00805f9b34fb"


void setup() {
 Serial.begin(115200);
 pinMode(RedLed, OUTPUT);
 pinMode(GreenLed, OUTPUT);
 pinMode(BlueLed, OUTPUT);
 pinMode(MotorPin, OUTPUT);


 SerialBT.begin("ESP32_Home_Control"); // Nome do dispositivo Bluetooth
 Serial.println("O dispositivo foi iniciado, agora você pode pareá-lo com Bluetooth!");
}


void loop() {
 if (SerialBT.available()) { // Se houver dados recebidos pelo Bluetooth
   String data = SerialBT.readString(); // Lê os dados recebidos


   StaticJsonDocument<200> doc; // Cria um objeto JSON


   // Analisa os dados JSON recebidos
   DeserializationError error = deserializeJson(doc, data);


   if (error) { // Se houver um erro na análise
     Serial.print(F("Erro ao analisar o JSON: "));
     Serial.println(error.c_str());
   } else { // Se a análise estiver ok
     int pin = doc["pin"]; // Lê o número do pin do dispositivo
     int state = doc["state"]; // Lê o estado do dispositivo


     // Controla o dispositivo com base no número do pin e no estado
     switch (pin) {
       case 1:
         digitalWrite(RedLed, state);
         break;
       case 2:
         digitalWrite(GreenLed, state);
         break;
       case 3:
         digitalWrite(BlueLed, state);
         break;
       case 4:
         analogWrite(MotorPin, state);
         break;
       default:
         Serial.println("Pin inválido");
         break;
     }
   }
 }
}