import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./features/auth/pages/LoginPage";

import SignupPage from "./features/auth/pages/SignupPage";

import ChatPage from "./features/chat/pages/ChatPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}

        <Route path="/login" element={<LoginPage />} />

        {/* SIGNUP */}

        <Route path="/signup" element={<SignupPage />} />

        {/* PROTECTED CHAT */}

        <Route
          path="/chat"
          element={token ? <ChatPage /> : <Navigate to="/login" />}
        />

        {/* DEFAULT */}

        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
