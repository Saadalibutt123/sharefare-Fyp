import {
	View,
	Text,
	TextInput,
	Alert,
	StyleSheet,
	TouchableOpacity,
	Button,
	ImageBackground,
	Image,
} from "react-native";
import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


import { useNavigation } from "@react-navigation/native";


import { Formik } from "formik";
import { useFonts } from "expo-font";
import * as yup from "yup";
import Validator from "email-validator";
import UserFormScreen from "../UserFormScreen";

export default function UserRegistration() {
	
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
		username:yup.string().required("Username is required").min(3, "Username must be at least 3 characters long"),
	});

	const registration =  (email,password) => {


		createUserWithEmailAndPassword(auth, email, password).then((userCredential) => { 

			alert("User Registration Successful");
			console.log({userCredential});
			navigation.goBack("UserFormScreen");


		}).catch((error) => {

			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorMessage);

		 })


	
	}


	//loading fonts
	const [loaded] = useFonts({
		fredoka: require('../../assets/fonts/Fredoka.ttf'),
	  });
	
	  if (!loaded) {
		return null;
	  }




	return (
		<>
		
		<View style={{width:"100%",flex:1,alignItems:"center",backgroundColor:"#6f54fb",height:"100%"}}>	
			
			<Image
			resizeMode='contain'
		
			style={styles.logo}
			source={require("../../assets/shareFareLatestSplashScreenLogo.png")}
		/>
	
			
			<View   style={styles.container}>
				<View style={{padding:20}}><Text style={{textAlign:"left",fontSize:38,marginBottom:20,fontWeight:"400",fontFamily:"fredoka"}}>Register yourself! </Text></View>
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={(values) => registration(values.email, values.password)}
				validationSchema={loginValidationSchema}
				validationOnMount={true}
			>
				{({ handleChange, handleBlur, handleSubmit, values,isValid }) => (
					<>
						<View style={styles.input}>
							
							<TextInput	
									style={{fontFamily:"fredoka"}}			
								placeholder='Enter username'
								textContentType='username'
								onChangeText={handleChange("username")}
								onBlur={handleBlur("username")}
								value={values.username}
							/>
						</View>


						<View style={[styles.input,{

							borderColor:  values.email.length < 1 || Validator.validate(values.email) ? "black" : "red",


						}]}>
							


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

						<View  style={[styles.input,{

							borderColor:  1> values.password.length  || values.password.length >=6 ? "black" : "red",


						}]}>
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
							<Text style={styles.btnText}>Register</Text>
						</TouchableOpacity>

					
						<View style={styles.register}>
							<Text style={{fontFamily:"fredoka"}}	>Already have an account?</Text>
							<TouchableOpacity>
								<Text
									style={styles.register1}
									onPress={() => {
										
										navigation.goBack("UserFormScreen");
									}}
								>
									
									Login
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
		padding: 20,
		
		alignItems: "center",
		
		backgroundColor:"white",
		borderTopRightRadius:30,
		borderTopLeftRadius:30,
		
		justifyContent:"flex-start"
		
		
	},
	logo: {
		width: "100%",
		maxWidth: 300,
		maxHeight:300,
		
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
		fontFamily:"fredoka",
		padding: 20,

		flexDirection: "row",
	},
	register1: {
		color: "#ed6407",
		fontWeight: "800",
	},
});