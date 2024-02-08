import React from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import { AuthFlow } from "./encrypt";

export function SignupPage(props){
    const {onBack, setStatus} = props;
    // I hope I did the onChange right
    const [user, onChangeU] = React.useState("");
    const [email, onChangeE] = React.useState("");
    const [spire, onChangeS] = React.useState("");
    const [pass, onChangeP] = React.useState("");
    const [repeat, onChangeR] = React.useState("");

    const handleSignUp = async () => {
        const userData = {
            name: user,
            email: email,
            spireId: spire,
            password: pass,
            // Add other fields as needed
        };


        // add x later to x: /addcustomer/${queryString} to const response = await fetch(`http://127.0.0.1:8000
        
        try {
            const response = await fetch(`http://172.31.134.127:8000/addcustomer`, {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": userData.name,
                    "email": userData.email,
                    "spireId": userData.spireId,
                    "password": userData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('it works');
            console.log(responseData); // Handle the response here
            setStatus(); // Update status after successful signup
        } catch (error) {
            console.error('Error Message is:', error);
            // Handle error scenario, show alert, etc.
        }
    };

    return (
        // TODO: Make logo larger without moving text boxes, logo_w-2 has less empty space but still doesn't work!
        <SafeAreaView className="items-left bg-rnPurp">  
            <TouchableOpacity onPress={onBack}>
                    <Text className="color-white items-left text-lg mt-[2%]">
                        {' '} Back
                    </Text>
                </TouchableOpacity>
            <SafeAreaView className="items-center w-full h-full bg-rnPurp">
                {/* <Image style = {{flex: 1, width: '100%', height: undefined}} source={require("./logo_w.png")} /> */}
                <Image className="w-48 h-24 mb-1" source={require("./logo_w-2.png")} />
                <SafeAreaView className="items-center mt-[0px]">
                <Text className="color-white text-lg font-bold text-left">Create your account:</Text>
                    <TextInput className="border-2 border-zinc-400 p-2 w-64 h-10 bg-white m-2"
                        onChangeText={onChangeU}
                        placeholder="Name"
                        value={user}
                    />
                    <TextInput className="border-2 border-zinc-400 p-2 w-64 h-10 bg-white m-2"
                    onChangeText={onChangeE}
                    placeholder="UMass Email"
                    value={email}
                    />
                    <TextInput className="border-2 border-zinc-400 p-2 w-64 h-10 bg-white m-2"
                    onChangeText={onChangeS}
                    placeholder="Spire ID"
                    value={spire}
                    />
                    <TextInput className="border-2 border-zinc-400 p-2 w-64 h-10 bg-white m-2"
                        onChangeText={onChangeP}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={pass}
                    />
                    <TextInput className="border-2 border-zinc-400 p-2 w-64 h-10 bg-white m-2"
                        onChangeText={onChangeR}
                        placeholder="Re-enter Password"
                        secureTextEntry={true}
                        value={repeat}
                    />
                    <TouchableOpacity className="w-48 bg-blue-500 m-2" onPress={() => {
                        if(user == ""){
                            Alert.alert("Sign Up Failed", "Empty Name Field");
                            return;
                        }
                        if(email == ""){
                            Alert.alert("Sign Up Failed", "Empty email Field");
                            return;
                        }
                        function isValidEmail(e) {
                            // Regular expression for a simple email validation
                            const emailRegex = /^[^\s@]+@([^\s@]+\.)?umass\.edu$/;
                            return emailRegex.test(e);
                        }
                        if(!isValidEmail(email)){
                            Alert.alert("Sign Up Failed", "Invalid Email Format. Are you using your umass email?");
                            return;
                        }
                        if(spire == ""){
                            Alert.alert("Sign Up Failed", "Empty Spire ID Field");
                            return;
                        }
                        if(spire.length > 8 || spire.length < 8){
                            Alert.alert("Sign Up Failed", "Spire ID should be 8 numbers");
                            return;
                        }
                        if(!Number.isInteger(Number(spire))){
                            Alert.alert("Sign Up Failed", "Spire ID is not a number");
                            return;
                        }
                        if(pass == "" || repeat == ""){
                            Alert.alert("Sign Up Failed", "Empty Password/Re-enter Field");
                            return;
                        }
                        if(pass !== repeat){
                            Alert.alert("Sign Up Failed", "Passwords must match");
                            return;
                        }
                        handleSignUp();
                        // AuthFlow(email, pass);
                    }}>
                        <Text className="text-white text-center m-2">Sign Up!</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        </SafeAreaView> 
    )
}