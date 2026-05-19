# 📚 AI-Chat-App API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Table of Contents
1. [Authentication Endpoints](#authentication-endpoints)
2. [Chat Endpoints](#chat-endpoints)
3. [Error Handling](#error-handling)
4. [Authentication](#authentication)
5. [Response Format](#response-format)

---

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Description:** Create a new user account

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "user_id_here",
      "firstName": "john",
      "lastName": "doe",
      "email": "john@example.com",
      "avatar": null,
      "createdAt": "2026-05-19T10:30:00.000Z",
      "updatedAt": "2026-05-19T10:30:00.000Z"
    },
    "accessT": "jwt_access_token",
    "refreshT": "jwt_refresh_token"
  }
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": ["User already exists"]
}
```

**Notes:**
- Email must be unique
- Password is automatically hashed using bcrypt
- Access and refresh tokens are set as HTTP-only cookies
- Tokens are also returned in response body

---

### 2. Login User
**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and get tokens

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "user_id_here",
      "firstName": "john",
      "lastName": "doe",
      "email": "john@example.com",
      "avatar": "cloudinary_url_here",
      "createdAt": "2026-05-19T10:30:00.000Z",
      "updatedAt": "2026-05-19T10:30:00.000Z"
    },
    "accessT": "jwt_access_token",
    "refreshT": "jwt_refresh_token"
  }
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": ["Invalid email"]
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": ["Invalid password"]
}
```

**Notes:**
- Case-insensitive email matching
- Tokens are set as HTTP-only cookies
- Access and refresh tokens are returned in response body

---

### 3. Refresh Access Token
**Endpoint:** `POST /auth/refreshaccesstoken`

**Description:** Get a new access token using refresh token

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "message": "Access token refreshed successfully",
  "data": {
    "accessT": "new_jwt_access_token",
    "refreshT": "new_jwt_refresh_token"
  }
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": ["Invalid refresh token"]
}
```

**Notes:**
- Refresh token must match the one stored in the database
- New tokens are set as HTTP-only cookies

---

### 4. Logout User
**Endpoint:** `POST /auth/logout`

**Description:** Logout user and clear tokens

**Authentication:** Required (JWT in cookie or header)

**Request Headers:**
```
Authorization: Bearer {accessToken}
OR
Cookie: accessToken={accessToken}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "message": "User logged out successfully",
  "data": {}
}
```

**Error Response (401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "errors": ["User not authenticated"]
}
```

**Notes:**
- Clears refresh token from database
- Clears access and refresh token cookies

---

### 5. Change Password
**Endpoint:** `POST /auth/changepassword`

**Description:** Change user password

**Authentication:** Required (JWT in cookie or header)

**Request Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "oldPassword": "securePassword123",
  "newPassword": "newSecurePassword456"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "message": "Password changed successfully",
  "data": {}
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": ["Invalid old password"]
}
```

**Error Response (401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "errors": ["User not authenticated"]
}
```

**Notes:**
- Old password is verified before updating
- New password is hashed before storage

---

### 6. Set User Avatar
**Endpoint:** `POST /auth/avatar`

**Description:** Upload and set user avatar

**Authentication:** Required (JWT in cookie or header)

**Request Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Request Body:**
- Form data with `avatar` file field (image file)
- Supported formats: JPEG, PNG, GIF, WebP

**Success Response (200):**
```json
{
  "statusCode": 200,
  "message": "Avatar set successfully",
  "data": {
    "avatar": "https://cloudinary.com/..."
  }
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": ["Please provide an image"]
}
```

**Error Response (401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "errors": ["User not authenticated"]
}
```

**Error Response (500):**
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "errors": ["Failed to upload image"]
}
```

**Notes:**
- Image is uploaded to Cloudinary
- Only one avatar file accepted at a time
- Previous avatar is replaced
- Returns Cloudinary URL

---

### 7. Get Current User Details
**Endpoint:** `GET /auth/me`

**Description:** Retrieve current logged-in user details

**Authentication:** Required (JWT in cookie or header)

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "message": "User details fetched successfully",
  "data": {
    "user": {
      "_id": "user_id_here",
      "firstName": "john",
      "lastName": "doe",
      "email": "john@example.com",
      "avatar": "cloudinary_url_here",
      "createdAt": "2026-05-19T10:30:00.000Z",
      "updatedAt": "2026-05-19T10:30:00.000Z"
    }
  }
}
```

**Error Response (401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "errors": ["User not authenticated"]
}
```

**Notes:**
- Password and refresh token are excluded from response
- Returns all user profile information

---

## Chat Endpoints

### 1. Send Message to AI
**Endpoint:** `POST /chat/chatwithai`

**Description:** Send a message and get AI response using Google Gemini

**Authentication:** Required (JWT in cookie or header)

**Request Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "What is artificial intelligence?"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "message": "success",
  "data": {
    "chatmodel": {
      "_id": "chat_id_here",
      "Onwer": "user_id_here",
      "title": "New Chat",
      "Message": [
        {
          "role": "user",
          "text": "What is artificial intelligence?"
        },
        {
          "role": "model",
          "text": "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems..."
        }
      ],
      "createdAt": "2026-05-19T10:30:00.000Z",
      "updatedAt": "2026-05-19T10:30:00.000Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": ["Please provides message"]
}
```

**Error Response (404):**
```json
{
  "statusCode": 404,
  "message": "User not found",
  "errors": ["User not found"]
}
```

**Error Response (500):**
```json
{
  "statusCode": 500,
  "message": "internal error",
  "errors": ["internal error"]
}
```

**Notes:**
- Each message creates a new chat session
- AI responses are powered by Google Gemini API
- Message history is stored in MongoDB
- Messages are associated with the authenticated user

---

### 2. Generate Image with AI
**Endpoint:** `POST /chat/createimage`

**Description:** Generate image from text prompt using Google Gemini

**Authentication:** Required (JWT in cookie or header)

**Request Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "prompt": "A beautiful sunset over mountains"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "message": "success",
  "data": {
    "chat": {
      "_id": "chat_id_here",
      "Onwer": "user_id_here",
      "title": "New Chat",
      "Message": [
        {
          "role": "user",
          "text": "A beautiful sunset over mountains"
        },
        {
          "role": "model",
          "text": "https://gemini-generated-image-url..."
        }
      ],
      "createdAt": "2026-05-19T10:30:00.000Z",
      "updatedAt": "2026-05-19T10:30:00.000Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "errors": ["prompt is required"]
}
```

**Error Response (404):**
```json
{
  "statusCode": 404,
  "message": "User not found",
  "errors": ["User not found"]
}
```

**Error Response (500):**
```json
{
  "statusCode": 500,
  "message": "internal error",
  "errors": ["internal error"]
}
```

**Notes:**
- Image generation powered by Google Gemini API
- Generated image URL is stored in chat history
- Prompt and generated image URL are saved together
- Image is associated with the authenticated user

---

## Authentication

### JWT Token Structure
- **Access Token**: Short-lived token for API requests (default: 1 day)
- **Refresh Token**: Long-lived token for obtaining new access tokens (default: 7 days)

### Using Authentication

**Option 1: Cookie (Recommended)**
```
Cookies are automatically set in login/register responses
```

**Option 2: Authorization Header**
```
Authorization: Bearer {accessToken}
```

### Protected Routes
All routes marked with "Authentication: Required" need a valid JWT token. The token is verified using the `verifyJWT` middleware.

---

## Response Format

### Success Response
```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {
    "key": "value"
  }
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "errors": ["Error detail 1", "Error detail 2"]
}
```

### Status Codes
| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or missing fields |
| 401 | Unauthorized - Authentication required or invalid |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Error Handling

The API uses a consistent error handling pattern:

### Common Error Scenarios

**Missing Required Fields**
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": ["Please provide firstname,lastname, email and password"]
}
```

**Invalid Credentials**
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "errors": ["Invalid email"]
}
```

**Authentication Failed**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "errors": ["User not authenticated"]
}
```

**Server Error**
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "errors": ["Error description"]
}
```

---

## Database Models

### User Model
```javascript
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String (optional, Cloudinary URL),
  refreshToken: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Model
```javascript
{
  _id: ObjectId,
  Onwer: ObjectId (ref: User),
  title: String (default: "New Chat"),
  Message: [
    {
      role: String ("user" | "model"),
      text: String (required)
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Rate Limiting
Currently, there is no rate limiting implemented. Consider adding rate limiting middleware for production deployment.

## CORS Configuration
CORS is enabled with the following configuration:
- **Origin**: Configured via `CORS_ORIGIN` environment variable
- **Credentials**: true (allows cookies)

## Security Considerations
- ✅ Passwords are hashed using bcrypt
- ✅ JWT tokens for authentication
- ✅ HTTP-only cookies for token storage
- ✅ CORS enabled with specific origins
- ⚠️ TODO: Add rate limiting
- ⚠️ TODO: Add input validation sanitization
- ⚠️ TODO: Add request timeout
- ⚠️ TODO: Add API key authentication for AI services

---

## Example Usage

### Register and Login Flow
```bash
# 1. Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "john",
    "lastName": "doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# 2. Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# 3. Use access token for subsequent requests
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer {accessToken}"

# 4. Chat with AI
curl -X POST http://localhost:5000/api/v1/chat/chatwithai \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello AI, how are you?"
  }'

# 5. Generate Image
curl -X POST http://localhost:5000/api/v1/chat/createimage \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A beautiful landscape"
  }'

# 6. Logout
curl -X POST http://localhost:5000/api/v1/auth/logout \
  -H "Authorization: Bearer {accessToken}"
```

---

## Version Information
- **API Version**: v1
- **Last Updated**: May 2026
- **Document Version**: 1.0
