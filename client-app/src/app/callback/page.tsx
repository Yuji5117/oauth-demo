"use client";

import { useEffect, useState } from "react";

export default function CallbackPage() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClickGetMe = () => {
    fetch("http://localhost:5001/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response
        .json()
        .then((data) => console.log(data))
        .catch((err) => console.error("Error:", error))
    );
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    const state = query.get("state");

    if (!code) {
      setError("Authorization code not found");
      return;
    }

    fetch("http://localhost:4000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        client_id: "my-client-id",
        client_secret: "my-client-secret",
        redirect_uri: "http://localhost:3000/callback",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          setToken(data.access_token);
        } else {
          setError(data.error || "Failed to obtain token");
        }
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Callback Page</h1>
      {token && (
        <p>
          ✅ Token retrieved successfully!
          <br />
          {token}
        </p>
      )}
      {error && <p>❌ Error: {error}</p>}
      <button onClick={handleClickGetMe}>Get Me</button>
    </div>
  );
}
