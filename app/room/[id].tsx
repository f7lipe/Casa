import { AccesoryItem } from "../../layouts/Accessory"
import AccessoryView from "../../layouts/Accessory/AccessoryView"
import EmptyRoom from "../../layouts/Room/EmptyRoom"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useRoom } from "../../hooks/useRoom"
import CustomBackdrop from "../../components/Backdrop"
import Handle from "../../components/Handle"

export default function Room() {
    const { id } = useLocalSearchParams() as { id: string }
    const { getRoom } = useRoom()
    const router = useRouter()

    const [room, setRoom] = useState<Room | undefined>(undefined)

    useEffect(() => {
        if (id) setRoom(getRoom(id))
    }, [id])

    const [accessoryId, setAccessoryId] = useState<string | number[] | undefined>(undefined);

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['50%', '90%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const renderAccessoryList = (): React.ReactElement => (
        <FlatList
            style={styles.flatList}
            data={room?.acessories}
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

    const renderEmptyList = (): React.ReactElement => (
        <EmptyRoom roomIcon={room?.icon} />
    )

    const renderAccessoryView = (): React.ReactElement => (
        <BottomSheetModal
            backdropComponent={CustomBackdrop}
            handleComponent={Handle}
            backgroundStyle={{ backgroundColor: '#0f0e0e28' }}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}>
            {
                room && accessoryId && (
                    <AccessoryView
                        accessoryId={accessoryId}
                        roomId={room?.id} />
                )
            }
        </BottomSheetModal>
    )

    const renderAddButton = (): React.ReactElement => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                router.push({
                    pathname: 'accessory-creator',
                    params: { roomId: id },
                })
            }}>
            <Text
                style={styles.buttonText}> Adicionar acessório </Text>
        </TouchableOpacity>
    )


    return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.main}>
                        {
                            room?.acessories?.length ? renderAccessoryList() : renderEmptyList()
                        }

                        {
                            renderAccessoryView()
                        }
                    </View>

                    {
                        renderAddButton()
                    }

                </View>
            </SafeAreaView>
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