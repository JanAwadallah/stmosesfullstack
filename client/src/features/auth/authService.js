import axios from "axios";

const register = async (user) => {
  const res = await axios.post(
    "https://stmosescopts.herokuapp.com/api/users",
    user
  );
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(
    "https://stmosescopts.herokuapp.com/api/users/login",
    userData
  );
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
