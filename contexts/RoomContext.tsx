import { createContext, useState } from "react"

interface RoomContextData {
    rooms: Room[]
    setRoom: (room: Room) => void
    getRoom: (id: string) => Room | undefined
    updateRoom: (room: Room) => void
    addAccessory: (roomId: string, accessory: Accessory) => void
    getAccessory: (roomId: string, accessoryId: string) => Accessory | undefined
}

export const RoomContext = createContext({} as RoomContextData);

interface RoomProviderProps {
    children: React.ReactNode;
}

export function RoomProvider({ children } : RoomProviderProps) {
    const [rooms, setRooms] = useState<Room[]>([]);

    function setRoom(room: Room) {
        setRooms([...rooms, room]);
    }

    function getRoom(id: string) {
        return rooms.find(room => room.id === id);
    }

    function updateRoom(room: Room) {
        const index = rooms.findIndex(r => r.id === room.id);
        rooms[index] = room;
        setRooms([...rooms]);
    }

    function addAccessory(roomId: string, accessory: Accessory) {
        const room = getRoom(roomId);
        if (!room) return;
      
        const accessories = room.acessories || []; // Verifique se room.acessories é indefinido e, se for, defina como uma matriz vazia.
        room.acessories = [...accessories, accessory];
        updateRoom(room);
      }

    function getAccessory(roomId: string, accessoryId: string) {
        const room = getRoom(roomId);
        if (!room) return;
      
        return room.acessories?.find(accessory => accessory.id === accessoryId);
    }
      

    return (
        <RoomContext.Provider value={{ rooms, setRoom, getRoom, updateRoom, addAccessory, getAccessory }}>
            {children}
        </RoomContext.Provider>
    );
}