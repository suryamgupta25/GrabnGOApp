import React from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthFlow } from "./encrypt";

export function LoginPage(props){
    const {setSignIn, onSignup} = props;
    const [user, onChangeU] = React.useState("");
    const [pass, onChangeP] = React.useState("");

    const handleLogin = async () => {
        const userData = {
            spireId: user,
            password: pass,
            // Add other fields as needed
        };
        
        try {
            const response = await fetch(`http://172.31.134.127:8000/login`, {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "spireId": userData.spireId,
                    "password": userData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('it works');
            console.log(responseData);
            if(responseData !== "SUCCESS. Password mathcesss"){
                Alert.alert("error", "Incorrect credentials")
                return;
            } // Handle the response here
            setSignIn();
            // onSignup(); // Update status after successful signup
        } catch (error) {
            console.error('Error Message is:', error);
            // Handle error scenario, show alert, etc.
        }
    };

    return (
        <SafeAreaView className="items-center w-full h-full bg-rnPurp">
            <SafeAreaView className="items-center mt-[35%]">
                <Image className="w-72 h-36" source={require("./logo_w-2.png")} />
                <TextInput className="border-2 border-zinc-400 p-2 w-64 h-10 bg-white m-2"
                    onChangeText={onChangeU}
                    placeholder="Email"
                    value={user}
                />
                <TextInput className="border-2 border-zinc-400 p-2 w-64 h-10 bg-white m-2"
                    onChangeText={onChangeP}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={pass}
                />
                <TouchableOpacity className="w-48 bg-blue-500 m-2" onPress={() => {
                    if(user=="" || pass==""){
                        Alert.alert("Login Failed", `User/Pass not Entered`);
                    }
                    handleLogin().then(r => console.log("SUCCESS")).catch(e => console.error(e));
                    // else if(user === "T"){
                    //     if(pass === "Hello123There!"){
                    //         setSignIn();
                    //         AuthFlow(user, pass);
                    //     }
                    //     else{
                    //         Alert.alert("Login Failed", `Incorrect password for ${user}`);
                    //     }
                    // }
                    // else{
                    //     Alert.alert("Login Failed", `No user with username ${user}`);
                    // }
                }}>
                    <Text className="text-white text-center m-2">Login!</Text>
                </TouchableOpacity>
                <SafeAreaView className="items-center" style={{flexDirection:'row'}}>
                    <Text className="text-white">
                        Don't have an account? {'\t'}
                    </Text>
                    <TouchableOpacity className="w-20 bg-blue-500" onPress={onSignup}>
                        <Text className="text-[12px] text-center text-white m-2">Sign Up!</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        </SafeAreaView>
    )
}