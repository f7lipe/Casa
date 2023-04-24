import { createContext, useState } from "react"

interface RoomContextData {
    rooms: Room[];
    setRoom: (room: Room) => void;
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

    return (
        <RoomContext.Provider value={{ rooms, setRoom }}>
            {children}
        </RoomContext.Provider>
    );
}