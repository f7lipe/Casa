import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from '../../components/Themed'
import categories from '../../constants/room-category-icons'
import Icon from '../../components/Icon'
import { IconName } from '../../@types/icon'

interface Props {
    isVisible: (condition: boolean) => void
}

interface RoomIconSelectorProps extends Props {
    setIcon: (icon: string) => void
}

interface CategoryItem {
    title: string
    icons: string[]
}

export const RoomIconSelector = React.forwardRef((props: RoomIconSelectorProps, ref: any) => {
    const { setIcon, isVisible } = props

    const handlePress = React.useCallback(
        (icon: string) => {
            setIcon(icon)
            isVisible(false)
        },
        [setIcon, isVisible],
    )

    const renderCategoryItem = React.useCallback(
        ({ item }: { item: CategoryItem }) => {
            const { title, icons } = item
            return (
                <>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.containerIcons}>
                        {icons.map((icon, index) => (
                            <TouchableOpacity
                                key={index}
                                ref={ref}
                                style={styles.button}
                                onPress={() => handlePress(icon)}
                            >
                                <Icon name={icon as IconName} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )
        },
        [handlePress],
    )

    const keyExtractor = React.useCallback(
        (item: CategoryItem, index: number) => item.title + index,
        [],
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={keyExtractor}
                renderItem={renderCategoryItem}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '55%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#c7c7c734',
    },
    containerIcons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff30',
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


