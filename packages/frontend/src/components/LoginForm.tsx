import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const { user, isLoading, error, login, logout } = useAuth();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim() || !password.trim()) {
      setFormError("Please enter both nickname and password");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    
    try {
      await login(nickname, password);
      setNickname("");
      setPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Login failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="login-form">
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="user-info">
        <p>Welcome, <strong>{user.nickname}</strong>!</p>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    );
  }

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={isSubmitting}
            className="login-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            className="login-input"
          />
        </div>
        {(formError || error) && (
          <p className="login-error">{formError || error}</p>
        )}
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="login-button"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}