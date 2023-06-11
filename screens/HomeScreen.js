import { useNavigation } from "@react-navigation/native";
import SideMenu from 'react-native-side-menu-updated'

import { useState } from "react";
import {
	Button,
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { selectInternetConnection, selectUser, selectUserName, setUser } from "../Redux/mapSlice";
import { SafeAreaView } from "react-native-safe-area-context";

import MainScreen from "./MainScreen";
import Header from "../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const HomeScreen = () => {

	// {route}
	// connection =  route.params.isConnected;
	// console.log('====================================');
	// console.log("Home Screen Connection "+connection);
	// console.log('====================================');
	// console.warn("home screen connection "+connection);

	const getItems = async()=>{

		const storage = await AsyncStorage.getItem("name");
		console.warn(storage);
	

	}
	




	const dispatch = useDispatch();	
	const navigation = useNavigation();
	const userName = useSelector(selectUserName);
	

	console.log("Username :"+userName);

	const [profile, setProfile] = useState(false);


	const [loaded] = useFonts({
		fredoka: require("../assets/fonts/Fredoka.ttf"),
	  });
	
	  if (!loaded) {
		return null;
	  }
	
	return (
		<>
		<Header/>
		
		
				


				<ScrollView showsVerticalScrollIndicator={false}  >
					
					<View style={{backgroundColor: "white",flexDirection:"column"}}>				
											
						<Text style={{fontSize:36,textAlign:"left",padding:10,fontFamily:"fredoka"}}>Welcome to </Text>
						<Text style={{fontSize:36,textAlign:"left",padding:10,fontFamily:"fredoka"}}>Sharefare App</Text>

					

					<View>
						<Text style={{fontSize:20,textAlign:"left",padding:10,fontWeight:"600",fontFamily:"fredoka"}}>Let's start our journey together!</Text>
					<View  style={{padding:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>

						<View style={{padding:15}}>
						<Image resizeMode="contain" style={{width:100,height:100,}} source={require("../assets/safe-travel.png")} />
						</View>
						<View style={{padding:15}}>
						<Image resizeMode="contain" style={{width:100,height:100,padding:0,}} source={require("../assets/lowPricesImg.png")}/>
						</View>
						
						<View style={{padding:15}}>
						<Image resizeMode="contain" style={{width:100,height:100,padding:0,}} source={require("../assets/comfort-icon.jpg")}/>
						</View>

				
					</View>
					
				
				
					<View  style={{padding:20,flexDirection:"row",justifyContent:"space-between"}}>

						<Image resizeMode="contain" style={{width:100,height:100,padding:20}} source={require("../assets/ontime-removebg-preview.png")}/>
						<Image resizeMode="contain" style={{width:100,height:100,padding:20}} source={require("../assets/avaliable.png")}/>
						<Image resizeMode="contain" style={{width:100,height:100,padding:20}} source={require("../assets/quick-res.png")}/>


				
					</View>

					<View><Text style={{fontSize:30,textAlign:"center",padding:10,fontWeight:"600",fontFamily:"fredoka"}}>About Sharefare</Text></View>
					<View><Text style={{padding:10,lineHeight:30,textAlign:"center",fontFamily:"fredoka",fontSize:16}}>Join Sharefare today and start experiencing the benefits of carpooling - save money, reduce your carbon footprint, and connect with like-minded individuals.</Text></View>
					
					<TouchableOpacity style={{alignItems:"center",justifyContent:"center"}} onPress={()=>navigation.navigate("MainScreen")}>
					<View style={{justifyContent:"center",alignItems:"center", backgroundColor:"#ed6407",width:"80%",margin:15,borderRadius:15}}>

						<Text style={{padding:20,color:"white",fontFamily:"fredoka"}}>Pick a ride</Text>

					</View></TouchableOpacity>

					</View>
					</View>

				</ScrollView>

	
			
			

				
		
				



				</>
		
		
		
	
		
	);
};

export default HomeScreen;

const styles = StyleSheet.create({


	

	
});
