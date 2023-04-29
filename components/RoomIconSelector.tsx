import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Text, View } from './Themed';
import categories from '../constants/room-category-icons';
import Icon from './Icon';
import { IconName } from '../@types/icon';

interface Props {
    isVisible: (condition: boolean) => void;
}

interface RoomIconSelectorProps extends Props {
    setIcon: (icon: string) => void;
}

const RoomIconSelector = React.forwardRef((props: RoomIconSelectorProps, ref: any) => {
    const { setIcon, isVisible } = props;
    const handlePress = React.useCallback(
        (icon: string) => {
            setIcon(icon);
            isVisible(false);
        },
        [setIcon, isVisible],
    )

    interface CategoryItem {
        title: string;
        icons: string[];
    }

    const renderCategoryItem = React.useCallback(
        ({ item }: { item: CategoryItem }) => {
            const { title, icons } = item;
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
            );
        },
        [handlePress],
    );

    const keyExtractor = React.useCallback(
        (item: CategoryItem, index: number) => item.title + index,
        [],
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={keyExtractor}
                renderItem={renderCategoryItem}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        padding: 10,
    },
    containerIcons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RoomIconSelector;
