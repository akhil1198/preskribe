import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

// export const createVet = createAsyncThunk(
// 	"chat/Create",
// 	async ({ name, email, phone, hospital, password }) => {
// 		const config = {
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		};

// 		const body = { name, email, phone, hospital, password };
// 		const url = "http://localhost:8000/api/vets/register";

// 		try {
// 			const res = await axios.post(url, body, config);
// 			return res.data;
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}
// );

export const loginChat = createAsyncThunk(
	"chat/login",
	async ({ email, password }) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = { email, password };
		const url = "http://localhost:8000/api/chat/login";
		try {
			const resp = await axios.post(url, body, config);
			return resp.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const chatSlice = createSlice({
	name: "chatapis",
	initialState,
	extraReducers: {
		// [createVet.fulfilled]: (state, action) => {
		// 	state.push(action.payload);
		// },
		[loginChat.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
	},
});

const { reducer } = chatSlice;
export default reducer;
