import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import petReducer from "./petSlice";
import vetReducer from "./vetSlice";

const reducer = {
	pets: petReducer,
	vets: vetReducer,
	loading: loadingReducer,
};

const store = configureStore({
	reducer: reducer,
	devTools: true,
});

export default store;
