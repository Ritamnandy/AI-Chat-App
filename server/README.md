# 🚀 AI-Chat-App Backend (Node.js/Express)

The Node.js/Express backend for the AI-Chat-App, providing RESTful API endpoints for user authentication, chat management, and Gemini AI integration.

## 📋 Overview

This backend service handles:
- ✅ User authentication and JWT token management
- ✅ Chat history persistence in MongoDB
- ✅ Gemini AI API integration for intelligent conversations
- ✅ AI image generation from text prompts
- ✅ File uploads and management via Cloudinary
- ✅ User profile management with avatar support
- ✅ Secure password hashing with bcrypt
- ✅ HTTP-only cookie-based token storage

---

## 🛠️ Tech Stack

| Component | Package | Version |
|-----------|---------|---------|
| **Runtime** | Node.js | 18+ |
| **Framework** | Express.js | 5.2.1 |
| **Database** | MongoDB | 5.0+ |
| **Authentication** | jsonwebtoken | 9.0.3 |
| **Encryption** | bcrypt | 6.0.0 |
| **File Upload** | Multer | 2.1.1 |
| **Cloud Storage** | Cloudinary | 2.10.0 |
| **AI Integration** | @google/genai | 2.3.0 |
| **Middleware** | cors, cookie-parser | Latest |
| **Development** | nodemon | 3.1.14 |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- MongoDB 5.0+ ([Install](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- API Keys:
  - Google Gemini API key from [ai.google.dev](https://ai.google.dev)
  - Cloudinary account from [cloudinary.com](https://cloudinary.com)

### Setup Steps

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

### Verify Installation
```bash
# Server should output:
# Server is running on port 5000
```

---

## ⚙️ Configuration

Create a `.env` file in the `server/` directory with the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Client Configuration
CORS_ORIGIN=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp_db

# JWT Configuration
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_change_in_production
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_change_in_production
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

| Variable | Type | Description | Example | Required |
|----------|------|-------------|---------|----------|
| `PORT` | number | Server port | `5000` | ✅ |
| `NODE_ENV` | string | Environment type | `development` or `production` | ✅ |
| `CORS_ORIGIN` | string | Allowed CORS origin for client | `http://localhost:3000` | ✅ |
| `MONGODB_URI` | string | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` | ✅ |
| `ACCESS_TOKEN_SECRET` | string | JWT access token secret (min 32 chars) | Random strong string | ✅ |
| `REFRESH_TOKEN_SECRET` | string | JWT refresh token secret (min 32 chars) | Random strong string | ✅ |
| `ACCESS_TOKEN_EXPIRY` | string | Access token duration | `1d`, `24h`, `3600s` | ✅ |
| `REFRESH_TOKEN_EXPIRY` | string | Refresh token duration | `7d`, `168h` | ✅ |
| `GEMINI_API_KEY` | string | Google Gemini API key | Get from [ai.google.dev](https://ai.google.dev) | ✅ |
| `CLOUDINARY_NAME` | string | Cloudinary account name | Your account name | ✅ |
| `CLOUDINARY_API_KEY` | string | Cloudinary API key | From Cloudinary dashboard | ✅ |
| `CLOUDINARY_API_SECRET` | string | Cloudinary API secret | From Cloudinary dashboard | ✅ |

### Getting API Keys

#### MongoDB URI
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/database_name`

#### Google Gemini API Key
1. Visit [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key"
3. Copy the generated API key

#### Cloudinary Credentials
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy: Cloud Name, API Key, and API Secret

---

## 📁 Project Structure

```
server/
├── src/
│   ├── index.js                    # Server entry point & startup
│   ├── app.js                      # Express app configuration
│   ├── constants.js                # App constants
│   │
│   ├── controllers/                # Business logic handlers
│   │   ├── user.controller.js      # User auth & profile operations
│   │   └── chat.controller.js      # Chat & AI operations
│   │
│   ├── models/                     # MongoDB data models
│   │   ├── user.models.js          # User schema & methods
│   │   └── chat.models.js          # Chat/Message schema
│   │
│   ├── routes/                     # API endpoint definitions
│   │   ├── user.routes.js          # Auth endpoints
│   │   └── chat.routes.js          # Chat & AI endpoints
│   │
│   ├── middlewares/                # Express middleware functions
│   │   ├── auth.middlewares.js     # JWT token verification
│   │   └── multer.middlewares.js   # File upload configuration
│   │
│   ├── db/                         # Database connection
│   │   └── connect.db.js           # MongoDB connection setup
│   │
│   ├── utils/                      # Utility & helper functions
│   │   ├── apiresponse.js          # Standardized response formatter
│   │   ├── apierror.js             # Custom error handler
│   │   ├── asynchandelar.js        # Async error wrapper
│   │   ├── allaifetures.js         # AI/Gemini integration logic
│   │   └── uploadcloudinary.js     # Cloudinary upload helper
│   │
│   └── public/                     # Static files & uploads
│       └── uploads/                # Temporary file storage
│
├── package.json                    # Project dependencies
├── README.md                       # This file
├── api_doc.md                      # Detailed API documentation
└── .env                            # Environment variables (create manually)
```

---

## 🔐 API Endpoints

### Base URL: `http://localhost:5000/api/v1`

### Authentication Routes (`/auth`)

| Method | Endpoint | Description | Auth | Content-Type |
|--------|----------|-------------|------|--------------|
| POST | `/auth/register` | Register new user | ❌ | application/json |
| POST | `/auth/login` | Login user | ❌ | application/json |
| POST | `/auth/refreshaccesstoken` | Refresh access token | ❌ | application/json |
| POST | `/auth/logout` | Logout user | ✅ | application/json |
| POST | `/auth/changepassword` | Change password | ✅ | application/json |
| POST | `/auth/avatar` | Upload user avatar | ✅ | multipart/form-data |
| GET | `/auth/me` | Get current user info | ✅ | - |

### Chat Routes (`/chat`)

| Method | Endpoint | Description | Auth | Content-Type |
|--------|----------|-------------|------|--------------|
| POST | `/chat/chatwithai` | Send message to AI | ✅ | application/json |
| POST | `/chat/createimage` | Generate AI image | ✅ | application/json |

**📘 For detailed endpoint documentation, see [api_doc.md](./api_doc.md)**

---

## 📡 Quick API Examples

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

### Login User
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

### Get Current User
```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🔐 Authentication & Security

### JWT Tokens
- **Access Token**: Short-lived (1 day), used for protected API requests
- **Refresh Token**: Long-lived (7 days), used to obtain new access tokens
- **Storage**: HTTP-only cookies (secure, httpOnly flags enabled)
- **Format**: `Bearer <token>` in Authorization header OR automatically via cookies

### Password Security
- Hashed with bcrypt (10 salt rounds)
- Never stored or returned in plain text
- Securely compared during authentication
- Passwords cannot be the same as other passwords in DB (unique constraint)

### Protected Routes
The following routes require a valid JWT token in the `Authorization` header or as a cookie:
- `POST /auth/logout`
- `POST /auth/changepassword`
- `POST /auth/avatar`
- `GET /auth/me`
- `POST /chat/chatwithai`
- `POST /chat/createimage`

### CORS Protection
- Restricted to specified origin (configurable via `CORS_ORIGIN` env var)
- Credentials allowed for cookie-based authentication
- Set appropriate origin in production

---

## 📊 Database Schemas

### User Model
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
    trim: true,
    lowercase: true,
    index: true                     // Indexed for fast lookups
  },
  password: {
    type: String,
    required: true,
    unique: true                    // Hashed password
  },
  avatar: {
    type: String,                   // Cloudinary URL
    trim: true
  },
  refreshToken: {
    type: String,                   // JWT refresh token
    trim: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Model
```javascript
{
  _id: ObjectId,
  Owner: {                          // Reference to User (note: typo in original code)
    type: ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    default: "New Chat"             // Chat session title
  },
  Message: [
    {
      role: String,                 // "user" or "model"
      text: String,                 // Message content
      _id: false                     // No sub-document IDs
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Development & Running the Server

### Start Development Server
```bash
npm start
```
- Starts with nodemon for auto-reload on file changes
- Server listens on port specified in `.env` (default: 5000)
- Connected to MongoDB (ensure connection string is valid)

### Available npm Scripts
```bash
npm start      # Start server with nodemon (development)
npm install    # Install all dependencies
```

### Environment Variables at Runtime
All configuration comes from `.env` file. Changes require server restart.

---

## 🛡️ Middleware Stack

The request processing pipeline for each request:

```
1. express.json()              - Parse incoming JSON bodies
2. express.urlencoded()        - Parse form-encoded bodies
3. cookieParser()              - Parse cookies from headers
4. cors()                      - Handle CORS with credentials
5. express.static()            - Serve public static files
6. Route matching              - Match request to route handler
7. verifyJWT()                 - JWT token verification (protected routes only)
8. multer.single()             - File upload handling (avatar route)
9. Controller logic            - Business logic execution
10. Response formatting        - Format response with ApiResponse
11. Error handling             - Catch and format errors with ApiError
```

---

## 🐛 Troubleshooting

### Port Already in Use (Port 5000)
```bash
# Windows - Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux - Find and kill process
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
**Error:** `Failed to connect to the database`

**Solutions:**
- Verify `MONGODB_URI` in `.env` is correct
- Check IP address is whitelisted in MongoDB Atlas network access
- Ensure MongoDB service is running
- Test connection with MongoDB Compass
- Check internet connection

### GEMINI_API_KEY Not Working
**Error:** `Invalid API key` or `Authentication failed`

**Solutions:**
- Verify API key is correct (no extra spaces)
- Check API is enabled in [Google AI Studio](https://ai.google.dev/)
- Ensure API key has Generative AI API permissions
- Test API key at https://ai.google.dev/
- Regenerate key if necessary

### Cloudinary Upload Fails
**Error:** `Failed to upload image` or `Unauthorized`

**Solutions:**
- Verify `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in `.env`
- Confirm Cloudinary account is active and not on free tier limitations
- Check account API permissions in Cloudinary dashboard
- Test credentials directly in Cloudinary dashboard
- Ensure image file is valid and not corrupted

### CORS Error
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions:**
- Verify `CORS_ORIGIN` in `.env` matches your client origin (e.g., `http://localhost:3000`)
- Check client is making requests from exact origin specified
- Ensure credentials flag is set in client requests
- Restart server after changing CORS_ORIGIN

### JWT Token Errors
**Error:** `Invalid token` or `Token expired`

**Solutions:**
- Ensure token is passed correctly in `Authorization: Bearer <token>` header
- Check token hasn't expired (compare with current time)
- Verify `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` haven't changed
- Use refresh token endpoint to get new access token
- Clear cookies if using cookie-based authentication

---

## 📝 Response Format

### Successful Response
```json
{
  "statusCode": 200,
  "message": "Operation completed successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "john",
      "lastName": "doe",
      "email": "john@example.com"
    }
  }
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": [
    "Email is required",
    "Password must be at least 6 characters"
  ]
}
```

### Status Codes Used
- `200` - OK / Success
- `201` - Created
- `400` - Bad Request / Validation error
- `401` - Unauthorized / Authentication required
- `404` - Not Found
- `500` - Internal Server Error

---

## 🚢 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use very strong, unique JWT secrets (min 32 characters)
- [ ] Enable HTTPS (not HTTP)
- [ ] Set appropriate `CORS_ORIGIN` (your production domain)
- [ ] Use MongoDB Atlas (production MongoDB instance)
- [ ] Configure all environment variables on hosting platform
- [ ] Set up database backups and replication
- [ ] Enable API rate limiting middleware
- [ ] Implement request/response logging
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Use process manager (PM2 recommended)
- [ ] Configure firewall rules
- [ ] Set up SSL/TLS certificates
- [ ] Enable GZIP compression
- [ ] Set security headers (helmet.js)

### Recommended Deployment Platforms
- **Heroku** - Easy deployment, good for small-medium projects
- **Railway** - Modern alternative to Heroku
- **Render** - Generous free tier, reliable
- **AWS EC2** - Full control, scalable
- **DigitalOcean** - Simple VPS, affordable
- **Google Cloud** - Comprehensive, enterprise-grade
- **Microsoft Azure** - Enterprise solutions
- **Vercel/Netlify** - For serverless deployments

### Deploy to Heroku (Example)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Add environment variables
heroku config:set PORT=5000
heroku config:set MONGODB_URI=your_mongodb_uri
# ... set all required environment variables

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [Multer Documentation](https://github.com/expressjs/multer)

---

## 📞 Support & Contact

For issues or questions:
1. Check the [API Documentation](./api_doc.md)
2. Review the Troubleshooting section above
3. Check logs: `npm start`
4. Verify environment variables
5. Test endpoints with Postman or curl

---

## 📄 License

This project is part of the AI-Chat-App. See main repository for license information.

---

## 👨‍💻 Authors & Contributors

- **Project Lead**: Ritamnandy
- **Repository**: [AI-Chat-App](https://github.com/Ritamnandy/AI-Chat-App)

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
