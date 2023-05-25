import { Link } from "expo-router"
import { StyleSheet } from "react-native"
import { View, Text } from "../../components/Themed"
import { IconName } from "../../@types/icon"
import Icon from "../../components/Icon"
import  RoundedTile  from "../../components/RoundedTile"

interface RoomItemProps {
  id: string
  name: string
  icon: IconName
}

export function RoomItem({ id, name, icon }: RoomItemProps) {
  return (
    <Link href={`/room/${id}`} asChild>
      <RoundedTile>
        <View style={styles.icon}>
          <Icon name={icon} size={50} />
        </View>
        <Text style={styles.name}>{name}</Text>
      </RoundedTile>
    </Link>
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "transparent",
  },
  name: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
  },
})