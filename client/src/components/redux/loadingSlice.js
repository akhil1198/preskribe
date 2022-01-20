import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
	name: "loading",
	initialState: false,
	reducers: {
		toggleLoading: (state) => !state,
	},
});

export const selectLoading = (state) => state.loading;
export const { toggleLoading } = loadingSlice.actions;
const { reducer } = loadingSlice;
export default reducer;
// export default LoadingSlice.reducer;
