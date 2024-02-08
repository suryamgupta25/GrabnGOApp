import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'

const style = StyleSheet.create({
    press: {
        backgroundColor: 'pink',
        margin: 2,
        flex: 1,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: "center",
    }
});
export default function card(props){
    const{onPress} = props;
    return(
        <Pressable style={style.press} onPress={onPress}>
            <View>
                <Text>Berkshire{'\n'}</Text>
            </View>
        </Pressable>
    );
}

