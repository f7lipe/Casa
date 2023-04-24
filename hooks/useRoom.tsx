import { useContext } from "react"
import { RoomContext } from "../contexts/RoomContext"

export function useRoom() {
    const value = useContext(RoomContext)
    if (!value) {
        throw new Error('useRoom must be used within a RoomProvider')
    }
    return value
}