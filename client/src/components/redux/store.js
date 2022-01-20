import { configureStore } from "@reduxjs/toolkit";
import petReducer from "./petSlice";
import vetReducer from "./vetSlice";

const reducer = {
	pets: petReducer,
	vets: vetReducer,
};

const store = configureStore({
	reducer: reducer,
	devTools: true,
});

export default store;
