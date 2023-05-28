import { useContext } from "react";
import { BLEContext } from "../contexts/BLEContext";

export function useBLE(){
  const value = useContext(BLEContext)
  if (!value) {
    throw new Error('useRoom must be used within a RoomProvider')
  }
  return value
}