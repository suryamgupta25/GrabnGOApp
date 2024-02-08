import Berk from './berk.js';
import Frank from './frank.js';
import Hamp from './hamp.js';
import Woo from './woo.js';
import Order from './order.js';
import { StatusBar } from 'expo-status-bar';
import { SectionList, StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList, Image} from 'react-native';
import getOrder from './order.js';
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      fontWeight: 'bold',
      color: '#5856d6',
      //backgroundColor: 'rgb(200,200,200)',
      backgroundColor: 'white',
    },
    item: {
      padding: 10,
      fontSize: 16,
      height: 44,
      //fontStyle: 'italic',
      //backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#5856d6'
    },
  });

export function ShoppingCart(props){
    const {onPress} = props;
    const render = ({ item }) => (
      <SafeAreaView className='flex flex-row' style={styles.item}>
        <Text>
          {item.name} - Quantity: {item.number}
          {'\t'}
          <TouchableOpacity className='pt-2' onPress={() => removeItem(item.name)}>
            <Text>🗑️</Text>
          </TouchableOpacity>
        </Text>
      </SafeAreaView>
    );

    const [order, setOrder] = React.useState([]);
    const getStored = () => {
      AsyncStorage.getItem("Order")
        .then(r => {
            if(r !== null) setOrder(JSON.parse(r));
            if(r === null) setOrder([]);
        })
        .catch(e => console.error(e));
    }

    React.useEffect(() => getStored(), []);
    useFocusEffect(
      React.useCallback(() => {
        getStored();
      }, [order]));

    function removeItem(name){
      AsyncStorage.getItem("Order")
        .then(r => {
            if(r !== null){
              let s = JSON.parse(r).filter(e => e.name !== name);
              AsyncStorage.setItem("Order", JSON.stringify(s))
              .then(() => console.log("Updated")).catch(e => console.error(e));
              setOrder(s);
            }
        })
        .catch(e => console.error(e));
    }
    function sendOrder(){
      //Send order first => order
      AsyncStorage.removeItem("Order")
      .then(() => console.log("Sent"))
      .catch(e => console.error(e));
    }
    
    return (
      // I made an example order.js json file to use
      <SafeAreaView style = {{ backgroundColor: '#ffd1dc'}} className='h-full items-center'>
        <StatusBar style='auto' />
        <Image style = {{height: 50, width: 55,}} className="mt-[4%]" source={require("./only_logo_b.png")}/>
        <Text className='text-[32px] font-bold'>
          Shopping Cart
        </Text>
        <Text className='text-lg font-bold mt-[10%]'>
          Items: 
        </Text>
        <SafeAreaView className='m-1.5 h-[50%]'>
          <FlatList
            data={order}
            renderItem={render}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
        <TouchableOpacity className="w-48 bg-violet-600 m-5" onPress={sendOrder}>
          <Text className="text-white text-center text-[18px] m-2">Order Items</Text>
        </TouchableOpacity>
        <SafeAreaView className='m-60'></SafeAreaView>
      </SafeAreaView>
      
    )
}