import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import ContractsPage from "./pages/ContractsPage";

import "./App.css";
import { useEffect } from "react";

const App = () => {

  useEffect(() => {
    localStorage.removeItem("user");
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/contracts"
          element={
            <RequireAuth>
              <ContractsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/accounts"
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
