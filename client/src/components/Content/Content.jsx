import { Route, Routes } from "react-router";
import "./Content.scss";
import { menuItems } from "../../common/menu";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function Content() {
  return (
    <Routes>
      {menuItems.map(({ path, Component, authRequired }) => (
        <Route
          key={path}
          path={path}
          element={
            authRequired ? (
              <ProtectedRoute>
                <Component />
              </ProtectedRoute>
            ) : (
              <Component />
            )
          }
        />
      ))}
    </Routes>
  );
}
