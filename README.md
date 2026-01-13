# 💬 Pigeon-Messager Application

A full-stack real-time chat application built with **React** (frontend) and **Spring Boot WebSocket** (backend). Supports real-time messaging using WebSockets and follows industry-standard project structure and Git workflow.

---

## 🚀 Tech Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **STOMP WebSocket Client** - Real-time communication
- **npm** - Package manager

### Backend
- **Spring Boot** - Java framework
- **WebSocket (STOMP)** - Real-time messaging protocol
- **Spring Security** - JWT authentication
- **Maven** - Build tool

---

## 📁 Project Structure

```
pigeon-messager/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
├── server/                 # Spring Boot backend
│   ├── chatserver/
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── application.yml
│   └── README.md
├── .gitignore
└── README.md
```

---

## 🛠️ Prerequisites

Make sure you have the following installed:

- **Node.js** (v18+)
- **npm** (v9+)
- **Java** (17+)
- **Maven** (3.8+)
- **Git**

---

## 📥 Clone the Repository

```bash
git clone https://github.com/balajixog/Pigeon-Messager.git
```

---

## ▶️ Frontend Setup (React)

### 1. Navigate to client directory
```bash
cd client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the `client/` directory:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080/ws
```

### 4. Start development server
```bash
npm run dev
```

**Frontend will run at:** `http://localhost:5173`

---