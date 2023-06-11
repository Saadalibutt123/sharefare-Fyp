import React, { useEffect, useState } from "react";
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
	ToastAndroid,
	View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainScreen from "./screens/MainScreen";
import HomeScreen from "./screens/HomeScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./Redux/store";
import MapScreen from "./screens/MapScreen";
import GetRide from "./components/GetRide";
import DriverComing from "./components/DriverComing";
import UserFormScreen from "./components/UserFormScreen";
import UserRegistration from "./components/UserAuthentication/UserRegistration";
import { setInternetStatus, selectUser } from "./Redux/mapSlice";
import SignedInStack from "./userStacks/SignedInStack";
import NotSignedInStack from "./userStacks/NotSignedInStack";
import UserAuthStack from "./userStacks/UserAuthStack";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";


export default function App() {
	const Stack = createNativeStackNavigator();

	const [isConnected,setConnection] = useState(true);
	
	const [storedCredentials,setstoredCredentials]= useState("");

	


	useEffect(()=>{

			const unsubscribe = NetInfo.addEventListener(state=>{

				// console.log(state.isConnected);
				// console.warn("Wifi Connected",state.isConnected);
				setConnection(state.isConnected);

				

			});

			return()=>{

				unsubscribe();
				
			}


	},[]);



	// Request Push Notification permission from device.
	const requestPermission = async () => {
	const authStatus = await messaging().requestPermission();
	const enabled =
	  authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
	if (enabled) {
	  console.log('Authorization status:', authStatus);
	}

	const token = await messaging().getToken();
	console.log({token});

  };

  useEffect(()=>{

	requestPermission();

  },[]);


  
	return (
		
		
		

	 <Provider store={store} style={styles.root}>
			
			
		 {isConnected ?"":alert("Internet must be Connected !!!")  } 
			

			 <UserAuthStack isConnected={isConnected}/>

				

		 </Provider>
	
	);

}


const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "#F9FBFC",
	},
});
