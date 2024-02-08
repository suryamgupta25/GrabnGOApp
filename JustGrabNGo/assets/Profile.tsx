import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from "react-native";

export function Profile(props){
    const {signOut} = props;
    return(
        <SafeAreaView className="h-full" style = {{ backgroundColor: '#ffc1ea'}}>
            <Text className="self-center text-[24px] font-bold">{'\n'}John Doe{'\n'}</Text>
            <View className="items-center pl-[10%]">
                <View style={{flexDirection: 'row'}}>
                    <Text style={style.lCol}>Spire ID</Text>
                    <Text style={style.rCol}> {'\t\t'}12345678</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={style.lCol}>Email</Text>
                    <Text style={style.rCol}> {'\t\t'}jdoe@umass.edu</Text>
                </View>
                {/* <View style={{flexDirection: 'row'}}>
                    <Text style={style.lCol}>Bio</Text>
                    <Text style={style.rCol}> {'\t\t'}Filler</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={style.lCol}>Private Profile</Text>
                    <Text style={style.rCol}> {'\t\t'}Checkbox???</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={style.lCol}>Notifications</Text>
                    <Text style={style.rCol}> {'\t\t'}Checkbox???</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={style.lCol}>Push Notifs???</Text>
                    <Text style={style.rCol}> {'\t\t'}Checkbox???</Text>
                </View> */}
            </View>
            <View className="items-center">
                    <TouchableOpacity className="w-30 bg-blue-500 m-5" onPress={signOut}>
                        <Text className="text-[20px] text-center text-white m-2">Sign out</Text>
                    </TouchableOpacity>
            </View>
            <SafeAreaView className='m-60'></SafeAreaView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    name:{

    },
    lCol:{
        flex: 1/3,
        fontSize: 16,
        lineHeight: 24
    },
    rCol:{
        flex: 2/3,
        fontSize: 16,
        lineHeight: 24
    }
});