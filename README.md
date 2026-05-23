# Pigeon Messager 🐦

A modern real-time full-stack chat application built using Spring Boot and React.

---

# Tech Stack

## Backend

- Java 25
- Spring Boot 3
- Spring Security + JWT (JJWT)
- Spring WebSocket + STOMP
- SockJS
- Spring Data JPA
- PostgreSQL
- Lombok

## Frontend

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Axios
- STOMP.js + SockJS Client
- React Router v6

---

# Features

- JWT-based Authentication (Signup/Login/Logout)
- Real-time Messaging using WebSocket and STOMP
- Optimistic UI for instant message rendering
- Typing Indicators
- Persistent Message History
- Role-based Access Control (`USER` / `ADMIN`)
- Backend-controlled Secure Sender Validation
- CORS Configuration for Local Development

---

# Project Structure

```bash
pigeon-chat/
├── backend/
│   └── src/main/java/com/pigeon/pigeon_chat/
│       ├── auth/
│       │   ├── controller/
│       │   ├── dto/
│       │   └── service/
│       ├── chat/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   ├── repository/
│       │   └── service/
│       ├── exception/
│       ├── security/
│       ├── user/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   └── repository/
│       ├── util/
│       └── websocket/
│           ├── config/
│           ├── controller/
│           └── dto/
│
└── frontend/
    └── src/
        ├── api/
        ├── features/
        │   ├── auth/
        │   │   ├── hooks/
        │   │   └── pages/
        │   └── chat/
        │       ├── components/
        │       ├── hooks/
        │       └── pages/
        └── websocket/
```

---

# Getting Started

## Prerequisites

Make sure the following tools are installed:

- Java 17+
- Node.js 18+
- PostgreSQL
- Maven

---

# Backend Setup

## 1. Clone the Repository

```bash
git clone https://github.com/balajixog/Pigeon-Messager.git
cd pigeon-messager/backend
```

## 2. Configure `application.properties`

```properties
spring.config.import=optional:file:.env[.properties]
spring.application.name=pigeon-chat
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
jwt.secret=${SECRET}
jwt.expiration=${EXPIRY}
```

## 3. Run the Backend

```bash
./mvnw spring-boot:run
```

Backend Server:

```bash
http://localhost:8080
```

---

# Frontend Setup

## 1. Navigate to Frontend

```bash
cd pigeon-messager/frontend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start Development Server

```bash
npm run dev
```

Frontend Server:

```bash
http://localhost:5173
```

---

# API Reference

## Authentication APIs

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| POST   | `/auth/signup` | Register a new user         |
| POST   | `/auth/login`  | Login and receive JWT token |
| POST   | `/auth/logout` | Logout user                 |

---

## User APIs

| Method | Endpoint   | Authorization | Description                |
| ------ | ---------- | ------------- | -------------------------- |
| GET    | `/user/me` | Bearer Token  | Get current logged-in user |

---

## Message APIs

| Method | Endpoint    | Authorization | Description                |
| ------ | ----------- | ------------- | -------------------------- |
| GET    | `/messages` | Bearer Token  | Retrieve all chat messages |

---

# WebSocket Endpoints

| Endpoint           | Purpose                         |
| ------------------ | ------------------------------- |
| `/ws`              | WebSocket connection endpoint   |
| `/app/chat.send`   | Send chat message               |
| `/app/chat.typing` | Send typing status              |
| `/topic/messages`  | Subscribe for incoming messages |
| `/topic/typing`    | Subscribe for typing events     |

---

# Authentication Flow

```text
1. User signs up → Password is BCrypt hashed and stored in PostgreSQL
2. User logs in → JWT token generated with email, username, and role
3. JWT token stored in localStorage
4. Every API request includes Authorization header
5. WebSocket connection also includes JWT token in STOMP headers
6. Backend validates token and sets authenticated Principal
7. Message sender is always validated from backend Principal
```

---

# WebSocket Flow

```text
1. Frontend creates STOMP client
2. JWT token sent during CONNECT
3. Backend validates token using ChannelInterceptor
4. User subscribes to messaging topics
5. Messages appear instantly using optimistic UI
6. Backend confirms and syncs the real message
7. Logout automatically disconnects WebSocket session
```

---

# Environment Variables

| Variable                     | Description                         |
| ---------------------------- | ----------------------------------- |
| `jwt.secret`                 | Secret key used to sign JWT         |
| `jwt.expiration`             | JWT expiration time in milliseconds |
| `spring.datasource.url`      | PostgreSQL database URL             |
| `spring.datasource.username` | Database username                   |
| `spring.datasource.password` | Database password                   |

---

# Security Features

- Passwords are securely hashed using BCrypt
- JWT signed with HMAC-SHA384
- Backend prevents sender spoofing
- Secure authentication using Spring Security
- CORS restricted during development
- Role validation enforced in backend

---

# Current Limitations

- Only global chat is supported
- No private/direct messaging yet
- No pagination for chat history
- JWT blacklist not implemented
- Email verification not available

---

# Future Improvements

- Private Messaging
- Redis-based Message Queue
- Online/Offline Presence
- Read Receipts
- Message Pagination
- File/Image Sharing
- Docker Deployment
- CI/CD Pipeline

---

# License

Copyright (c) 2026 Balaji. All rights reserved.
See [LICENSE](./LICENSE) for details.
