import React, { useEffect, useState } from "react";
import Login from "./Components/Login/Login";
import DashBoard from "./Components/DashBoard/DashBoard.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [verifyUser, setVerifyUser] = useState(false);
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.includes("auth_token="));

  console.log(tokenCookie, "tokenCookie");

  useEffect(() => {
    console.log(tokenCookie, "tokenCookie useeffect");
    if (tokenCookie && tokenCookie.split("=")[1] === "yes") {
      setVerifyUser(true);
    }else{
      setVerifyUser(false);
    }
  }, [tokenCookie]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login verifyUser={verifyUser} setVerifyUser={setVerifyUser} />,
    },
    { path: "/dashboard", element: <DashBoard verifyUser={verifyUser} /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
