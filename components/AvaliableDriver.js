import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../Redux/mapSlice";
import { useNavigation } from "@react-navigation/native";
import GetRide from "./GetRide";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

const AvaliableDriver = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	
//loading fonts
const [loaded] = useFonts({
	fredoka: require('../assets/fonts/Fredoka.ttf'),
  });

  if (!loaded) {
	return null;
  }

	
	return (
		<SafeAreaView style={{backgroundColor:"#6f54fb",borderTopLeftRadius:20,borderTopRightRadius:20,flex:1}}>
			<Text style={{ textAlign: "center",fontSize:26,color:"white",marginBottom:20,fontFamily:"fredoka" }}>
				Destination Location
			</Text>
			<View style={{margin:10,borderRadius:15}}>
				<GooglePlacesAutocomplete
					styles={{ container: { flex: 0 }, textInput: { fontSize: 16 ,borderWidth:0.5,fontFamily:"fredoka"} }}
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400}
					query={{
						key: "AIzaSyDN4MV1A5TM5p1YekZ01Im9mDWI48YibW4",
						language: "en",
					}}
					minLength={2}
					onPress={(data, details = null) => {
						dispatch(
							setDestination({
								location: details.geometry.location,
								description: data.description,
							})
						);

						navigation.navigate("RideOptions");
					}}
					fetchDetails={true}
					returnKeyType={"search"}
					enablePoweredByContainer={false}
					
					placeholder='Where to?'
				/>
			</View>
		
			<View style={{alignItems:"center",padding:20}}>
				<TouchableOpacity onPress={()=>navigation.navigate("RideOptions")} style={{justifyContent:"center",borderRadius:15,alignItems:"center",backgroundColor:"#ed6407",width:"80%",padding:20}}><Text style={{color:"white",fontFamily:"fredoka"}}>Avaliable Rides</Text></TouchableOpacity></View>
			
		</SafeAreaView>
	);
};

export default AvaliableDriver;

const styles = StyleSheet.create({});
