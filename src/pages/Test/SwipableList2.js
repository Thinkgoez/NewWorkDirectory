import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    LayoutAnimation,
    TouchableOpacity,
    Platform,
    UIManager,
} from 'react-native';
import Animated from 'react-native-reanimated';
import SwipeableItem from 'react-native-swipeable-item';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useIsFocused } from '@react-navigation/native';

const { multiply, sub } = Animated;

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NUM_ITEMS = 20;
function getColor(i) {
    const multiplier = 255 / (NUM_ITEMS - 1);
    const colorVal = i * multiplier;
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData = [...Array(NUM_ITEMS)].fill(0).map((d, index) => {
    const backgroundColor = getColor(index);
    return {
        text: `Row ${index}`,
        key: `key-${backgroundColor}`,
        backgroundColor,
        height: 100,
    };
});

const App = () => {
    const isFocused = useIsFocused()
    const [data, setData] = useState(initialData)
    let itemRefs = new Map();
    useEffect(() => {
        return () => {
            if(isFocused && itemRefs.has('prev')) itemRefs.get('prev').close()
        }
    }, [isFocused])
    // useEffect(() => {
    //     console.log('Just mounted', isFocused, '+', route?.name)
    //     return () => {
    //         console.log('Just unmounted:', isFocused, '+', route?.name)
    //     }
    // },[])

    // const deleteItem = (item) => {
    //     const updatedData = data.filter((d) => d !== item);
    //     // Animate list to close gap when item is deleted
    //     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    //     setData(updatedData)
    // };

    const renderUnderlayLeft = ({ item, percentOpen }) => (
        <Animated.View
            style={[styles.row, styles.underlayLeft, { opacity: percentOpen }]} // Fade in on open
        >
            <TouchableOpacity onPressOut={() => deleteItem(item)}>
                <Text style={styles.text}>{`[x]`}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    const renderUnderlayRight = ({
        item,
        percentOpen,
        open,
        close,
    }) => (
        <Animated.View
            style={[
                styles.row,
                styles.underlayRight,
                {
                    transform: [{ translateX: multiply(sub(1, percentOpen), -100) }], // Translate from left on open
                },
            ]}>
            <TouchableOpacity onPressOut={close}>
                <Text style={styles.text}>CLOSE</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    const renderItem = ({ item, index, drag }) => {
        return (
            <SwipeableItem
                key={item.key}
                item={item}
                ref={(ref) => {
                    if (ref && !itemRefs.get(item.key)) {
                        itemRefs.set(item.key, ref);
                    }
                }}
                onChange={({ open }) => {
                    if (open) {
                        // Close all other open items
                        // if (itemRefs.get('prev')) itemRefs.get('prev').close();
                        [...itemRefs.entries()].forEach(([key, ref]) => {
                            if (key !== item.key && ref) ref.close();
                        });
                        itemRefs.set('prev', itemRefs.get(item.key))
                        // console.log(itemRefs.get('prev'))
                    }
                }}
                overSwipe={20}
                renderUnderlayLeft={renderUnderlayLeft}
                renderUnderlayRight={renderUnderlayRight}
                snapPointsLeft={[150]}
                snapPointsRight={[175]}>
                <View
                    style={[
                        styles.row,
                        { backgroundColor: item.backgroundColor, height: item.height },
                    ]}>
                    <TouchableOpacity onLongPress={drag}>
                        <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>
                </View>
            </SwipeableItem>
        );
    };


    return (
        <View style={styles.container}>
            <DraggableFlatList
                keyExtractor={(item) => item.key}
                data={data}
                renderItem={renderItem}
                onDragEnd={({ data }) => setData(data)}
                activationDistance={20}
            />
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 32,
    },
    underlayRight: {
        flex: 1,
        backgroundColor: 'teal',
        justifyContent: 'flex-start',
    },
    underlayLeft: {
        flex: 1,
        backgroundColor: 'tomato',
        justifyContent: 'flex-end',
    },
});

