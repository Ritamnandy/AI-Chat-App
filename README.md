# AI-Chat-App

A full-stack AI-powered chat application featuring a Flutter mobile frontend and a Node.js/Express backend integrated with Google Gemini AI API.

## 📱 Project Overview

**AI-Chat-App** is a modern chat application that allows users to communicate with an AI-powered chatbot powered by Google Gemini. The application includes user authentication, profile management, and persistent chat history storage.

### Key Features
- ✅ User authentication (registration, login, logout)
- ✅ JWT-based session management with token refresh
- ✅ User profile management (avatar upload, password change)
- ✅ AI-powered chat with Google Gemini API
- ✅ Chat history persistence in MongoDB
- ✅ File upload integration with Cloudinary
- ✅ Cross-platform support (Android & iOS via Flutter)
- ✅ CORS-enabled REST API

---

## 📁 Project Structure

```
AI-Chat-App/
├── client/                          # Flutter mobile application
│   ├── lib/                         # Flutter source code
│   │   └── main.dart               # App entry point
│   ├── android/                     # Android-specific files
│   │   └── app/                     # Android app configuration
│   ├── ios/                         # iOS-specific files
│   │   └── Runner/                  # iOS app configuration
│   ├── pubspec.yaml                # Flutter dependencies
│   └── analysis_options.yaml        # Dart lint configuration
│
└── server/                          # Node.js/Express backend
    ├── src/
    │   ├── app.js                   # Express app configuration
    │   ├── index.js                 # Server entry point
    │   ├── constants.js             # Application constants
    │   ├── controllers/             # Business logic layer
    │   │   ├── user.controller.js   # User-related operations
    │   │   └── chat.controller.js   # Chat AI integration
    │   ├── models/                  # MongoDB schemas
    │   │   ├── user.models.js       # User schema with auth
    │   │   └── chat.models.js       # Chat messages schema
    │   ├── routes/                  # API route definitions
    │   │   └── user.routes.js       # Authentication & user routes
    │   ├── middlewares/             # Express middlewares
    │   │   ├── auth.middlewares.js  # JWT authentication
    │   │   └── multer.middlewares.js# File upload handling
    │   ├── db/                      # Database configuration
    │   │   └── connect.db.js        # MongoDB connection
    │   ├── utils/                   # Utility functions
    │   │   ├── apiresponse.js       # API response formatter
    │   │   ├── apierror.js          # Custom error handler
    │   │   ├── asynchandelar.js     # Async error wrapper
    │   │   └── uploadcloudinary.js  # Cloudinary uploader
    │   └── public/                  # Static files & uploads
    │       └── uploads/             # Temporary file storage
    └── package.json                 # Server dependencies

```

---

## 🔧 Tech Stack

### Frontend (Client)
- **Framework**: Flutter 3.11.5+
- **Language**: Dart
- **Platforms**: Android & iOS
- **UI**: Material Design (Cupertino for iOS)

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Language**: JavaScript (ES Modules)
- **Database**: MongoDB 9.6.2
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcrypt 6.0.0
- **File Upload**: Multer 2.1.1
- **File Storage**: Cloudinary 2.10.0
- **AI Integration**: Google Gemini AI (@google/genai 2.3.0)
- **Environment**: dotenv 17.4.2
- **CORS**: cors 2.8.6
- **Cookies**: cookie-parser 1.4.7
- **Dev**: nodemon 3.1.14 (auto-reload)

---

## 📊 Database Schema

### User Model
```
{
  _id: ObjectId
  firstName: String (required, trimmed, lowercase)
  lastName: String (required, trimmed, lowercase)
  email: String (required, unique, indexed, lowercase)
  password: String (required, bcrypt hashed)
  avatar: String (Cloudinary URL)
  refreshToken: String (JWT refresh token)
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### Chat Model
```
{
  _id: ObjectId
  owner: ObjectId (reference to User, indexed)
  userMessage: [String] (array of user messages)
  botMessage: [String] (array of AI bot responses)
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

---

## 🔐 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register a new user | ❌ |
| POST | `/login` | Login user & get tokens | ❌ |
| POST | `/refreshaccesstoken` | Refresh JWT token | ❌ |
| POST | `/logout` | Logout user (clear tokens) | ✅ |
| POST | `/changepassword` | Change user password | ✅ |
| POST | `/avatar` | Upload user avatar | ✅ |
| GET | `/me` | Get current user details | ✅ |

**✅ = JWT Authentication Required**

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ & npm
- MongoDB (local or Atlas)
- Flutter SDK 3.11.5+
- Android Studio (for Android development)
- Xcode (for iOS development)
- Google Gemini API Key
- Cloudinary Account

### Clone the Repository

```bash
git clone https://github.com/Ritamnandy/AI-Chat-App.git
cd AI-Chat-App
```

### Backend Setup

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file** in `server/` directory:
   ```env
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp_db
   GEMINI_API_KEY=your_google_gemini_api_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=7d
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   Server runs at `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd client
   flutter pub get
   ```

2. **Run on Android**
   ```bash
   flutter run -d android
   ```

3. **Run on iOS**
   ```bash
   flutter run -d ios
   ```

---

## 🤖 AI Integration

The application integrates with **Google Gemini AI** through the `@google/genai` SDK.

### Chat Controller Features
- Model: `gemini-3-flash-preview`
- Thinking Level: HIGH (for better reasoning)
- Real-time streaming responses
- Error handling for API failures

### Example Usage
```javascript
const chatWithGemini = async (input) => {
    const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
            thinkingConfig: {
                thinkingLevel: ThinkingLevel.HIGH,
            },
        }
    })
    return response.text;
}
```

---

## 🔐 Security Features

- **Password Security**: Bcrypt hashing with 10 salt rounds
- **JWT Authentication**: Access & Refresh token system
- **CORS Protection**: Configurable CORS origin
- **Protected Routes**: Middleware-based route protection
- **Secure Cookies**: HTTP-only cookie support
- **Input Validation**: Trimmed and lowercase email/password
- **Error Handling**: Custom async error wrapper

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | 5.2.1 | Web framework |
| mongoose | 9.6.2 | MongoDB ODM |
| jsonwebtoken | 9.0.3 | JWT authentication |
| bcrypt | 6.0.0 | Password hashing |
| @google/genai | 2.3.0 | Gemini AI API |
| cloudinary | 2.10.0 | Cloud file storage |
| multer | 2.1.1 | File upload handling |
| cors | 2.8.6 | CORS middleware |
| dotenv | 17.4.2 | Environment variables |
| nodemon | 3.1.14 | Development auto-reload |

---

## 🛠 Development

### Running in Development Mode
```bash
cd server
npm start
# Uses nodemon for auto-reload on file changes
```

### Available Scripts
```bash
npm start    # Start server with nodemon
npm install  # Install dependencies
```

---

## 📝 Middleware Stack

### Request Processing Pipeline
1. **express.json()** - Parse JSON bodies
2. **express.urlencoded()** - Parse URL-encoded data
3. **cookieParser()** - Parse cookies
4. **CORS** - Enable cross-origin requests
5. **express.static()** - Serve public files
6. **verifyJWT** - Verify JWT tokens (protected routes)
7. **upload** - Handle file uploads with Multer

---

## ⚙️ Configuration

### Environment Variables Required
- `PORT` - Server port (default: 5000)
- `CORS_ORIGIN` - Allowed CORS origin
- `MONGODB_URI` - MongoDB connection string
- `GEMINI_API_KEY` - Google Gemini API key
- `CLOUDINARY_NAME` - Cloudinary account name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - JWT refresh secret

---

## 🚧 Current Status

- [x] User authentication system
- [x] JWT token management
- [x] MongoDB integration
- [x] Gemini AI integration
- [x] File upload with Cloudinary
- [x] API routes structure
- [x] Middleware setup
- [ ] Frontend UI implementation (Flutter)
- [ ] Chat functionality integration
- [ ] Real-time messaging (WebSocket)
- [ ] Unit tests
- [ ] API documentation (Swagger/OpenAPI)

---

## 📝 License

ISC License

---

## 👤 Author

**Ritamnandy**

Repository: [Ritamnandy/AI-Chat-App](https://github.com/Ritamnandy/AI-Chat-App)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.

---

**Last Updated**: May 19, 2026
