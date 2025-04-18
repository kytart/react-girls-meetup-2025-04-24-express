import { LoginForm } from "./LoginForm";

export function Header() {
  return (
    <header className="app-header">
      <h1>Sample app</h1>
      <div className="auth-container">
        <LoginForm />
      </div>
    </header>
  );
}
