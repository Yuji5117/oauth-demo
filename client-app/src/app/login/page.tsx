"use client";

export default function LoginPage() {
  const handleLogin = () => {
    const clientId = "my-client-id";
    const redirectUri = "http://localhost:3000/callback";
    const state = "xyz123";

    const authorizeUrl = `http://localhost:4000/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;

    window.location.href = authorizeUrl;
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>OAuth Demo</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
