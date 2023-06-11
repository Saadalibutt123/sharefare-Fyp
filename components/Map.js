import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { selectDestination, selectOrigin, setTimeTravelInfo } from "../Redux/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
const Map = () => {
	const origin = useSelector(selectOrigin);
	const destinationLoc = useSelector(selectDestination);
	const mapRef = useRef(null);
	const dispatch = useDispatch();

	


	useEffect(() => {
        if (!origin || !destinationLoc) {return;}
        
        setTimeout(() => {
            mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            });

        }, 500);


    

}, [origin, destinationLoc]);

	
useEffect(()=>{

	if(!origin || !destinationLoc) return;

	const getTraveTime = async ()=>{

		await fetch(

			`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins
			=${origin.description}&destinations=${destinationLoc.description}&key=AIzaSyDN4MV1A5TM5p1YekZ01Im9mDWI48YibW4`

		).then((res)=>res.json())
		.then((data)=>{
			console.log('====================================');
			console.log({data});
			console.log('====================================');
			dispatch(setTimeTravelInfo(data.rows[0].elements[0]));

		});


	}

	getTraveTime();

},[origin,destinationLoc,"AIzaSyDN4MV1A5TM5p1YekZ01Im9mDWI48YibW4"])


// const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins
// =${origin.description}&destinations=${destinationLoc.description}&units=imperial&key=AIzaSyDN4MV1A5TM5p1YekZ01Im9mDWI48YibW4`

	return (
		<MapView
			ref={mapRef}
			provider={PROVIDER_GOOGLE}
			style={styles.mapp}
			mapType='mutedStandard'
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}}
		>
			{origin && destinationLoc && (
				<MapViewDirections
					origin={origin.description}
					destination={destinationLoc.description}
					apikey={"AIzaSyAW34SKXZzfAUZYRkFqvMceV740PImrruE"}
					strokeWidth={5}
					strokeColor='#6f54fb'
				/>
			)}

			{destinationLoc?.location && (
				<Marker
					coordinate={{
						latitude: destinationLoc.location.lat,
						longitude: destinationLoc.location.lng,
					}}
					title='Destination'
					description={destinationLoc.description}
					identifier='destination'
				/>
			)}

			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title='Origin'
					description={origin.description}
					identifier='origin'
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({
	mapp: {
		flex: 1,
	},
});
