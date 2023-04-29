import { AccesoryItem } from "../../components/AccessoryItem"
import { BottomSheetModal, BottomSheetModalProvider, } from "@gorhom/bottom-sheet"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useRoom } from "../../hooks/useRoom"
import { StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { Text, View } from "../../components/Themed"
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

    const [accessoryId, setAccessoryId] = useState<string | number[] | undefined>(undefined);

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [isBottomSheetModalVisible, setIsBottomSheetModalVisible] = useState(false);

    // variables
    const snapPoints = useMemo(() => ['50%', '75%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
        setIsBottomSheetModalVisible(true)
    }, []);

    return (
        < BottomSheetModalProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.main}>
                        {
                            !room?.acessories && (
                                <NoAccessories 
                                        iconName={room?.icon} />
                            )
                        }
                        {
                            room?.acessories && (
                                <FlatList
                                    style={styles.flatList}
                                    data={room.acessories}
                                    key={2}
                                    numColumns={2}
                                    keyExtractor={item => item.id as string}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            handlePresentModalPress()
                                            setAccessoryId(item.id)
                                        }}>
                                            <AccesoryItem  
                                                    name={item.name} 
                                                    icon={item.icon} 
                                                    isOn={item.isOn} />
                                        </TouchableOpacity>
                                    )}
                                />
                            )
                        }

                        <BottomSheetModal
                            backgroundStyle={{ backgroundColor: '#16111151' }}
                            ref={bottomSheetModalRef}
                            index={1}
                            snapPoints={snapPoints}
                            onDismiss={()=> setIsBottomSheetModalVisible(false)}>
                                {
                                    room && accessoryId && (
                                        <AccessoryView 
                                        accessoryId={accessoryId} 
                                        roomId={room?.id} />
                                    )
                                }
                        </BottomSheetModal>

                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            router.push({
                                pathname: 'accessory-creator',
                                params: { roomId: id },
                            })
                        }}>
                        <Text style={styles.buttonText}> Adicionar acessório </Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </BottomSheetModalProvider>
    )
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
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
})
