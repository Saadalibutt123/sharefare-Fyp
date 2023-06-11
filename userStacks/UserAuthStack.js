import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectInternetConnection, selectUser, setConnection } from '../Redux/mapSlice'
import SignedInStack from './SignedInStack'
import NotSignedInStack from './NotSignedInStack'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserAuthStack = () => {

    const [logged,setLoggedUser] = useState("");


   

        const getItems = async()=>{

            const getValue = await AsyncStorage.getItem("name");
            console.warn(getValue);
            setLoggedUser(getValue);
            
        }

       

        getItems();
            
        




  console.warn("loggedUserAsynStorage : "+logged);

    const user = useSelector(selectUser);
    console.log('====================================');
    console.log(user);
    console.log('====================================');
        

     return<>{logged !== null ?   <SignedInStack  /> : <NotSignedInStack/> }</>



}

export default UserAuthStack