import React from "react"
import { StyleSheet, View } from "react-native"
import { useRoom } from "../../../hooks/useRoom"
import AccessoryImage from "../../../components/AccessoryImage"
import { useBLE } from "../../../hooks/useBLE"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "../../../components/Icon"

interface Props {
  accessoryId: string | number[]
  roomId: string | number[]
}

export const GateControl = ({ accessoryId, roomId }: Props) => {
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

          <TouchableOpacity
            style={styles.switch}
            onPress={toggleAccessory}
          >
            <Icon 
              name="GateControl"
              size={120}/>
          </TouchableOpacity>
          
        </View>
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
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 24,
    fontWeight: "300",
    marginBottom: 20,
    color: "black",
  },
})