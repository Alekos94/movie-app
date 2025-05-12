import { useNavigate } from "react-router";
import { useUserContext } from "../../contexes/UserContext";
import { useState } from "react";
import "./LoginPage.css";

export function LoginPage() {
  const { fetchUser } = useUserContext();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      await fetchUser(); 
      navigate("/");

    } catch (err) {
      console.error(err);
      setError("Login error");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-title">Log In</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input email">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" required />
          </div>

          <div className="input password">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" minLength={6} required />
          </div>
        {/* update the error handling  */}
          {error && <div className="error">{error}</div>} 
          <button className="btn sign-in">Sign In</button>
        </form>
      </div>
    </div>
  );
}