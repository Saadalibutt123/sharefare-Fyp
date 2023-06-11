import {
	View,
	Text,
	TextInput,
	Alert,
	StyleSheet,
	TouchableOpacity,
	Button,
	ImageBackground,KeyboardAvoidingView,
	Image,
} from "react-native";
import React from "react";


import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";

import * as yup from "yup";
import Validator from "email-validator";
import { selectUserName, setUser ,setUserName} from "../Redux/mapSlice";
import { selectUser } from "../Redux/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function UserFormScreen() {


	const setItems = async()=>{

		await AsyncStorage.setItem("name","Saad");


	}

	

	const userLoggedIn = useSelector(selectUser);
	const dispatch = useDispatch();

	const userName = useSelector(selectUserName);

	console.log("username userform : "+userName);



	const navigation = useNavigation();
	const loginValidationSchema = yup.object().shape({
		email: yup
			.string()
			.email("Please enter valid email")
			.required("Email Address is Required"),
		password: yup
			.string()
			.min(6, ({ min }) => `Password must be at least ${min} characters`)
			.required("Password is required"),
	});

	const onLogin = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				
				dispatch(setUser(true));
				setItems();
				console.log(userCredential.user.email);
				dispatch(setUserName(userCredential.user.email));
				navigation.replace("HomeScreen");


			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
			});
	};


	//loading fonts
	const [loaded] = useFonts({
		fredoka: require('../assets/fonts/Fredoka.ttf'),
	  });
	
	  if (!loaded) {
		return null;
	  }



	return (
		<>	
		
			<View style={{width:"100%",flex:1,alignItems:"center",backgroundColor:"#6f54fb"}}>	
			
				<Image
				resizeMode='contain'
			
				style={styles.logo}
				source={require("../assets/shareFareLatestSplashScreenLogo.png")}
			/>
		
			<View style={styles.container}>
			
			{/* <View style={{padding:10}}><Text style={{textAlign:"left",fontSize:30,fontWeight:"800",color: "#6F54FB",}}>Login</Text></View> */}
			<View><Text style={{textAlign:"left",marginBottom:20,padding:20,fontSize:38,fontFamily:"fredoka"}}>Let's, start your Journey! </Text></View>
		
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={(values) => onLogin(values.email, values.password)}
				validationSchema={loginValidationSchema}
				validationOnMount={true}
			>
				{({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
					<>
						
						<View
							style={[
								styles.input,
								{
									borderColor:
										values.email.length < 1 || Validator.validate(values.email)
											? "black"
											: "red",
								},
							]}
						>
							<TextInput
								placeholder='Enter Email'
								keyboardType='email-address'
								textContentType='emailAddress'
								onChangeText={handleChange("email")}
								onBlur={handleBlur("email")}
								value={values.email}
								style={{fontFamily:"fredoka"}}	
							/>
						</View>

						<View
							
							style={[
								styles.input,
								{
									borderColor:
										1 > values.password.length || values.password.length >= 6
											? "black"
											: "red",
								},
							]}
						>
							<TextInput
								placeholder='Enter Password'
								textContentType='password'
								secureTextEntry={true}
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								value={values.password}
								style={{fontFamily:"fredoka"}}	
							/>
						</View>

						

						<TouchableOpacity
							style={styles.btn(isValid)}
							onPress={handleSubmit}
							disabled={!isValid}
						>
							<Text style={styles.btnText}>Login</Text>
						</TouchableOpacity>

						{/* <View style={styles.btn1}>
							<TouchableOpacity>
								<Text style={styles.btn1Text}>Sign in with google</Text>
							</TouchableOpacity>
						</View> */}

						<View style={styles.register}>
							<Text style={{fontFamily:"fredoka"}}>Don't have an account?</Text>
							<TouchableOpacity>
								<Text
									style={styles.register1}
									onPress={() => {
										navigation.push("UserRegistration");
									}}
								>
									Create one
								</Text>
							</TouchableOpacity>
						</View>

					</>
				)}
			</Formik>
			
		</View>


									
			</View>
		
		</>

	);
}

const styles = StyleSheet.create({
	container: {

		display: "flex",
		flex: 1,
		width: "100%",
		height: "100%",
		padding: 30,
		marginTop:30,
		alignItems: "center",
	
		backgroundColor:"white",
		borderTopRightRadius:30,
		borderTopLeftRadius:30,
		justifyContent:"flex-start"
		
		
	},
	logo: {
		width: "100%",
		maxWidth: 300,
		maxHeight: 300,
		
	},

	input: {
		backgroundColor: "white",
		width: "80%",
		height: 50,
		padding: 10,
		margin: 5,
		borderRadius: 10,
		borderWidth: 1,
		
	},

	btn1: {
		backgroundColor: "white",
		marginTop: 10,
		width: "60%",
		padding: 20,
		marginVertical: 5,
		alignItems: "center",
		textAlign: "center",

		borderRadius: 5,
	},

	btn: (isValid) => ({
		marginTop: 20,
		width: "80%",
		backgroundColor: isValid ? "#ed6407" : "#e29561",
		padding: 20,
		marginVertical: 5,
		alignItems: "center",
		textAlign: "center",

		borderRadius: 10,
	}),
	btnText: {
		
		color: "white",
		fontFamily:"fredoka"
	},
	btn1Text: {
		fontWeight: "700",

		color: "black",
	},
	register: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",

		padding: 20,

		flexDirection: "row",
	},
	register1: {
		color: "#ed6407",
		fontWeight: "800",
		fontFamily:"fredoka"
	},
});
