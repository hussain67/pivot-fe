import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Presentation from "./pages/Presentation";
import { Stats, Profile, EditSlide, ViewSingleSlide, CreatePresentation, DisplayPresentation, CreateSlide, JoinPresentation } from "./features/presentation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoutes";
import Poll from "./features/presentation/Poll";
import AuthPage from "./pages/AuthPage";
import("./styles/main.scss");

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/presentation"
						element={
							<ProtectedRoute>
								<Presentation />
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
						path="/auth"
						element={<AuthPage />}
					/>

					<Route
						path="/presentation-display/:presentationTitle/:presentationId"
						element={<DisplayPresentation />}
					/>
					<Route
						path="/join-presentation/:username/:presentationName"
						element={<JoinPresentation />}
					></Route>
					<Route
						path="/presentation-poll/:presentationTitle/:presentationId"
						element={<Poll />}
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
