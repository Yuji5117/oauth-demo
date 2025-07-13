"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  iat: number;
  exp: number;
};

export default function CallbackPage() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleFetchUser = () => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    fetch("http://localhost:5001/me", {
      method: "GET",
      headers: headers,
    }).then((response) =>
      response
        .json()
        .then((data) => setUser(data.user))
        .catch((err) => {
          console.error("Error:", err), setError("Failed to fetch user data");
        })
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
      <button onClick={handleFetchUser}>Get Me</button>
      <div>
        {user ? (
          <div>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
          </div>
        ) : (
          <p>No user info</p>
        )}
      </div>
    </div>
  );
}
