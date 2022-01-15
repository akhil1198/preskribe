import logo from "./logo.svg";
import "./App.css";
import { createTheme } from "@mui/material";
import Home from "./components";

// const theme = createTheme({
// 	palette: {
// 		primary: {
// 			main: "#153954",
// 		},
// 		secondary: {
// 			main: "#D69C60",
// 		},
// 	},
// 	typography: {
// 		fontFamily: "roboto",
// 		fontSize: "5rem",
// 		["@media (max-width:560px)"]: {
// 			fontSize: "3rem",
// 		},
// 	},
// });

function App() {
	return (
		<div className="App">
			<Home />
		</div>
	);
}

export default App;
