import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const createVet = createAsyncThunk(
	"vet/Create",
	async ({ name, email, phone, designation, hospital, password }) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = { name, email, phone, designation, hospital, password };
		const url = "http://localhost:8000/api/vets/register";

		try {
			const res = await axios.post(url, body, config);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const loginVet = createAsyncThunk(
	"vet/login",
	async ({ email, password }) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = { email, password };
		const url = "http://localhost:8000/api/vets/login";
		try {
			const resp = await axios.post(url, body, config);
			return resp.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const getVet = createAsyncThunk(
	"vet/all",
	async () => {
		const url = "http://localhost:8000/api/vets/getAll"
		try {
			const resp = await axios.get(url)
			return resp.data
		} catch (error) {
			console.log(error);
		};
	}
)

export const vetSlice = createSlice({
	name: "vetapis",
	initialState,
	extraReducers: {
		[createVet.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
		[loginVet.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
		[getVet.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
	},
});

const { reducer } = vetSlice;
export default reducer;
