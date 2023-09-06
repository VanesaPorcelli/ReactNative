import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';

const CustomFlatList = ({ data, renderItem, keyExtractor }) => {
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    );
};

export default CustomFlatList;
