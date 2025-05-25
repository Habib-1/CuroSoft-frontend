import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) throw new Error("No refresh token available");
  
      const res = await axios.post("http://127.0.0.1:8000/token/refresh/", {
        refresh: refreshToken,
      });
  
      const { access } = res.data;
      localStorage.setItem("access_token", access);
      return access;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout(); // Clear user data and tokens
      return null;
    }
  };
  
  const fetchUser = async () => {
    let token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      return;
    }
  
    try {
      const res = await axios.get("http://127.0.0.1:8000/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
       // Store user info in state
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token might be expired, try refreshing it
        token = await refreshAccessToken();
        if (token) {
          // Retry fetching user with the new token
          const res = await axios.get("http://127.0.0.1:8000/user/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data);
        }
      } else {
        console.error("Fetching user failed:", error);
        setUser(null);
      }
    }
  };
  const login = async (credentials) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/login/", credentials);
      const { access, refresh } = res.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      await fetchUser();
      // fetch user info after login
      // redirect to home
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    navigate("/login");
  };

  const fetchDoctor = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/profile/doctors/${id}/`);
      setDoctor(res.data);
     
    } catch (err) {
      console.error(err);
    }
  };
   useEffect(()=>{
    fetchUser();
    // fetchDoctor();
   },[]);
  return (
    <AuthContext.Provider value={{ login, fetchUser, user, logout ,fetchDoctor,doctor}}>
      {children}
    </AuthContext.Provider>
  );
};