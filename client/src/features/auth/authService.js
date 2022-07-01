import axios from "axios";

const register = async (user) => {
  const res = await axios.post("/api/users", user);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post("/api/users/login", userData);
  if (res.data) {
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
