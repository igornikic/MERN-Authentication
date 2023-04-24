import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Imports
import Home from "./components/Home";
import PageNotFound from "./components/layout/PageNotFound";

// Authentication Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin Imports
import Dashboard from "./components/admin/DashBoard";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<ProtectedRoute element={Profile} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<NewPassword />} />
        <Route
          path="/me/update"
          element={<ProtectedRoute element={UpdateProfile} />}
        />
        <Route
          path="/password/update"
          element={<ProtectedRoute element={UpdatePassword} />}
        />

        {/* Admin routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute isAdmin={true} element={Dashboard} />}
        />
        <Route
          path="/admin/users"
          isAdmin={true}
          element={<ProtectedRoute element={UsersList} />}
        />
        <Route
          path="/admin/user/:id"
          isAdmin={true}
          element={<ProtectedRoute element={UpdateUser} />}
        />

        {/* Invalid Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
