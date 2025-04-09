// import axios from "axios";
// import toast from "react-hot-toast";
// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
// 	user: null,
// 	isSigningUp: false,
// 	isCheckingAuth: true,
// 	isLoggingOut: false,
// 	isLoggingIn: false,
	
// 	signup: async (credentials) => {
// 		set({ isSigningUp: true });
// 		try {
// 			const response = await axios.post("https://netflixclone-vrof.onrender.com/api/v1/auth/signup", credentials, { withCredentials: true });
// 			set({ user: response.data.user, isSigningUp: false });

// 			console.log("Signup successfully");
// 			toast.success("Account created successfully");
// 		} catch (error) {
// 			toast.error(error.response.data.message || "Signup failed");
// 			set({ isSigningUp: false, user: null });
// 		}
// 	},

// 	login: async (credentials) => {
// 		set({ isLoggingIn: true });
// 		try {
// 			const response = await axios.post("https://netflixclone-vrof.onrender.com/api/v1/auth/login", credentials, { withCredentials: true });

// 			console.log("Login successfully..");
// 			toast.success("Login Successfully");
// 			set({ user: response.data.user, isLoggingIn: false });
// 		} catch (error) {
// 			set({ isLoggingIn: false, user: null });
// 			toast.error(error.response?.data?.message || "Login failed");
// 		}
// 	},

// 	logout: async () => {
// 		set({ isLoggingOut: true });
// 		try {
// 			await axios.post("https://netflixclone-vrof.onrender.com/api/v1/auth/logout", {}, { withCredentials: true });
// 			set({ user: null, isLoggingOut: false });

// 			console.log("Logout successfully..."); 
// 			toast.success("Logged out successfully");
// 		} catch (error) {
// 			set({ isLoggingOut: false });
// 			toast.error(error.response.data.message || "Logout failed");
// 		}
// 	},

// 	authCheck: async () => {

// 		set({ isCheckingAuth: true });
// 		try {
// 			const response = await axios.get("https://netflixclone-vrof.onrender.com/api/v1/auth/authcheck", { withCredentials: true });

// 			console.log("Authcheck successfully;")
// 			set({ user: response.data.user, isCheckingAuth: false });
// 		} catch (error) {
// 			set({ isCheckingAuth: false, user: null });
// 			toast.error(error.response?.data?.message || "An error occurred");
// 		}
// 	},
	
// }));

import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const api = axios.create({
	baseURL: "https://netflixclone-vrof.onrender.com/api/v1",
	withCredentials: true,
});

export const useAuthStore = create((set) => ({
	user: null,
	token: localStorage.getItem("jwt-netflix") || null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,
	
	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await api.post("/auth/signup", credentials);
			set({ user: response.data.user, isSigningUp: false });

			console.log("Signup successfully");
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},

	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await api.post("/auth/login", credentials);

			if(response.data.user.token) {
				localStorage.setItem("jwt-netflix", response.data.user.token);
			}

			set({
				user: response.data.user,
				token: response.data.user.token,
				isLoggingIn: false,
			})

			console.log("Login successfully..");
			toast.success("Login Successfully");
			set({ user: response.data.user, isLoggingIn: false });
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error.response?.data?.message || "Login failed");
		}
	},

	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await api.post("/auth/logout", {}, { withCredentials: true });

			localStorage.removeItem("jwt-netflix");

			set({ user: null, isLoggingOut: false });

			console.log("Logout successfully..."); 
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},

	authCheck: async () => {

		set({ isCheckingAuth: true });
		try {
			const response = await api.get("/auth/authcheck");

			console.log("Authcheck successfully;")
			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			localStorage.removeItem("jwt-netflix");
			set({ isCheckingAuth: false, user: null });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},
	
}));

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("jwt-netflix");
	if(token)
		config.headers.Authorization = `Bearer ${token}`;

	return config;
})