# 🔐 OAuth2.0 認可コードフローを自作して理解するプロジェクト

このプロジェクトは、OAuth2.0 の認可コードフロー（Authorization Code Flow）を **ゼロから自作**して理解することを目的とした学習用のモノレポ構成です。

---

## 📁 ディレクトリ構成

```
oauth-demo/
├── auth-server/ # 認可サーバー（Express）
├── client-app/ # クライアントアプリ（Next.js）
├── resource-server/ # リソースサーバー（Express）
└── README.md # プロジェクト全体の概要
```

## 🚀 起動手順

### 1. リポジトリをクローン

```bash
git clone git@github.com:Yuji5117/oauth-demo.git
cd oauth-demo
```

### 2. 認可サーバーの起動

```bash
cd auth-server
npm install
npm start
```

.env ファイルの中身（例）：

```env
CLIENT_ID=my-client-id
CLIENT_SECRET=my-client-secret
REDIRECT_URI=http://localhost:3000/callback
```

### 3. クライアントアプリの起動

```bash
cd ../client-app
npm install
npm run dev
```

ブラウザで http://localhost:3000/login にアクセス

### 4. （任意）リソースサーバーの起動

```bash

cd ../resource-server
npm install
npm start

```

/me などにトークン付きリクエストを送ると、ユーザー情報を返します

## 🔒 注意点

この実装はあくまで学習目的です。
