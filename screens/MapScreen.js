import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Map from "../components/Map";
import AvaliableDriver from "../components/AvaliableDriver";
import RideOptions from "../components/RideOptions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetRide from "../components/GetRide";
const MapScreen = () => {
	const Stack = createNativeStackNavigator();

	return (
		<View>
			<View style={styles.container1}>
			<Map />
			</View>
			<View style={styles.container2}>
				<Stack.Navigator>
					<Stack.Screen
						component={AvaliableDriver}
						name='AvaliableDriver'
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						component={RideOptions}
						name='RideOptions'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						component={GetRide}
						name='GetRide'
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</View>
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	container1: {
		height: "50%",
	},
	container2: {
		height: "50%",
	},
});
