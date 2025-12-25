import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [email,setEmail]=useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log("Reponse:", response.data);
      const { token, data } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="max-w-md bg-white p-6 rounded-lg flex flex-col  shadow-md text-black mx-auto ">
      <h1 className="font-medium text-xl text-center mb-4 text-black">
        Register
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <input
          type="text"
          value={username}
          name="username"
          placeholder="Username"
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 outline-none border  border-gray-400 rounded-lg hover:border-blue-500 placeholder-gray-400 "
        />
        <input
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 outline-none border  border-gray-400 rounded-lg hover:border-blue-500 placeholder-gray-400 "
        />

        <input
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 outline-none border  border-gray-400 rounded-lg hover:border-blue-500 placeholder-gray-400"
        />

        <button className="w-full p-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer">
          Register
        </button>

        {error && <p>{error}</p>}
      </form>
      <p className="text-center mt-4 ">
       Already have a account?{" "}
        <Link to="/login" className="text-blue-500 underline">
         Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
