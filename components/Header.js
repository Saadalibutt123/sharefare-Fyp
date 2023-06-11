import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {UserFormScreen} from "./UserFormScreen"
import {signOut} from 'firebase/auth'
import { auth } from '../firebase';


const Header = () => {
    
    const [istoggle,setToggle] = useState(false);
    console.warn(istoggle);
    const navigation = useNavigation();
  
    const logout = async ()=>{

      await AsyncStorage.removeItem("name");
      signOut(auth).then(()=>{

          navigation.replace("UserFormScreen")
        

      }).catch((error)=>{

        console.warn(error);

      })
        

    }
   



    return (
        <>  
          <SafeAreaView style={styles.container}>
    
            <View style={{padding:10}}>
          <Image  style={{height:300,width:200,marginTop:20,alignItems:"center"}} source={require("../assets/sharelogoName.png")} />
          </View>
          <View style={{padding:30}}> 
                 <TouchableOpacity onPress={logout} >
                    <Image style={{height:30,width:30}} resizeMode='contain' source={require("../assets/Logout.png")} />

    </TouchableOpacity>
    </View>


     


    </SafeAreaView>
    {/* {istoggle ? <View style={styles.toggle}>
           <Image style={{height:30,width:30,marginLeft:10}} source={require("../assets/menu.png")} />
    <Text>Hello</Text></View>:<></>} */}


 </>


  )
}

export default Header

const styles = StyleSheet.create({

    container:{

        flexDirection:"row",
        justifyContent:"space-between",
        height:"18%",
        backgroundColor:"#6f54fb",
        alignItems:"center",
       
    },

    toggle:{
    backgroundColor:"yellow ",
    width:"60%",
    backgroundColor:"#6f54fb",
    height:"50%",
    opacity:0.8,
    zIndex:10,
   
   

    }



})