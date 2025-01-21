import React, { useEffect } from "react";
import {
  ClerkProvider,
  SignIn,
  SignUp,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import AssistantPage from "./components/AssistantPage";
import PhoneNumbers from "./pages/PhoneNumbers";
import Files from "./pages/Files";
import VoiceLibrary from "./pages/VoiceLibrary";
import CallLogs from "./pages/CallLogs";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ProfilePage from "./components/ProfilePage";
import SignUpPage from "./components/SignUpPage.tsx";
import Blogs from "./pages/Blogs.tsx";
import Blogpage from "./components/Blog1.tsx";
import Company from "./pages/Company.tsx";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-3xl" />

        {/* Gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400 to-teal-600 p-[1px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50 to-white/80 backdrop-blur-xl" />
        </div>

        {/* Content */}
        <div className="relative p-8 flex flex-col items-center">
          {/* Loading animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              }}
              className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="w-4 h-4 rounded-lg bg-white" />
            </motion.div>
          </motion.div>

          {/* Text animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
              Loading Your Space
            </h2>
            <p className="text-sm text-gray-500">
              Setting up your personalized experience...
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-full h-1 bg-gray-100 rounded-full mt-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: "100%",
                transition: {
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

function RequireAuth({ children }: { children: React.ReactElement }) {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  if (!isSignedIn) {
    navigate("/sign-in");
    return null;
  }

  return children;
}

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/assistants");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* Removed the border effect by eliminating the gradient and background layers */}
        <div className="relative p-8">
          {children}

          {location.pathname === "/sign-in" && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/sign-up"
                  className="text-teal-500 hover:text-teal-600"
                >
                  Sign Up
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function ClerkProviderWithRoutes() {
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
          termsPageUrl: "https://clerk.com/terms",
          logoPlacement: "inside",
          shimmer: true,
        },
        variables: {
          colorPrimary: "rgb(20 184 166)",
          colorText: "rgb(17 24 39)",
          colorBackground: "transparent",
          borderRadius: "1rem",
        },
        elements: {
          card: "bg-transparent shadow-none",
          formButtonPrimary:
            "bg-teal-500 hover:bg-teal-600 text-sm font-medium transition-all shadow-md hover:shadow-lg",
          headerTitle: "text-2xl font-bold",
          socialButtonsProviderIcon: "w-5 h-5",
          formFieldInput:
            "rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 bg-white/80 backdrop-blur-sm",
          formFieldInputShowPasswordButton: "hover:bg-transparent",
          dividerLine: "bg-gray-200",
          dividerText: "text-gray-500",
          footer: "hidden",
          main: "mx-auto",
          formField: "space-y-1.5",
          socialButtons: "grid grid-cols-2 gap-2",
          socialButtonsIconButton: "flex-1",
          socialButtonsBlockButton: "flex-1",
          identityPreviewText: "text-sm text-gray-600",
          identityPreviewEditButton: "text-teal-500 hover:text-teal-600",
          avatarBox: "w-12 h-12 rounded-full border-2 border-teal-500",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in/*"
          element={
            <AuthWrapper>
              <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
            </AuthWrapper>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <AuthWrapper>
              <SignUpPage />
            </AuthWrapper>
          }
        />
        <Route
          path="/assistants"
          element={
            <RequireAuth>
              <AssistantPage />
            </RequireAuth>
          }
        />
        <Route path="/blogs" element={<Blogs />} />{" "}
        <Route path="/blogs1" element={<Blogpage />} />
        <Route path="/Company" element={<Company />} />
        <Route
          path="/phone-numbers"
          element={
            <RequireAuth>
              <PhoneNumbers />
            </RequireAuth>
          }
        />{" "}
        <Route
          path="/call-logs"
          element={
            <RequireAuth>
              <CallLogs />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/files"
          element={
            <RequireAuth>
              <Files />
            </RequireAuth>
          }
        />
        <Route path="*" element={<RedirectToSignIn />} />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
