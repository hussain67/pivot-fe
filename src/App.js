import "./App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Stats, Profile, EditSlide, ViewSingleSlide, CreatePresentation, DisplayPresentation, CreateSlide, SharedLayout, JoinPresentation } from "./pages/presentation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoutes";
import Poll from "./pages/presentation/Poll";
import("./styles/main.scss");

let url;

if (process.env.NODE_ENV === "production") {
	url = "https://pivot-be.onrender.com";
} else {
	url = "http://localhost:9090";
}

Axios.defaults.baseURL = url;

function App() {
	const [socket, setSocket] = useState();

	useEffect(() => {
		const socket = io.connect(url);
		setSocket(socket);
	}, []);

	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route
						path="/presentation"
						element={
							<ProtectedRoute>
								<SharedLayout />
							</ProtectedRoute>
						}
					>
						<Route
							path="/presentation"
							element={<Stats />}
						/>
						<Route
							path="profile"
							element={<Profile />}
						/>

						<Route
							path="create"
							element={<CreatePresentation />}
						/>
						<Route
							path="slide-create/:id"
							element={<CreateSlide />}
						/>
						<Route
							path=":presentationId/slide-view/:slideId"
							element={<ViewSingleSlide />}
						/>
						<Route
							path=":presentationId/slide-edit/:slideId"
							element={<EditSlide />}
						/>
					</Route>
					<Route
						path="/"
						element={<Home socket={socket} />}
					></Route>
					<Route
						path="/presentation-display/:presentationTitle/:presentationId"
						element={<DisplayPresentation socket={socket} />}
					/>
					<Route
						path="/join-presentation/:username/:presentationName"
						element={<JoinPresentation socket={socket} />}
					></Route>
					<Route
						path="/presentation-poll/:presentationTitle/:presentationId"
						element={<Poll socket={socket} />}
					/>

					<Route
						path="*"
						element={<p className="notFound">Page Not Found !!</p>}
					/>
				</Routes>
			</div>
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
