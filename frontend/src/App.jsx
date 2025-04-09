import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Watch from "./pages/Watch";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();
	console.log("Auth user", user);

	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>  
			</div>
		);
	}

	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={!user ? <Login /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <Signup /> : <Navigate to={"/login"} />} />
				<Route path='/watch/:id' element={!user ? <Watch /> : <Navigate to={"/login"} />} />
			</Routes>
			<Footer />

			<Toaster />
		</>
	);
}

export default App;