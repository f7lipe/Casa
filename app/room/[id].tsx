import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { Text, View } from "../../components/Themed"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useRoom } from "../../hooks/useRoom"
import { StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { AccesoryItem } from "../../components/AccessoryItem"
import{ BottomSheetModal, BottomSheetModalProvider, } from "@gorhom/bottom-sheet"
import AccessoryView from "../../components/AccessoryView"
import NoAccessories from "../../components/NoAccessories"

export default function Room() {
    const { id } = useLocalSearchParams() as { id: string }
    const { getRoom } = useRoom()
    const router = useRouter()

    const [room, setRoom] = useState<Room | undefined>(undefined)

    useEffect(() => {
        if (!id) return
        setRoom(getRoom(id))
    }, [id])


    const [isOpen, setIsOpen] = useState(false);
    const [accessoryId, setAccessoryId] = useState<string | undefined>(undefined);

    const bottomSheetModalRef = useRef(null);
  
    const snapPoints = ["25%", "48%", "75%"];
  
    function handlePresentModal() {
      bottomSheetModalRef.current?.present();
      setTimeout(() => {
        setIsOpen(true);
      }, 100);
    }

    return (
        < BottomSheetModalProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                   
                    <View style={styles.main}>
                        {
                            !room?.acessories && (
                                <NoAccessories roomName={room?.icon} />
                            )
                        }
                        {
                            room?.acessories && (
                                <FlatList
                                    style={styles.flatList}
                                    data={room.acessories}
                                    key={2}
                                    numColumns={2}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            handlePresentModal()
                                            setAccessoryId(item.id)
                                        }}>
                                            <AccesoryItem name={item.name} icon={item.icon} isOn={item.isOn} />
                                        </TouchableOpacity>
                                    )}
                                />
                            )
                        }
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={1}
                            snapPoints={snapPoints}
                            backgroundStyle={{ borderRadius: 50 }}
                            onDismiss={() => setIsOpen(false)} >
                            <AccessoryView accessoryId={accessoryId} roomId={room?.id} />
                        </BottomSheetModal>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            router.push({
                                pathname: 'accessory-creator',
                                params: { roomId: id },
                            });
                        }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar acessório</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </BottomSheetModalProvider>
    )
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
        justifyContent: "space-between"
    },
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    title: {
        fontSize: 64,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 36,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#ffd94e',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
        marginBottom: 24,
        position: 'absolute',
        bottom: 0
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#232323',
    },
    flatList: {
        width: '100%',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
})
