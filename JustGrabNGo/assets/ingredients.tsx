import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Button, TextInput} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 


export default function Ingredients({navigation, route}){
    const {payload} = route.params;
    // console.log(payload);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const handleInputChange = (text) => setInputValue(text);

    const handleSave = () => {
        console.log('Entered text:', inputValue);
        hideModal();
    };
    return(
        <SafeAreaView style={{backgroundColor: 'white'}} className="h-full">
            <TouchableOpacity style={{backgroundColor:"white", width:'18%'}} className="p-2" onPress={() => navigation.goBack()}>
                <Text className="text-[20px] text-[#5856d6]">{'< '}Back</Text>
            </TouchableOpacity>
            <View style = {{backgroundColor: 'white'}} className="items-center">
                <View style = {{flexDirection:'row'}} className = 'p-4'>
                    <Text className="items-center text-[22px] text-[#5856d6]">
                        {payload} {' '}
                        {'\n'}  
                    </Text>
                    <TouchableOpacity className="" onPress={showModal}>
                        <Ionicons name="cart-outline" size={35} color="#5856d6" /> 
                    </TouchableOpacity>
                </View>
                {/* Fake ingredients and diets*/}
                <Text className="items-left text-[16px] font-bold">Ingredients: </Text>
                <Text className="ml-2">
                    olive oil, yellow onion -diced, ground beef, chili powder, ground cumin, granulated sugar, 
                    tomato paste, garlic powder, teaspoons salt, ground black pepper, beef broth, 
                    petite diced tomatoes, red kidney beans, tomato sauce
                {'\n'}
                </Text>
                <Text className="items-left text-[16px] font-bold">Diets: </Text>
                <Text>
                    Vegetarian, Halal, Vegan
                    {'\n'}
                </Text>
                <Text className="items-left text-[16px] font-bold">Allergens: </Text>
                <Text>
                    Soy, Fish...
                </Text>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={hideModal}
                >
                    <SafeAreaView className="bg-white h-full w-full items-center">
                        <Text className="m-2.5">Enter a Number:</Text>
                        <TextInput className="border-2 border-zinc-400 w-[50%] h-[20px] m-2.5"
                            value={inputValue}
                            onChangeText={handleInputChange}
                        />
                        <Button title="Save" onPress={handleSave} />
                        <Button title="Cancel" onPress={hideModal} />
                    </SafeAreaView>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        flex: 1
    },
    
    ingred: {
      padding: 10,
      fontSize: 16,
      height: 44,
      //fontStyle: 'italic',
      backgroundColor: '#fff'
    },
  });