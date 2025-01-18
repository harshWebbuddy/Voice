import {
  ClerkProvider,
  SignIn,
  SignUp,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AssistantPage from "./components/AssistantPage";
import PhoneNumbers from "./pages/PhoneNumbers";
import Files from "./pages/Files";
import VoiceLibrary from "./pages/VoiceLibrary";
import CallLogs from "./pages/CallLogs";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ProfilePage from "./components/ProfilePage";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

function RequireAuth({ children }: { children: React.ReactElement }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children;
}

function ClerkProviderWithRoutes() {
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: "rgb(20 184 166)",
        },
        elements: {
          formButtonPrimary:
            "bg-teal-500 hover:bg-teal-600 text-sm font-medium",
          card: "bg-white dark:bg-gray-800 shadow-xl",
          headerTitle: "text-2xl font-bold",
          socialButtonsProviderIcon: "w-5 h-5",
          formFieldInput:
            "rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500",
          formFieldInputShowPasswordButton: "hover:bg-transparent",
          footer: "hidden",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in/*"
          element={
            <SignIn
              routing="path"
              path="/sign-in"
              afterSignInUrl="/assistants"
            />
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <SignUp
              routing="path"
              path="/sign-up"
              afterSignUpUrl="/assistants"
            />
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
        <Route
          path="/phone-numbers"
          element={
            <RequireAuth>
              <PhoneNumbers />
            </RequireAuth>
          }
        />
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
    </BrowserRouter>
  );
}

export default App;
