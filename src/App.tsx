import {
  ClerkProvider,
  SignIn,
  SignUp,
  RedirectToSignIn,
  useAuth,
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

const clerkPubKey = "pk_test_cHJvLWNvd2JpcmQtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA";

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
         elements: {
          formButtonPrimary: "bg-teal-500 hover:bg-teal-600 text-white",
          card: "bg-white shadow-none p-8",
          footer: "hidden",
          formFieldInput:
            "border border-gray-200 text-gray-900 focus:border-teal-500 focus:ring-teal-500",
          formFieldLabel: "text-gray-700",
          dividerLine: "bg-gray-200",
          dividerText: "text-gray-500",
          socialButtonsIconButton: "border border-gray-200 hover:bg-gray-50",
          socialButtonsProviderIcon: "w-5 h-5",
          formFieldInputShowPasswordButton: "text-gray-500",
          headerTitle: "text-gray-900 font-bold",
          headerSubtitle: "text-gray-600",
          formFieldError: "text-red-500",
          formFieldSuccessText: "text-teal-500",
        },
      }}
    >
      <Routes>
      <Route path="/" element={<Home />} />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />

        {/* Protected Routes */}
        <Route
          path="/assistants"
          element={
            <RequireAuth>
              <AssistantPage />
            </RequireAuth>
          }
        />
        <Route
          path="/assistants/:id"
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
          path="/files"
          element={
            <RequireAuth>
              <Files />
            </RequireAuth>
          }
        />
        <Route
          path="/voice-library"
          element={
            <RequireAuth>
              <VoiceLibrary />
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
      </Routes>
    </ClerkProvider>
  );
}

 function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
