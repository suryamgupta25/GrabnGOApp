import Berk from "./berk.js";
import Frank from "./frank.js";
import Hamp from "./hamp.js";
import Woo from "./woo.js";
import {
  SectionList,
  Alert,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
let bm;
let fm;
let hm;
let wm;
async function getMenu() {
  bm = await Berk();
  fm = await Frank();
  hm = await Hamp();
  wm = await Woo();
}
getMenu().then(() => console.log("populated"));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: "bold",
    color: "#5856d6",
    //backgroundColor: 'rgb(200,200,200)',
    backgroundColor: "white",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    //fontStyle: 'italic',
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#5856d6",
  },
});
export default function MenuScreen(props) {
  const { onPress, diningHall } = props;

  const [modalVisible, setModalVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [itemName , setName] = React.useState("");
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleInputChange = (text) => setInputValue(text);

  const handleSave = () => {
    AsyncStorage.getItem("Order")
      .then(r => {
        let s = []
        if(r !== null){
          s = JSON.parse(r);
        }
        s.filter(e => e.name === itemName).length === 0
          ? s.push({name: itemName, number: inputValue})
          : s.filter(e => e.name === itemName)[0].number = inputValue;
        AsyncStorage.setItem("Order", JSON.stringify(s))
        .then(r => {
          Alert.alert("Cart", `Added ${inputValue} ${itemName} to cart.`)
        })
        .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
    setInputValue("");
    hideModal();
  };

  let menu;
  let breaks = [];
  if (diningHall === null) return <SafeAreaView></SafeAreaView>;
  else if (diningHall === "Berkshire" && bm !== 0) {
    menu = bm;
    breaks.push({
      title: "Grab n' Go Breakfast",
      data: menu
        .filter((e) => e["category-name"] == "Grab n'Go Breakfast")
        .map((e) => e["dish-name"]),
    });
    breaks.push({
      title: "Grab n' Go Hot",
      data: menu
        .filter((e) => e["category-name"] == "Grab n'Go Hot ")
        .map((e) => e["dish-name"]),
    });
    breaks.push({
      title: "Grab n' Go Cold",
      data: menu
        .filter((e) => e["category-name"] == "Grab n'Go Cold ")
        .map((e) => e["dish-name"]),
    });
  } else if (diningHall === "Franklin" && fm !== 0) {
    menu = fm;
    breaks.push({
      title: "Grab n' Go Hot",
      data: menu
        .filter((e) => e["category-name"] == "Grab n'Go Hot ")
        .map((e) => e["dish-name"]),
    });
    breaks.push({
      title: "Grab n' Go Cold",
      data: menu
        .filter((e) => e["category-name"] == "Grab n'Go Cold ")
        .map((e) => e["dish-name"]),
    });
  } else if (diningHall === "Hampshire" && hm !== 0) {
    menu = hm;
    breaks.push({
      title: "Grab n' Go Breakfast",
      data: menu
        .filter((e) => e["category-name"] == "Grab n'Go Breakfast")
        .map((e) => e["dish-name"]),
    });
  } else if (diningHall === "Worcester" && wm !== 0) {
    menu = wm;
    breaks.push({
      title: "Grab n' Go Breakfast",
      data: menu
        .filter((e) => e["category-name"] == "Grab n'Go Breakfast")
        .map((e) => e["dish-name"]),
    });
    breaks.push({
      title: "Grab n' Go Hot",
      data: menu
        .filter((e) => e["category-name"] == "Grab n'Go Hot ")
        .map((e) => e["dish-name"]),
    });
  } else {
    return (
      <SafeAreaView className="-z-20">
        <Text>This Grab 'n go location is not open!</Text>
      </SafeAreaView>
    );
  }
  // console.log(diningHall)
  // console.log(menu.filter(e => e['meal-type'] == "Grab n'Go Breakfast").map(e => e.name));
  return (
    <SafeAreaView style={{zIndex: -10}}>
      <SafeAreaView className="h-[90%] w-[88%]">
        <SectionList
          className="mt-5 -z-20 w-96"
          sections={breaks}
          // I changed pressable -> touchable opacity bc it indicates what is pressed
          renderItem={({ item }) => {
            return (
              <SafeAreaView style={styles.item}>
                <Text className="w-[80%] text-[16px]"> {item}</Text>
                <TouchableOpacity
                  className="m-2"
                  style={{ alignItems: "center" }}
                  onPress={() => {
                    setName(item);
                    showModal();
                  }}
                >
                  <Ionicons name="cart-outline" size={24} color="#5856d6"/>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => onPress(item)}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color="#5856d6"
                  />
                </TouchableOpacity>
              </SafeAreaView>
            );
          }}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item) => `menuList-${item}`}
        />
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <SafeAreaView className="bg-white h-full w-full items-center">
          <Text className="m-2.5">How many {itemName}(s)?</Text>
          <TextInput
            className="border-2 border-zinc-400 w-[50%] h-[20px] m-2.5"
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType="numeric"
          />
          <TouchableOpacity className="w-30 bg-violet-600 m-3 p-2" onPress={handleSave}>
            <Text className="text-white">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-30 bg-violet-600 mt-1 p-2" onPress={hideModal}>
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}