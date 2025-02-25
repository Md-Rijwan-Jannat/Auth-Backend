# Blind Dating App - Backend

## Overview

The backend for the **Blind Dating App** enables personality-based matching and real-time messaging while prioritizing security, scalability, and performance.

## Features

### **1. User Authentication & Profile**

- Secure authentication using JWT
- Profile creation with:
  - Name, age, location
  - Interests selection (3-10 interests)
  - Personality traits/bio
  - Optional profile picture upload
- Profile update functionality

### **2. Matching System**

#### **Algorithm-Based Matching**

- Matches users based on shared interests
- Like/Pass functionality
- Match creation upon mutual likes

#### **Blind Chat Matching**

- 10-minute anonymous chat with online users
- Timer countdown display
- Post-chat match option (requires mutual agreement)
- Users are randomly paired based on availability
- Moderation system to flag inappropriate behavior

### **3. Chat System**

- Real-time messaging with Socket.io
- Chat history for matched users
- Temporary chat feature for blind matching
- Basic message features (text, timestamps, read status)

### **4. Notifications**

- New match notifications
- New message notifications
- Read/unread message tracking

## Tech Stack

### **Backend Technologies**

- **Framework:** Node.js with Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT-based authentication
- **Real-time:** Socket.io for live messaging
- **Storage:** Cloudinary for profile image uploads
- **Environment Variables:** dotenv for configuration management

## Setup & Installation

### **1. Clone Repository**

```sh
git clone https://github.com/Md-Rijwan-Jannat/Dating-App-Backend.git
cd Dating-App-Backend
```

### **2. Install Dependencies**

```sh
bun install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://your-db-url
JWT_ACCESS_SECRET=your_access_token_secret
JWT_ACCESS_EXPIRES_IN=5d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=StrongPassword123
RESET_LINK_URL=https://yourapp.com/reset-password
BCRYPT_SALT_ROUNDS=10
```

### **4. Run Server**

```sh
bun run dev
```

The server will start at `http://localhost:5000`

## API Endpoints

### **Authentication**

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/auth/register`        | Register a new user  |
| POST   | `/auth/login`           | Login user           |
| POST   | `/auth/logout`          | Logout user          |
| POST   | `/auth/change-password` | Refresh access token |

### **User Profile**

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/users/:id` | Get user profile |
| PATCH  | `/users/:id` | Update profile   |
| DELETE | `/users/:id` | Delete profile   |

### **Matching System**

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/matches`          | Get matched users |
| POST   | `/matches/pass/:id` | Pass on a user    |

### **Blind Chat**

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| GET    | `/blind-chat/start`       | Start a blind chat     |
| POST   | `/blind-chat/respond/:id` | Respond to chat invite |
| DELETE | `/blind-chat/end/:id`     | End blind chat session |

### **Messaging**

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/messages/:chatId` | Get chat messages |
| POST   | `/messages/:chatId` | Send a message    |

## Deployment

### **1. Build for Production**

```sh
bun run build
```

### **2. Start Production Server**

```sh
bun dev
```

### **3. Deployment to Cloud Providers**

- **Vercel:** Use `vercel.json` for configuration and deploy via `vercel deploy`
- **AWS (EC2 or Lambda):** Use `pm2` for process management and configure security groups
- **DigitalOcean:** Deploy using a droplet and configure firewall settings

## Security Measures

- **JWT Authentication** for secure API access
- **Bcrypt Hashing** for password encryption
- **Rate Limiting** to prevent abuse (max requests per minute per IP)
- **CORS Policy** to allow frontend communication
- **Input Validation** to prevent SQL injection and XSS attacks
- **Database Encryption** for sensitive user data

## Bonus Features (Optional Enhancements)

- Push notifications for matches/messages
- User blocking/reporting system
- Advanced AI-based matching algorithm

## Submission Requirements

1. **GitHub Repository** with source code
2. **README.md** file with project overview and setup instructions
3. **APK file** for Android or **TestFlight link** for iOS

## Timeline

- **Total duration:** 7 days

---

⚡ **_“A well-executed app with basic features is better than a complex app with unstable features. Focus on quality over quantity.”_**
