import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppState({ children }) {
  // const url = "http://localhost:1000/api";

  const url = " https://mern-e-commerce-kat8.onrender.com/api";

  const [products, setproducts] = useState([]);
  const [token, settoken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setuserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setproducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchProduct();
    userCart();
    getAddress();
    user_Order();
  }, [token, reload]);

  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    // settoken(localStorage.getItem("token"));
    // console.log(lstoken);
    if (lstoken) {
      settoken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  // Register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };
  //login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log(api.data)
    settoken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  // logout
  const logout = () => {
    setIsAuthenticated(false);
    settoken(" ");
    localStorage.removeItem("token");
    toast.success("logout successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // user profile

  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log(api.data);
    setUser(api.data.user);
  };

  //add to cart
  const addToCart = async (productId, title, price, qty, imgsrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgsrc },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );

    setReload(!reload);
    // console.log(api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //user cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //console.log(api.data.cart);
    setCart(api.data.cart);
    //setUser("user cart", api);
  };

  // --qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log(api);
    //setCart(api.data.cart);
    //setUser("user cart", api);
  };

  // remove items from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(
      `${url}/cart/remove/${productId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    console.log(api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log(api);
    //setCart(api.data.cart);
    //setUser("user cart", api);
  };

  // Clear cart
  const clearCart = async () => {
    const api = await axios.delete(
      `${url}/cart/clear`,

      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    console.log(api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log(api);
    //setCart(api.data.cart);
    //setUser("user cart", api);
  };
  // add shipping address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    console.log(api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    // console.log(api);
    //setCart(api.data.cart);
    //setUser("user cart", api);
  };

  // get user latest address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("user address", api.data.userAddress);
    setuserAddress(api.data.userAddress);
  };

  // get  user Order
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //console.log("user order", api.data);
    setUserOrder(api.data);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppState;
