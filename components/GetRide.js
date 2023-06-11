import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const GetRide = () => {
	const navigation = useNavigation();

	const goToMap = () => {
		navigation.navigate("MapScreen");
	};

	return (
		<View>
			{/* <TouchableOpacity style={styles.container}>
				<Animatable.View
					animation={"pulse"}
					easing='ease-in-out'
					iterationCount={"infinite"}
				>
					<Text style={styles.ride}>Get a ride -></Text>
				</Animatable.View>
			</TouchableOpacity> */}

			<Button color='#841584' title='Carry on' onPress={goToMap} />
		</View>
	);
};

export default GetRide;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	ride: {
		backgroundColor: "black",
		color: "white",
		padding: 10,
		fontSize: 18,
	},
});
