import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
	user: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,
	
	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post("https://netflixclone-vrof.onrender.com/api/v1/auth/signup", credentials);
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
			const response = await axios.post("https://netflixclone-vrof.onrender.com/api/v1/auth/login", credentials);

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
			await axios.post("https://netflixclone-vrof.onrender.com/api/v1/auth/logout");
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
			const response = await axios.get("https://netflixclone-vrof.onrender.com/api/v1/auth/authcheck");

			console.log("Authcheck successfully;")
			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},
	
}));