import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./components/Dashboard";
import ProtectedLayout from "./components/ProtectedLayout";
import AssistantPage from "./components/AssistantPage";
import PhoneNumbers from "./pages/PhoneNumbers";
import Files from "./pages/Files";
import VoiceLibrary from "./pages/VoiceLibrary";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assistants" element={<AssistantPage />} />
          <Route path="/assistants/:id" element={<AssistantPage />} />
          <Route path="/phone-numbers" element={<PhoneNumbers />} />
          <Route path="/files" element={<Files />} />
          <Route path="/voice-library" element={<VoiceLibrary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
