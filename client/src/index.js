import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import store from "./components/redux/store";
import { Provider } from "react-redux";

const theme = createTheme({
	palette: {
		primary: {
			main: "#153954",
		},
		secondary: {
			main: "#D69C60",
		},
	},
	// typography: {
	// 	// fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
	// 	heading: {
	// 		fontSize: ["5rem"],
	// 	},
	// 	color: "red",
	// },
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass  ̰a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
