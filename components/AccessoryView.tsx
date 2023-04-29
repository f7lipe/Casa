import React from "react";
import { StyleSheet, Switch, View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { useRoom } from "../hooks/useRoom";
import { Image } from "expo-image";
import AccessoryImage from "./AccessoryImage";

const AccessoryView = ({ accessoryId, roomId }: Props) => {
  const { getAccessory, updateAccessory } = useRoom();
  const accessory = getAccessory(roomId, accessoryId);


  const toggleAccessory = () => {
    const updatedAccessory = {
      ...accessory,
      isOn: !accessory?.isOn,
    } as Accessory
    updateAccessory(roomId, updatedAccessory);
  };

  return (
    <BlurView tint="light" intensity={100} style={styles.container}>
      <View style={styles.accessoryInfo}>
        <View style={styles.accessory}>
          <AccessoryImage 
                  accessoryName={accessory?.icon || ""}
                  isOn={accessory?.isOn || false} 
                  size={170} />
          <Switch
            style={styles.switch}
            value={accessory?.isOn}
            onValueChange={toggleAccessory}
          />
        </View>
        <Text style={styles.title}>{accessory?.name}</Text>
      </View>
    </BlurView>
  );
};

interface Props {
  accessoryId: string | number[];
  roomId: string | number[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  accessoryInfo: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  accessory: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 170,
    height: 170,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
});

export default AccessoryView;
