# 🚀 AI-Chat-App Backend (Node.js/Express)

The Node.js/Express backend for the AI-Chat-App, providing RESTful API endpoints for user authentication, chat management, and Gemini AI integration.

## 📋 Overview

This backend service handles:
- User authentication and JWT token management
- Chat history persistence in MongoDB
- Gemini AI API integration for conversations
- AI image generation
- File uploads to Cloudinary
- User profile management

---

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+ ([Download](https://nodejs.org/))
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB 5.0+
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcrypt 6.0.0
- **File Upload**: Multer 2.1.1
- **Cloud Storage**: Cloudinary 2.10.0
- **AI Integration**: Google Gemini API (@google/genai 2.3.0)
- **Utilities**: dotenv, cors, cookie-parser
- **Development**: nodemon 3.1.14

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB 5.0+
- API Keys (Gemini, Cloudinary)

### Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env  # If available
   # Or create manually with the configuration shown below
   ```

4. **Configure environment variables** (see Configuration section)

5. **Start the server**
   ```bash
   npm start
   ```
   Server will run at `http://localhost:5000` with auto-reload via nodemon

---

## ⚙️ Configuration

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Client Configuration
CORS_ORIGIN=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_in_production
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d

# Google Gemini AI Configuration
GEMINI_API_KEY=your_google_gemini_api_key

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_account_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Environment Variables Explanation

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment type | `development`, `production` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | Random strong string |
| `JWT_REFRESH_SECRET` | Refresh token secret | Random strong string |
| `ACCESS_TOKEN_EXPIRY` | Access token duration | `1d`, `24h`, `3600s` |
| `REFRESH_TOKEN_EXPIRY` | Refresh token duration | `7d`, `168h` |
| `GEMINI_API_KEY` | Google Gemini API key | Get from [ai.google.dev](https://ai.google.dev) |
| `CLOUDINARY_NAME` | Cloudinary account name | Your account name |
| `CLOUDINARY_API_KEY` | Cloudinary API key | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | From Cloudinary dashboard |

---

## 📁 Project Structure

```
server/
├── src/
│   ├── index.js                    # Server entry point
│   ├── app.js                      # Express configuration
│   ├── constants.js                # App constants
│   │
│   ├── controllers/                # Business logic
│   │   ├── user.controller.js      # User operations
│   │   └── chat.controller.js      # Chat & AI operations
│   │
│   ├── models/                     # MongoDB schemas
│   │   ├── user.models.js          # User schema
│   │   └── chat.models.js          # Chat schema
│   │
│   ├── routes/                     # API route definitions
│   │   ├── user.routes.js          # Auth endpoints
│   │   └── chat.routes.js          # Chat endpoints
│   │
│   ├── middlewares/                # Express middlewares
│   │   ├── auth.middlewares.js     # JWT verification
│   │   └── multer.middlewares.js   # File upload config
│   │
│   ├── db/                         # Database
│   │   └── connect.db.js           # MongoDB connection
│   │
│   ├── utils/                      # Utility functions
│   │   ├── apiresponse.js          # Response formatter
│   │   ├── apierror.js             # Error handler
│   │   ├── asynchandelar.js        # Async wrapper
│   │   └── uploadcloudinary.js     # Cloudinary helper
│   │
│   └── public/                     # Static files
│       └── uploads/                # Temporary uploads
│
├── package.json                    # Dependencies
└── .env                            # Environment variables (create this)
```

---

## 🔐 API Endpoints

### Base URL: `http://localhost:5000/api/v1`

### Authentication (`/auth`)

| Method | Endpoint | Description | Auth | Body |
|--------|----------|-------------|------|------|
| POST | `/auth/register` | Register user | ❌ | `{firstName, lastName, email, password}` |
| POST | `/auth/login` | Login user | ❌ | `{email, password}` |
| POST | `/auth/refreshaccesstoken` | Refresh token | ❌ | `{refreshToken}` |
| POST | `/auth/logout` | Logout user | ✅ | - |
| POST | `/auth/changepassword` | Change password | ✅ | `{oldPassword, newPassword}` |
| POST | `/auth/avatar` | Upload avatar | ✅ | `FormData: {avatar: file}` |
| GET | `/auth/me` | Current user info | ✅ | - |

### Chat (`/chat`)

| Method | Endpoint | Description | Auth | Body |
|--------|----------|-------------|------|------|
| POST | `/chat/chatwithai` | Send chat message | ✅ | `{message: string}` |
| POST | `/chat/createimage` | Generate image | ✅ | `{prompt: string}` |

---

## 📡 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Chat with AI
```bash
curl -X POST http://localhost:5000/api/v1/chat/chatwithai \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "message": "What is the capital of France?"
  }'
```

### Generate Image
```bash
curl -X POST http://localhost:5000/api/v1/chat/createimage \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "prompt": "A beautiful sunset over mountains"
  }'
```

### Upload Avatar
```bash
curl -X POST http://localhost:5000/api/v1/auth/avatar \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "avatar=@/path/to/image.jpg"
```

---

## 🔐 Authentication & Security

### JWT Tokens
- **Access Token**: Short-lived (1 day), used for API requests
- **Refresh Token**: Long-lived (7 days), used to obtain new access tokens
- **Format**: `Bearer <token>` in Authorization header

### Password Security
- Hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Compared securely during login

### Protected Routes
Routes requiring authentication:
- `/auth/logout`
- `/auth/changepassword`
- `/auth/avatar`
- `/auth/me`
- `/chat/chatwithai`
- `/chat/createimage`

### CORS Protection
- Configured to specific origin
- Credentials allowed
- Configurable via environment

---

## 📊 Database Schemas

### User Schema
```javascript
{
  _id: ObjectId,
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: String,                    // Cloudinary URL
  refreshToken: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Chat Schema
```javascript
{
  _id: ObjectId,
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  userMessages: [String],            // Array of user messages
  botMessages: [String],             // Array of AI responses
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

---

## 🚀 Development

### Start Server
```bash
npm start
```
Starts with nodemon - auto-reloads on file changes

### Scripts Available
```bash
npm start     # Start with nodemon
npm install   # Install dependencies
```

### Add New Dependencies
```bash
npm install package-name
npm install --save-dev package-name  # Dev dependency
```

---

## 🛡️ Middleware Stack

The request processing pipeline:

```
1. express.json()              - Parse JSON bodies
2. express.urlencoded()        - Parse form data
3. cookieParser()              - Parse cookies
4. cors()                      - CORS configuration
5. express.static()            - Serve static files
6. verifyJWT()                 - JWT authentication (protected routes)
7. multer upload()             - File upload handling
8. Route Handler               - Business logic
9. Error Handler               - Custom error handling
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
- Check MongoDB URI in `.env`
- Verify IP address is whitelisted in MongoDB Atlas
- Ensure MongoDB service is running
- Test connection with MongoDB Compass

### GEMINI_API_KEY Not Working
- Verify API key is correct (no extra spaces)
- Check API is enabled in Google Cloud Console
- Ensure API key has Generative AI permissions
- Test at https://ai.google.dev/

### Cloudinary Upload Fails
- Verify credentials in `.env`
- Check account is active
- Ensure API permissions are set correctly
- Test credentials in Cloudinary dashboard

---

## 📝 Response Format

### Success Response
```json
{
  "status": 200,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "firstName": "John",
      "email": "john@example.com"
    }
  }
}
```

### Error Response
```json
{
  "status": 400,
  "message": "Validation error",
  "errors": [
    "Email is required",
    "Password must be at least 6 characters"
  ]
}
```

---

## 🔍 Logging & Debugging

### Enable Verbose Logging
```bash
DEBUG=* npm start
```

### Check Server Health
```bash
curl http://localhost:5000/health
```

### Monitor Requests
Use tools like:
- Postman
- Thunder Client
- VS Code REST Client
- curl commands

---

## 🚢 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets
- [ ] Enable HTTPS
- [ ] Set appropriate CORS origins
- [ ] Use MongoDB Atlas (not local)
- [ ] Configure environment variables on server
- [ ] Set up database backups
- [ ] Enable API rate limiting
- [ ] Add request logging
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Use process manager (PM2)

### Deploy to Cloud
Popular options:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean
- Google Cloud
- Azure

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [Google Gemini API](https://ai.google.dev/)
- [Cloudinary SDK](https://cloudinary.com/documentation/node_integration)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman API Testing](https://www.postman.com/)

---

## 🤝 Contributing

See the main [AI-Chat-App README](../README.md) for contribution guidelines.

---

## 📄 License

ISC License

---

**Last Updated**: May 19, 2026  
**Version**: 1.0.0  
**Status**: 🟢 Active Development
