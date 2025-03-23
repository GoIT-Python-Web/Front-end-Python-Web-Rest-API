import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import RestrictedRoute from "./routes/RestrictedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { refreshUser } from "./store/auth/operations";
import { fetchContacts } from "./store/contacts/operations";
import Loader from "./components/UI/loader/Loader";
import { selectIsLoading } from "./store/contacts/selectors";

const RegisterPage = lazy(() => import("./pages/Auth/register/RegisterPage"));
const LoginPage = lazy(() => import("./pages/Auth/login/LoginPage"));
const HomePage = lazy(() => import("./pages/Contacts/main/MainPage.tsx"));
const ContactFormPage = lazy(
  () => import("./pages/Contacts/create/CreateEditContactPage")
);
const ViewContactPage = lazy(
  () => import("./pages/Contacts/view/ViewContactPage")
);
const UserPage = lazy(() => import("./pages/Auth/user/UserPage"));

export default function App() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      {isLoading && location.pathname !== "/" && <Loader />}
      <Routes>
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/" component={RegisterPage} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/" component={LoginPage} />}
        />
        <Route
          path="/"
          element={<PrivateRoute redirectTo="/login" component={HomePage} />}
        />
        <Route
          path="/contacts/:mode"
          element={
            <PrivateRoute redirectTo="/login" component={ContactFormPage} />
          }
        />
        <Route
          path="/contacts/:id/:mode"
          element={
            <PrivateRoute redirectTo="/login" component={ContactFormPage} />
          }
        />
        <Route
          path="/contacts/:id/view"
          element={
            <PrivateRoute redirectTo="/login" component={ViewContactPage} />
          }
        />
        <Route
          path="/user"
          element={<PrivateRoute redirectTo="/login" component={UserPage} />}
        />
      </Routes>
    </div>
  );
}
