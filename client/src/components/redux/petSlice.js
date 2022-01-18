import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const createPet = createAsyncThunk(
	"pet/create",
	async ({ name, phone, email, age, password }) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = { name, phone, email, age, password };
		const url = "http://localhost:8000/api/pets/register";
		try {
			const res = await axios.post(url, body, config);
			console.log("create pet api res:", res);
			return res.data;
		} catch (err) {
			console.log(err);
			return err;
		}
	}
);

export const petSlice = createSlice({
	name: "petapis",
	initialState,
	extraReducers: {
		[createPet.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
	},
});

const { reducer } = petSlice;
export default reducer;
