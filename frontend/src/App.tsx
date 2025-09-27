import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Cookies from "js-cookie";
import { Layout } from "./layouts/abiAlbum/AbiLayout";
import { Dashboard } from "./pages/abiAlbum/Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        {/* AbiAlbum routes with Layout */}
        <Route path="/abialbum" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route
          path=""
          element={
            <ProtectedRoute
              requiredRole=""
              redirectPath=""
            >
              <div>Super Admin Dashboard</div>
            </ProtectedRoute>
          }
        />

        {/* Default route - redirect based on role */}
        <Route path="/" element={<DefaultRedirect />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Helper component to redirect based on role
function DefaultRedirect() {
  const role = Cookies.get("role");

  if (role === "") {
    return <Navigate to="/" replace />;
  } else if (role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }
  // Default to dentist login if no role found

}

export default App;


