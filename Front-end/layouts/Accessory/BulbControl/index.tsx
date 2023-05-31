import React from "react"
import { StyleSheet, Switch, Text, View } from "react-native"
import { useRoom } from "../../../hooks/useRoom"
import AccessoryImage from "../../../components/AccessoryImage"
import { useBLE } from "../../../hooks/useBLE"

interface Props {
  accessoryId: string | number[]
  roomId: string | number[]
}

export const BulbControl = ({ accessoryId, roomId }: Props) => {
  const { getAccessory, updateAccessory } = useRoom()
  const accessory = getAccessory(roomId, accessoryId)

  const { toggleAccessoryState } = useBLE()

  const toggleAccessory = async() => {
    const updatedAccessory = {
      ...accessory,
      isOn: !accessory?.isOn,
    } as Accessory
    updateAccessory(roomId, updatedAccessory)
    await toggleAccessoryState(accessory?.port || 0 , accessory?.isOn ? 0 : 1)
  }

  return (
      <View 
          style={styles.accessoryInfo}>
        <View 
            style={styles.accessory}>
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
        <Text 
            style={styles.title}>Sem informações de consumo</Text>
      </View>

  )
}

const styles = StyleSheet.create({
  accessoryInfo: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 20,
  },
  accessory: {
    alignItems: "center",
    marginBottom: 20,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "300",
    marginBottom: 20,
    color: "black",
  },
})