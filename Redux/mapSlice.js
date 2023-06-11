import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	origin: null,
	destination: null,
	travelTimeInformation: null,
	userLogin:null,
	userName:null,
	connection:null,
};

export const mapSlice = createSlice({
	name: "nav",
	initialState,
	reducers: {
		setOrigin: (state, action) => {
			state.origin = action.payload;
		},
		setDestination: (state, action) => {
			state.destination = action.payload;
		},
		setTimeTravelInfo: (state, action) => {
			state.travelTimeInformation = action.payload;
		},
		setUser (state, action) {

			state.userLogin = action.payload;

		},
		setUserName (state, action) {

			state.userName = action.payload;

		},setInternetStatus(state,action){

			state.connection = action.payload;

		}

	},
});

export const { setOrigin, setDestination, setTimeTravelInfo,setUser,setUserName,setConnection } =
	mapSlice.actions;

// Selectors

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInfo = (state) => state.nav.travelTimeInformation;
export const selectUser = (state) => state.nav.userLogin;
export const selectUserName=(state)=> state.nav.userName;
export const selectInternetConnection=(state)=> state.nav.connection;

export default mapSlice.reducer;
