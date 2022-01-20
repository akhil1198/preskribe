import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./components/index";
import Petparent from "./components/petparent";
import Vet from "./components/vet";
import PetHome from "./components/petparent/home";
import VetHome from "./components/vet/home";
import ProtectedRoute from "./components/globalcomponents/ProtectedRoute";

var history = createBrowserHistory();
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
			<Router history={history}>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/parent" element={<Petparent />} />
					<Route exact path="/vet" element={<Vet />} />
					<Route exact path="/parent-home" element={<ProtectedRoute />}>
						<Route exact path="/parent-home" element={<PetHome />} />
					</Route>
					<Route exact path="/vet-home" element={<ProtectedRoute />}>
						<Route exact path="/vet-home" element={<VetHome />} />
					</Route>
					{/* <ProtectedRoute exact path="/parent-home" component={<PetHome />} /> */}
				</Routes>
			</Router>
			{/* <Home /> */}
		</div>
	);
}

export default App;
