import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import  HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import  EditPostPage  from "./pages/EditPostPage.jsx";
import  PostPage  from "./pages/PostPage.jsx";
import  AddPostPage  from "./pages/AddPostPage.jsx";
import  AllPostsPage  from "./pages/AllPostsPage.jsx";
import { AuthLayout, Login } from "./components/Index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        )
      },
      {
        path: "/allposts",
        element: (
          <AuthLayout authentication = {true}>
            {" "}
            <AllPostsPage />
          </AuthLayout>
        )
      },
      {
        path: "/addpost",
        element: (
          <AuthLayout authentication = {true}>
            {" "}
            <AddPostPage />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication = {true}>
            {" "}
            <EditPostPage />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <PostPage />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router = {router} />
    </Provider>
  </React.StrictMode>
);
