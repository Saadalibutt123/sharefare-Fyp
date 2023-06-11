import {
	View,
	Text,
	StyleSheet,
	Button,
	ImageBackground,
	Image,
	TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React, { useState } from "react";
import { selectOrigin, setOrigin } from "../Redux/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import GetRide from "../components/GetRide";

import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AvaliableDriver from "../components/AvaliableDriver";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-gesture-handler";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import { PermissionsAndroid } from "react-native";
import { Platform } from "react-native";
import * as Location from 'expo-location';


const MainScreen = () => {
	
	const dispatch = useDispatch();
	const origin = useSelector(selectOrigin);
	const navigation = useNavigation();
	const [description,setDescription] = useState();

	//loading fonts
	const [loaded] = useFonts({
		fredoka: require('../assets/fonts/Fredoka.ttf'),
	  });
	
	  if (!loaded) {
		return null;
	  }


	  const getCurrentLocation =()=>{

		console.log("Getting current location!!!");
		

	  }


	  //getting current location of device 
	 
	 


	return (
		<>
		<Header />
		
			<View style={{flex:1,backgroundColor:"white"}}>
			{/* GOOGLE PLACES API */}
			
				<View><Text style={{padding:10,fontSize:38,textAlign:"left",fontFamily:"fredoka"}}>Pick up Location</Text></View>
				<View><Text style={{padding:10,fontFamily:"fredoka"}}>HAVE A SAFE JOURNEY!</Text></View>
				<View style={{margin:10,borderRadius:15}}>
					
					<View >
					
						<TouchableOpacity style={styles.btn} onPress={getCurrentLocation} >
							<Text style={{marginBottom:10,fontFamily:"fredoka",fontSize:18,justifyContent:"center"}}>Select your current location</Text>
						</TouchableOpacity>
					
					</View>

				<GooglePlacesAutocomplete
					
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400}
					query={{
						key: "AIzaSyDN4MV1A5TM5p1YekZ01Im9mDWI48YibW4",
						language: "en",
					}}
					minLength={2}
					onPress={(data, details = null) => {

						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);
						setDescription(data.description);
						console.warn("Location set Succesfully");
					}}
					fetchDetails={true}
					
					returnKeyType={"search"}
					enablePoweredByContainer={false}
					styles={{ container: { flex: 0 }, textInput: { fontSize: 16 ,borderWidth:0.5,fontFamily:"fredoka"} }}
					placeholder='Where from?'
				/>
			



			</View>
			
			
			<View style={{height:"40%",backgroundColor:"white",flex:1,borderTopLeftRadius:20,borderTopRightRadius:20,marginTop:80,justifyContent:"space-around",alignItems:"center"}}>
			
			<View style={{justifyContent:"flex-end"}}><Image resizeMode="contain" style={{width:300,height:300,marginTop:20}} source={require("../assets/pickupLocation.png")}/></View>
			

			<TouchableOpacity disabled={!description} onPress={()=>navigation.navigate("MapScreen")}  style={{backgroundColor:"#ed6407",width:"80%",padding:20,borderRadius:15}}>
					
					<Text style={{textAlign:"center",color:"white",fontFamily:"fredoka"}}>Keep going</Text>

			</TouchableOpacity>

			
		
			</View>
			
			</View>

		
		</>
	);
};

export default MainScreen;

const styles = StyleSheet.create({
	textStyle: {
		margin: 10,
		fontWeight: "bold",
		fontSize: 36,
		textAlign: "center",
	},
	container: {
		padding: 20,
		flexDirection: "column",
		justifyContent: "space-around",
		height: "100%",

		
	},
	logo: {
		width: 150,
		height: 150,
	},
	view: {
		flexDirection: "row",
		alignItems: "center",
	},
	btn:{

		backgroundColor:"#ed6407",
		padding:10,
		justifyContent:"center",
		borderRadius:10,
		marginBottom:10,
	}
})
