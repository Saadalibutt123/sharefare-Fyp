import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
	Button,
	Image,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider, useSelector } from "react-redux";
import UserFormScreen from "../components/UserFormScreen";
import HomeScreen from "../screens/HomeScreen";
import MainScreen from "../screens/MainScreen";
import MapScreen from "../screens/MapScreen";
import DriverComing from "../components/DriverComing";
import UserRegistration from "../components/UserAuthentication/UserRegistration"
import { store } from "../Redux/store";
import { selectUser } from "../Redux/mapSlice";
import { createAppContainer } from "react-navigation";
import {createDrawerNavigator} from "react-native-drawer";
import { Dimensions } from "react-native";
import AvaliableDriver from "../components/AvaliableDriver";
import Map from "../components/Map";
import RideOptions from "../components/RideOptions";


export default function SignedInStack() {

    console.log('====================================');
    // console.log("Signed in Stack Connection"+isConnected);
    console.log('====================================');

    

	const Stack = createNativeStackNavigator();

     const user = useSelector(selectUser);
    
	 console.log("user logged in : "+user);

   
	return (
		<Provider store={store} style={styles.root}>
			<NavigationContainer>
				<SafeAreaProvider>
					<Stack.Navigator>
						
						<Stack.Screen
							name='HomeScreen'
							component={HomeScreen}
                            //  initialParams={{ isConnected }}
							options={{ headerShown: false }}
						/>
                       

						<Stack.Screen
							name='MainScreen'
							component={MainScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='MapScreen'
							component={MapScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='Map'
							component={Map}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='DriverComing'
							component={DriverComing}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='UserRegistration'
							component={UserRegistration}
							options={{ headerShown: false }}
						/>
							<Stack.Screen
							name='UserFormScreen'
							component={UserFormScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='AvaliableDriver'
							component={AvaliableDriver}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='RideOptions'
							component={RideOptions}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "#F9FBFC",
	},
});