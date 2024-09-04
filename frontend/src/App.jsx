import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  AdminDashboard,
  AdminLayout,
  AdminOrder,
  AdminProduct,
  AuthLayout,
  CheckAuth,
  NotFound,
  ShoppingAccount,
  ShoppingCheckOut,
  ShoppingHome,
  ShoppingLayout,
  ShoppingListing,
  Signin,
  Signup,
  UnAuthPage,
} from './Index';

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // console.log("isAuthenticated", isAuthenticated);
  // console.log("user", user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="order" element={<AdminOrder />} />
          <Route path="product" element={<AdminProduct />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
