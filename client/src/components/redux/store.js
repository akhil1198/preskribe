import { configureStore } from "@reduxjs/toolkit";
import petReducer from "./petSlice";

const reducer = {
	pets: petReducer,
};

const store = configureStore({
	reducer: reducer,
	devTools: true,
});

export default store;
