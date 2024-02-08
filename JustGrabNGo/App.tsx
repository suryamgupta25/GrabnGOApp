import * as React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './assets/MenuScreen';
import { Ionicons } from "@expo/vector-icons"; 
import DropDownPicker from 'react-native-dropdown-picker';
import Ingredients from './assets/ingredients';
import {LoginPage} from './assets/Login';
import {SignupPage} from './assets/Signup';
import {ShoppingCart} from './assets/cart'
import {Profile} from './assets/Profile';
import * as sStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function Header(){
  return (
    <SafeAreaView style={{flexDirection: 'row'}} className='items-center'>
      {/* <Text className ='text-[#5856d6] text-[20px] px-12'>
        Grab n' Go Express
       </Text>   */}
      {/* <TouchableOpacity className='m-2'>
        <Ionicons name="ios-home" size={30} color="#5856d6" /> 
      </TouchableOpacity> */}
      <Image className="w-72 h-12 mt-5" source={require("./assets/title_b.png")}/>
    </SafeAreaView>
  );
}

function CartHelper({navigation}){
  return(
    <SafeAreaView>
      <ShoppingCart />
    </SafeAreaView>
  )
}


function HomeScreen({navigation}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Berkshire', value:'Berkshire'},
    {label: 'Franklin', value:'Franklin'},
    {label: 'Hampshire', value:'Hampshire'},
    {label: 'Worcester', value:'Worcester'},
  ]);
  return (
    // SafeArea helps avoid phyisical notches
    <SafeAreaView style = {{backgroundColor: 'white'}} className='items-center h-full'>
      <StatusBar style="auto"/>
      <Header/>
      <SafeAreaView className='space-y-2' style={{flexDirection:'row'}}>
        <Text style = {{fontWeight: 'bold'}} className='text-[20px] text-[#5856d6]r'> 
          {'\n'}
          {''} Select a Dining Hall: {' '}
        </Text>
        <DropDownPicker 
          containerStyle={{width: '35%', zIndex: 1000}}
          listItemContainerStyle={{zIndex:5000}}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
    </SafeAreaView>
      <MenuScreen onPress={(info) => navigation.navigate('Ingredients', {payload: info})} navBack={() => navigation.goBack()} diningHall={value} />
    </SafeAreaView>
  );
}


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [isSignedIn, setSign] = React.useState(false);
  sStore.getItemAsync("Signed").then(r => {
    if(r){
      setSign(true);
    }
  }).catch(e => console.error(e));
  function ProfileHelper({navigation}){
    return(
      <SafeAreaView>
        <Profile signOut={() => {
          sStore.deleteItemAsync("Signed").then(r=>r).catch(e => console.error(e));
          setSign(false)
        }} />
      </SafeAreaView>
    )
  }

  function LoginHelper({navigation}){
    return(
      <SafeAreaView>
        <LoginPage setSignIn={() => setSign(true)} onSignup={() => navigation.navigate("Signup")} />
      </SafeAreaView>
    )
  }

  function SignupHelper({navigation}){
    return(
      <SafeAreaView>
        <SignupPage onBack={() => navigation.goBack()} setStatus={() => setSign(true)} />
      </SafeAreaView>
    )
  }

  const StackNav = () => {
    return (
      <Stack.Navigator>
          { isSignedIn ? (
            <>
              <Stack.Screen name="Grab n' Go Express" component={HomeScreen} options={{headerShown:false}}/>
              <Stack.Screen name="Ingredients" component={Ingredients} options={{headerShown:false}}/>
            </>
          ) : (
            <>  
              <Stack.Screen name='Login' component={LoginHelper} options={{headerShown:false}}/>
              {/* Move these to the top of stack to access: */}
              <Stack.Screen name='Signup' component={SignupHelper} options={{headerShown:false}}/>
            </>
          )}
        </Stack.Navigator>
    )
  }
  const TabNav = () => {
    return(
      isSignedIn ? (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5856d6',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name = 'Main' component={StackNav} options={{headerShown: false}} />
        <Tab.Screen name = "Cart" component={CartHelper} options={{headerShown:false}}/>
        <Tab.Screen name = "Profile" component={ProfileHelper} options={{headerShown:false}}/>
      </Tab.Navigator>
      ) : (
        <>
          <StackNav />
        </>
      )
    )
  }
  return (
    // TODO: Navigation to Signup Page
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
}

export default App;