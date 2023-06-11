import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import DriverComing from "./DriverComing";
import { useFonts } from "expo-font";
import { selectTravelTimeInfo } from "../Redux/mapSlice";
import { useSelector } from "react-redux";
import RadioGroup from 'react-native-radio-buttons-group';
import tw from 'tailwind-react-native-classnames';


const RideOptions = () => {
	const navigation = useNavigation();

	const travelTimeinfo = useSelector(selectTravelTimeInfo);

	const [selected,setSelected] = useState(null);
	
	const data = 
	[

		{id:"Corolla-123",title:"Corolla",multiplier:40,image:"https://o.remove.bg/downloads/1431f516-44b9-4f74-a352-292c7d6af268/cororlla-removebg-preview.png"},
		{id:"Mehran-124",title:"Mehran",multiplier:25,image:"https://o.remove.bg/downloads/89bf1dda-78ed-42ae-a8d9-3d3dab474423/mehran-removebg-preview.png"},
		{id:"WagonR-125",title:"WagonR",multiplier:30,image:"https://o.remove.bg/downloads/94a4d12c-3b69-4a99-8b29-a4a46aaad48b/wagonr-removebg-preview.png"}



	];

	// Radio Buttons
	const [radioButtons, setRadioButtons] = useState([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Male',
            value: 'male'
        },
        {
            id: '2',
            label: 'Female',
            value: 'female'
        }
    ]);
	

	function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
		
    }

	console.warn(radioButtons);

	//loading fonts
	const [loaded] = useFonts({
		fredoka: require('../assets/fonts/Fredoka.ttf'),
	  });
	
	  if (!loaded) {
		return null;
	  }

	  console.warn(selected);

	return (
		<View style={styles.container}>
				<View style={{padding:8,flexDirection:"row",justifyContent:"center"}}>
					<TouchableOpacity style={{padding:3,marginRight:10}} onPress={()=>navigation.goBack("AvaliableDriver")} >
						<Image  style={{width:30,height:30}} source={require('../assets/backArrow.png')} />
						</TouchableOpacity>
					<Text style={{textAlign:"center",fontFamily:"fredoka",color:"white",fontSize:28}}>Select a ride
					 </Text>
					

					</View>
					<Text  style={{textAlign:"center",fontFamily:"fredoka",color:"white",fontSize:22,marginBottom:20}}>Travel distance {travelTimeinfo?.distance.text }</Text>

				{/* Drivers */}


				<FlatList style={{}} data={data} keyExtractor={(item)=>item.id}

					renderItem ={({item:{id,title,multiplier,image},item})=>(

							<TouchableOpacity onPress={()=>setSelected(item)
								}
							
								style={tw`flex-row justify-between items-center ${id === selected?.id && "bg-purple-900" } ${id === selected?.id && "rounded-2xl" }  `}

							 >
								<Image source={{uri:image}} style={{width:60,height:60,resizeMode:"contain"}} />
								
								<View style={{marginRight:20}}>
								<Text  style={{fontWeight:"bold",color:"white",fontFamily:"fredoka",fontSize:18}}>{title}</Text>
								<Text style={{fontFamily:"fredoka",color:"white"}} >{travelTimeinfo?.duration.text}</Text>
							
								</View>
								
								<RadioGroup 
								style={{color:"white",alignItems:"center",fontFamily:"fredoka"}}
            					radioButtons={radioButtons} 
            					onPress={onPressRadioButton} 
								layout='column'
        						/>
								
							
								<Text style={{fontFamily:"fredoka",color:"white",margin:10,fontWeight:"bold",}}>{travelTimeinfo?.duration.value * multiplier / 100} Pkr</Text>
							</TouchableOpacity>
							
							

					)}


				/>
							<View style={{justifyContent:"center",alignItems:"center"}} >
							 <TouchableOpacity onPress={()=>navigation.navigate("DriverComing")} disabled={!selected} style={{backgroundColor:"#ed6407",width:"80%",justifyContent:"center",borderRadius:16,textAlign:"center"}} ><Text style={{padding:20,fontFamily:"fredoka",color:"white",textAlign:"center"}}>Choose {selected?.title}</Text></TouchableOpacity>
							 </View>

		</View>
	);
};

export default RideOptions;

const styles = StyleSheet.create({
	container: {
		
		backgroundColor:"#6f54fb",
		flex:1,
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		color :"white",
		
		maxWidth:"100%",
		padding:20,
		
		
	},
	
	
});
