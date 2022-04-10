import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./components/index";
import Petparent from "./components/petparent";
import Vet from "./components/vet";
import PetHome from "./components/petparent/home";
import VetHome from "./components/vet/home";
import ProtectedRoute from "./components/globalcomponents/ProtectedRoute";
import Chat from "./components/chatmodule";
import ChatRoom from "./components/chatmodule/room/ChatRoom";
import Rooms from "./components/chatmodule/room/Rooms";
import ChatHome from "./components/chatmodule/Home";
import VetChat from "./components/chatmodule/dm";
import DmRooms from "./components/chatmodule/dm/DmRoom";

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

// //how to style progress bar : 
// var progressbar = document.getElementById('progressbar');
// var count = 0;
// count += 100 / (data.length - 1);
//                     progressbar.style.width = count + "%";
function App() {
	return (
		<div className="App">
			<Router history={history}>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/parent" element={<Petparent />} />
					<Route exact path="/vet" element={<Vet />} />
					<Route exact path="/chat" element={<Chat />} />
					<Route exact path="/chat-home" element={<ProtectedRoute />}>
						<Route exact path="/chat-home" element={<ChatHome />} />
					</Route>
					<Route exact path="/chat-vet" element={<ProtectedRoute />}>
						<Route exact path="/chat-vet" element={<VetChat />} />
						<Route exact path="/chat-vet/:id" element={<DmRooms />} />

					</Route>
					<Route exact path="/chat-room" element={<ProtectedRoute />}>
						<Route exact path="/chat-room" element={<ChatRoom />} />
						<Route exact path="/chat-room/:id" element={<Rooms />} />
					</Route>
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
