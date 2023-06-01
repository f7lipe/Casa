import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { BlurView } from "expo-blur"
import { useRoom } from "../../hooks/useRoom"
import { AcControl } from "./AcControl"
import { BulbControl } from "./BulbControl"
import { RemoteControl } from "./RemoteControl"
import { GateControl } from "./GateControl"
import Icon from "../../components/Icon"

interface Props {
  accessoryId: string | number[]
  roomId: string | number[]
}

const AccessoryView = ({ accessoryId, roomId }: Props) => {
  const { getAccessory } = useRoom()
  const accessory = getAccessory(roomId, accessoryId)
  
  enum AccessoryType {
    AcAccessory = "AcAccessory",
    BulbAccessory = "BulbAccessory",
    SmartTvAccessory = "SmartTvAccessory",
    GateAccessory = "GateAccessory",
    OutletAccessory = "OutletAccessory",
    RgbLedAccessory = "RgbLedAccessory",
  }

  const renderAccessoryControls = () => {
    switch (accessory?.type as AccessoryType) {
      case "BulbAccessory":
        return <BulbControl roomId={roomId} accessoryId={accessoryId} />
      case "SmartTvAccessory":
        return <RemoteControl roomId={roomId} accessoryId={accessoryId} />
      case "GateAccessory":
        return <GateControl roomId={roomId} accessoryId={accessoryId} />
      case "AcAccessory":
        return <AcControl roomId={roomId} accessoryId={accessoryId}/>
      default:
        return <Text>Unknown accessory type</Text>
    }
  }

  return (
    <BlurView 
        tint="light" 
        intensity={100} 
        style={styles.container}>
          <View style={styles.accessoryInfo}>
            <Text style={styles.acessoryTitle}> {accessory?.name} </Text>
            <Icon name="Close" size={32} color="gray" />
          </View>
        {
            renderAccessoryControls()
        }

    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accessoryInfo: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#9c9c9c",
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
  acessoryTitle:{
    fontSize: 24,
    fontWeight: "bold",
  }
})

export default AccessoryView
