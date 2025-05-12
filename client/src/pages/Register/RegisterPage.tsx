import { useState } from "react";
import './RegisterPage.css';
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexes/UserContext";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { fetchUser } = useUserContext(); // if you renamed setUser to refetchUser

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || "Something went wrong");
      return;
    }

    await fetchUser(); // refresh context with new user
    navigate("/"); // redirect to home
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container">
        <div className="register-title">Register</div>
        <form onSubmit={handleSubmit}>
          <div className="input name">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input surname">
            <label htmlFor="surname">Last Name</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input email">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button className="btn sign-up">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
