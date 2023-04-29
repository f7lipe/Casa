import { Link } from "expo-router"
import { StyleSheet } from "react-native"
import { View, Text } from "./Themed"
import Icon from "./Icon"
import { IconName } from "../@types/icon"

interface RoomItemProps {
  id: string
  name: string
  icon: IconName
}

export default function RoomItem({ id, name, icon }: RoomItemProps) {
  return (
    <Link href={`/room/${id}`} asChild>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icon name={icon} size={50} />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    padding: 10,
    margin: 16,
    borderRadius: 15,
    backgroundColor: "#b5b5b53f",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    backgroundColor: "transparent",
  },
  name: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
  },
})
