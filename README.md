# AI-Chat-App

A full-stack AI-powered chat application featuring a Flutter mobile frontend and a Node.js/Express backend integrated with Google Gemini AI API. Communicate with an intelligent chatbot, generate images with AI, and manage your chat history all in one place.

## 📱 Project Overview

**AI-Chat-App** is a modern, feature-rich chat application that allows users to interact with an AI-powered chatbot powered by Google Gemini. The application includes comprehensive user authentication, profile management, persistent chat history storage, and AI-powered image generation capabilities.

### ✨ Key Features
- ✅ **User Authentication** - Secure registration, login, and logout
- ✅ **JWT Security** - Access & Refresh token system with configurable expiry
- ✅ **User Profiles** - Avatar upload to Cloudinary, password management
- ✅ **AI Chat Integration** - Real-time chat with Google Gemini AI (Thinking Level: HIGH)
- ✅ **Image Generation** - AI-powered image creation using Gemini API
- ✅ **Chat Persistence** - MongoDB-backed message history storage
- ✅ **File Upload** - Secure Cloudinary integration for media uploads
- ✅ **Cross-Platform** - Native support for Android & iOS via Flutter
- ✅ **RESTful API** - CORS-enabled, well-structured endpoints
- ✅ **Production-Ready** - Error handling, input validation, security best practices

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

## � Quick Start

### Backend Setup
```bash
cd server
npm install
cp .env.example .env  # Configure environment variables
npm start
```

### Frontend Setup
```bash
cd client
flutter pub get
flutter run
```

---

## �📊 Database Schema

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

### Chat Routes (`/api/v1/chat`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/chatwithai` | Send message to Gemini AI and get response | ✅ |
| POST | `/createimage` | Generate images using Gemini AI | ✅ |

**✅ = JWT Authentication Required**

### Example API Requests

#### Register User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

#### Chat with AI
```bash
curl -X POST http://localhost:5000/api/v1/chat/chatwithai \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "message": "What is the meaning of life?"
  }'
```

#### Generate AI Image
```bash
curl -X POST http://localhost:5000/api/v1/chat/createimage \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "prompt": "A beautiful sunset over mountains"
  }'
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** 18+ & npm/yarn
- **MongoDB** 5.0+ (Local installation or Atlas cloud)
- **Flutter SDK** 3.11.5+
- **Android Studio** with Android SDK (for Android development)
- **Xcode** 13+ (for iOS development)
- **Google Gemini API Key** - [Get here](https://ai.google.dev/)
- **Cloudinary Account** - [Sign up here](https://cloudinary.com/)

### Clone the Repository

```bash
git clone https://github.com/Ritamnandy/AI-Chat-App.git
cd AI-Chat-App
```

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install Node dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in `server/` directory with your credentials:
   ```env
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp_db
   GEMINI_API_KEY=your_google_gemini_api_key_here
   CLOUDINARY_NAME=your_cloudinary_account_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret_key_generate_random_string
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_generate_random_string
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=7d
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   ✅ Server will run at `http://localhost:5000` with auto-reload enabled (nodemon)

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install Flutter dependencies**
   ```bash
   flutter pub get
   ```

3. **Configure backend URL** (update in your Flutter code)
   - Modify the API base URL to point to your backend server

4. **Run on Android**
   ```bash
   flutter run -d android
   ```

5. **Run on iOS**
   ```bash
   flutter run -d ios
   ```

6. **Run on Web** (if configured)
   ```bash
   flutter run -d web
   ```

### Verify Installation

Check if the server is running:
```bash
curl http://localhost:5000/health
```

Test the API:
```bash
curl http://localhost:5000/api/v1/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"Test123"}'
```

---

## 🤖 AI Integration

The application integrates with **Google Gemini AI** through the `@google/genai` SDK for both conversational AI and image generation capabilities.

### Gemini AI Configuration
- **Model**: `gemini-2.0-flash-thinking-exp-1219` (or latest available)
- **Thinking Level**: HIGH - Enables deeper reasoning and better response quality
- **Features**: Streaming responses, extended thinking, real-time processing

### Chat Features
```javascript
// Real-time AI conversation
- Stream-based responses for faster user feedback
- Context preservation across multiple messages
- Advanced reasoning with extended thinking enabled
- Error handling and graceful degradation
```

### Image Generation Features
```javascript
// AI-powered image creation
- Text-to-image generation using Gemini Vision
- Customizable prompts and parameters
- Support for various image styles and formats
- Rate limiting to prevent API abuse
```

### Example Implementation (JavaScript/Node.js)
```javascript
// Send a chat message to Gemini
const messageWithAI = async (userMessage) => {
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-thinking-exp-1219",
        contents: [{
            role: "user",
            parts: [{ text: userMessage }]
        }],
        config: {
            thinkingConfig: {
                thinkingLevel: "HIGH",
            },
            temperature: 0.7,
        }
    });
    return response.text();
}

// Generate an image from a prompt
const generateImageWithAI = async (prompt) => {
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{
            role: "user",
            parts: [{ text: `Generate an image of: ${prompt}` }]
        }]
    });
    return response.content;
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

## 🚧 Current Status & Roadmap

### ✅ Completed Features
- [x] User authentication system (registration, login, logout)
- [x] JWT token management (access & refresh tokens)
- [x] MongoDB integration with Mongoose ODM
- [x] Gemini AI integration for chat
- [x] AI-powered image generation API
- [x] File upload with Cloudinary
- [x] User avatar management
- [x] Password hashing with bcrypt
- [x] API routes structure (RESTful)
- [x] Middleware setup (auth, CORS, file upload)
- [x] Error handling & validation
- [x] Flutter project structure

### 🚀 In Progress / Planned Features
- [ ] Complete Flutter UI implementation
- [ ] Chat UI with message display
- [ ] User profile management UI
- [ ] Real-time messaging with WebSocket/Socket.io
- [ ] Message history pagination
- [ ] Search functionality
- [ ] Dark mode support
- [ ] Offline message queue
- [ ] Push notifications
- [ ] Unit & Integration tests
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Docker containerization
- [ ] CI/CD pipeline

### 🔮 Future Enhancements
- Voice/audio message support
- Video call integration
- Group chat functionality
- File sharing and preview
- Message encryption
- Analytics dashboard
- Multi-language support

---

## � Troubleshooting

### Server Issues

#### Port Already in Use
```bash
# Kill the process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use a different port
PORT=5001 npm start
```

#### MongoDB Connection Failed
- Verify MongoDB URI in `.env` file
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure MongoDB service is running (local installation)
- Test connection: `mongodb+srv://user:pass@cluster.mongodb.net/`

#### GEMINI_API_KEY Error
- Verify API key in `.env` file (no extra spaces)
- Check if Gemini API is enabled in Google Cloud Console
- Ensure API key has necessary permissions
- Test API key validity: https://ai.google.dev/

#### Cloudinary Upload Failed
- Verify Cloudinary credentials in `.env` file
- Check API key and secret are correct
- Ensure Cloudinary account is active
- Verify upload folder permissions

### Frontend Issues

#### Flutter Build Fails
```bash
flutter clean
flutter pub get
flutter pub upgrade
flutter run
```

#### Android Build Issues
```bash
cd android
./gradlew clean
./gradlew build
cd ..
flutter run
```

#### iOS Build Issues
```bash
cd ios
rm -rf Pods Pod.lock
pod install
cd ..
flutter run -d ios
```

### API Testing

Use Postman or VS Code REST Client for testing:
```
### Register User
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

---

## 📊 Database Schema Details

### User Model (MongoDB)
```javascript
{
  _id: ObjectId,
  firstName: String,      // Required, trimmed, lowercase
  lastName: String,       // Required, trimmed, lowercase
  email: String,          // Required, unique, indexed, lowercase
  password: String,       // Required, bcrypt hashed (10 rounds)
  avatar: String,         // Cloudinary URL (optional)
  refreshToken: String,   // JWT refresh token
  createdAt: Timestamp,   // Auto-generated
  updatedAt: Timestamp    // Auto-generated
}
```

### Chat Model (MongoDB)
```javascript
{
  _id: ObjectId,
  owner: ObjectId,        // Reference to User (indexed)
  userMessages: [String], // Array of user messages
  botMessages: [String],  // Array of AI responses
  createdAt: Timestamp,   // Auto-generated
  updatedAt: Timestamp    // Auto-generated
}
```

---

## 🏗️ Project Architecture

### Backend Architecture
```
Request → CORS → Parser → Auth Middleware → Route Handler → 
  → Controller → AI Service/DB → Response Formatter → Client
```

### Frontend Architecture
```
User Input → UI Layer → API Client → Auth Handler → 
  → Response Handler → State Management → UI Update
```

---

## 📚 API Response Format

### Success Response
```json
{
  "status": 200,
  "message": "Success message",
  "data": {
    "key": "value"
  }
}
```

### Error Response
```json
{
  "status": 400,
  "message": "Error message",
  "errors": ["Field error 1", "Field error 2"]
}
```

---

## 🔐 Authentication Flow

### JWT Token Flow
1. User registers/logs in with credentials
2. Server validates and generates Access Token (1 day) + Refresh Token (7 days)
3. Client stores tokens (Access in memory, Refresh in secure storage)
4. For protected routes, send: `Authorization: Bearer <access_token>`
5. If Access Token expires, use Refresh Token to get new tokens
6. On logout, clear tokens on both client and server

### Token Structure
```
Access Token: 
  - Expires: 1 day (configurable via ACCESS_TOKEN_EXPIRY)
  - Used for: API requests

Refresh Token:
  - Expires: 7 days (configurable via REFRESH_TOKEN_EXPIRY)
  - Used for: Obtaining new access tokens
  - Stored securely on client and server
```

---

## 🔍 File Structure Reference

[See full structure above in Project Structure section]

### Key Files:
- `server/src/index.js` - Server entry point
- `server/src/app.js` - Express app configuration
- `server/src/controllers/` - Business logic
- `server/src/models/` - MongoDB schemas
- `server/src/routes/` - API endpoints
- `client/lib/main.dart` - Flutter app entry point

---

## 🎯 Best Practices

### For Backend Development
1. Always validate user input
2. Hash passwords before storing
3. Use environment variables for secrets
4. Implement proper error handling
5. Add request/response logging
6. Follow RESTful conventions
7. Use middleware for cross-cutting concerns

### For Frontend Development
1. Handle loading and error states
2. Implement proper token refresh logic
3. Use secure storage for sensitive data
4. Add input validation before API calls
5. Implement proper error messages
6. Use state management effectively
7. Add offline support if needed

---

## 📄 License

## 📄 License

ISC License - See LICENSE file for details

---

## 👤 Author

**Ritamnandy**

- GitHub: [@Ritamnandy](https://github.com/Ritamnandy)
- Repository: [AI-Chat-App](https://github.com/Ritamnandy/AI-Chat-App)

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Areas for Contribution
- 🎨 UI/UX improvements in Flutter
- 🐛 Bug fixes and debugging
- 📚 Documentation improvements
- ✨ New features and enhancements
- 🧪 Tests and test coverage
- 🔒 Security improvements

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- 📌 Open an [Issue](https://github.com/Ritamnandy/AI-Chat-App/issues) on GitHub
- 💬 Create a [Discussion](https://github.com/Ritamnandy/AI-Chat-App/discussions)
- 📧 Contact via GitHub profile

---

## 📝 Changelog

### v1.0.0 (Current)
- Initial project setup with full backend
- User authentication and JWT system
- Gemini AI chat integration
- Image generation feature
- File upload with Cloudinary
- MongoDB persistence
- Flutter project structure

### Planned Releases
- v1.1.0 - Complete Flutter UI
- v1.2.0 - Real-time messaging
- v2.0.0 - Advanced features (voice, video, groups)

---

## 📋 Related Resources

### Documentation
- [Flutter Documentation](https://flutter.dev/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Google Gemini AI API](https://ai.google.dev/)
- [Cloudinary Docs](https://cloudinary.com/documentation)

### Tools & Services
- [Postman](https://www.postman.com/) - API Testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - DB Management
- [VS Code](https://code.visualstudio.com/) - Code Editor
- [Android Studio](https://developer.android.com/studio) - Android Development
- [Xcode](https://developer.apple.com/xcode/) - iOS Development

---

**Last Updated**: May 19, 2026  
**Status**: 🟢 Active Development  
**Version**: 1.0.0
