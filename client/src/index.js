import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass  ̰a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
