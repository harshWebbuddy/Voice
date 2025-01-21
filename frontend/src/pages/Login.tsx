// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
 
// import { login } from "../services/authService";
// import { toast } from "react-hot-toast";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await login(email, password);
//       console.log("Login response:", response);

//       localStorage.setItem("token", response.access_token);

//       localStorage.setItem("user", JSON.stringify(response.user));

//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (error: any) {
//       console.error("Login error:", error);
//       toast.error(error.response?.data?.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Login
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email
//             </label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full"
//               placeholder="Enter your password"
//             />
//           </div>
//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </Button>
//           <div className="text-center mt-4">
//             <Link
//               to="/forgot-password"
//               className="text-blue-600 hover:text-blue-800 text-sm"
//             >
//               Forgot Password?
//             </Link>
//           </div>
//           <div className="text-center">
//             <span className="text-gray-600 text-sm">
//               Don't have an account?{" "}
//             </span>
//             <Link
//               to="/register"
//               className="text-blue-600 hover:text-blue-800 text-sm"
//             >
//               Register
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
