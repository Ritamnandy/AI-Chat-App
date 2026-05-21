# 📱 AI-Chat-App Frontend (Flutter)

The Flutter-based mobile frontend for the AI-Chat-App, providing a beautiful and responsive interface for Android and iOS platforms.

## 🎯 Project Overview

This is the client-side application for the AI-Chat-App built with Flutter. It provides a seamless mobile experience for interacting with the Gemini AI chatbot, managing user profiles, and maintaining chat history.

### ✨ Features (In Development)
- 🔐 **User Authentication** - Registration, login, and logout with JWT tokens
- 💬 **Real-time Chat** - Stream-based conversations with Gemini AI with high-level thinking
- 🖼️ **AI Image Generation** - Create images from text prompts using AI
- 👤 **User Profile Management** - Avatar upload, password change, profile editing
- 📱 **Cross-Platform** - Native support for Android & iOS
- 🎨 **Material Design UI** - Beautiful, responsive user interface
- 🔄 **State Management** - Efficient state handling for app data
- 📡 **API Integration** - Seamless communication with Node.js backend
- 🔌 **JWT Token Handling** - Secure authentication with access & refresh tokens
- 💾 **Chat History** - Persistent storage of conversations

---

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Flutter | 3.11.5+ |
| **Language** | Dart | 3.11.5+ |
| **Architecture** | MVVM/Provider | - |
| **State Management** | Provider/GetX | Latest |
| **HTTP Client** | http / Dio | - |
| **Storage** | shared_preferences / hive | - |
| **UI** | Material Design | - |
| **Theming** | Custom + Google Fonts | - |
| **Responsive Design** | flutter_screenutil | 5.9.3+ |

---

## 📦 Current Dependencies

```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  flutter_screenutil: ^5.9.3      # Responsive design
  google_fonts: ^8.1.0              # Beautiful typography

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^6.0.0
```

### Recommended Additional Packages
- `http: ^1.1.0` - HTTP client
- `provider: ^6.0.0` - State management
- `dio: ^5.0.0` - Advanced HTTP client
- `shared_preferences: ^2.0.0` - Local storage
- `hive: ^2.0.0` - Local database
- `cached_network_image: ^3.0.0` - Image caching
- `intl: ^0.19.0` - Internationalization

---

## 🚀 Getting Started

### Prerequisites
- **Flutter SDK** 3.11.5+ ([Installation Guide](https://flutter.dev/docs/get-started/install))
- **Dart SDK** 3.11.5+ (included with Flutter)
- **Android Studio** or **Xcode** (for platform-specific tools)
- **Android Emulator** or **iOS Simulator** / physical device
- **Backend server** running at `http://localhost:5000`

### Installation & Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Get Flutter dependencies**
   ```bash
   flutter pub get
   ```

3. **Configure backend API URL**
   - Open `lib/utils/api_config.dart` (or similar file)
   - Update base URL: `http://localhost:5000/api/v1`
   - For production, use your deployed backend URL

4. **Run the application**
   ```bash
   flutter run
   ```

### Platform-Specific Setup

#### Android Setup
```bash
# Install Android dependencies
flutter pub get

# Run on Android
flutter run -d android

# Or specify emulator
flutter devices  # List all devices
flutter run -d emulator-5554

# For release build
flutter build apk --release
```

#### iOS Setup
```bash
# Install iOS dependencies
flutter pub get

# Run on iOS
flutter run -d ios

# Or specify simulator
flutter run -d iPhone\ Simulator

# For release build
flutter build ios --release
```

#### Web Setup (optional)
```bash
# Enable web platform
flutter config --enable-web

# Run on web
flutter run -d web
```

---

## 📂 Project Structure

```
client/
├── lib/
│   ├── main.dart                  # App entry point
│   ├── screens/
│   │   ├── login_screen.dart       # Login/Register UI
│   │   ├── home_screen.dart        # Chat interface
│   │   └── profile_screen.dart     # User profile
│   ├── models/
│   │   ├── user_model.dart         # User data structure
│   │   ├── chat_model.dart         # Chat message structure
│   │   └── ...
│   ├── services/
│   │   ├── api_service.dart        # API client
│   │   ├── auth_service.dart       # Authentication logic
│   │   ├── chat_service.dart       # Chat operations
│   │   └── storage_service.dart    # Local storage
│   ├── providers/
│   │   ├── auth_provider.dart      # Auth state management
│   │   ├── chat_provider.dart      # Chat state management
│   │   └── user_provider.dart      # User state management
│   ├── widgets/
│   │   ├── message_bubble.dart     # Chat message UI
│   │   ├── custom_text_field.dart  # Reusable input
│   │   └── ...
│   ├── utils/
│   │   ├── constants.dart          # App constants
│   │   ├── api_config.dart         # API configuration
│   │   ├── validators.dart         # Form validators
│   │   └── helpers.dart            # Helper functions
│   └── theme/
│       ├── apptheme.dart           # Light/Dark themes
│       ├── colors.dart             # Color palette
│       └── text_styles.dart        # Text styling
├── assets/                         # Images, icons, fonts
├── android/                        # Android native code
├── ios/                            # iOS native code
├── pubspec.yaml                    # Dependencies
├── analysis_options.yaml           # Lint rules
└── README.md                       # This file
```

---

## 🔑 Key Screens & Features

### 1. Authentication Flow
```
Splash Screen → Login/Register Screen
                ├─ Registration: Create new account
                └─ Login: Existing user authentication
                     ↓
                Home Screen (On success)
```

### 2. Chat Screen
- Display conversation history
- Input field for user messages
- Real-time message display with AI responses
- Scroll to latest message
- Message timestamp display

### 3. Image Generation
- Text prompt input
- AI-generated image display
- Save/share generated images
- View generation history

### 4. Profile Screen
- Display user information
- Avatar upload/change
- Password change
- Logout functionality

---

## 🔌 API Integration

### Base Configuration
```dart
class ApiConfig {
  static const String baseUrl = 'http://localhost:5000/api/v1';
  static const Duration timeout = Duration(seconds: 30);
  
  // Headers
  static const Map<String, String> headers = {
    'Content-Type': 'application/json',
  };
}
```

### Authentication Endpoints Used
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refreshaccesstoken` - Refresh access token
- `GET /auth/me` - Get current user
- `POST /auth/changepassword` - Change password
- `POST /auth/avatar` - Upload avatar

### Chat Endpoints Used
- `POST /chat/chatwithai` - Send message to AI
- `POST /chat/createimage` - Generate image with AI

---

## 📊 State Management (Provider Pattern)

### Auth Provider
```dart
class AuthProvider extends ChangeNotifier {
  User? _user;
  String? _accessToken;
  
  Future<void> register(String firstName, String lastName, 
                        String email, String password) async { ... }
  Future<void> login(String email, String password) async { ... }
  Future<void> logout() async { ... }
  Future<void> refreshToken() async { ... }
}
```

### Chat Provider
```dart
class ChatProvider extends ChangeNotifier {
  List<Message> _messages = [];
  
  Future<void> sendMessage(String message) async { ... }
  Future<void> generateImage(String prompt) async { ... }
  void clearChat() { ... }
}
```

### User Provider
```dart
class UserProvider extends ChangeNotifier {
  User? _currentUser;
  
  Future<void> fetchUserProfile() async { ... }
  Future<void> uploadAvatar(File imageFile) async { ... }
  Future<void> changePassword(String oldPassword, String newPassword) async { ... }
}
```

---

## 🔐 Authentication & Token Management

### Token Storage
- **Access Token**: Stored in memory / app state
- **Refresh Token**: Stored securely using Platform Channels (Keychain/Keystore)

### Token Refresh Flow
```
1. Access token expires
2. Check refresh token availability
3. Call refresh endpoint with refresh token
4. Get new access token
5. Retry original request
6. If refresh fails, redirect to login
```

### Secure Token Storage Implementation
```dart
class SecureStorage {
  static const platform = MethodChannel('com.example.aichatapp/secure');
  
  static Future<void> saveToken(String token) async {
    await platform.invokeMethod('saveToken', {'token': token});
  }
  
  static Future<String?> getToken() async {
    return await platform.invokeMethod('getToken');
  }
}
```

---

## 🎨 Theming & Styling

### Light Theme
- Primary Color: Blue shade
- Background: White
- Text: Dark gray/black

### Dark Theme
- Primary Color: Blue shade (adjusted)
- Background: Dark gray/black
- Text: White/light gray

### Responsive Design with ScreenUtil
```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100.w,        // 100% of screen width
      padding: EdgeInsets.all(16.w), // Responsive padding
      child: Text(
        'Hello',
        style: TextStyle(fontSize: 16.sp), // Responsive font size
      ),
    );
  }
}
```

---

## 🧪 Testing

### Running Tests
```bash
flutter test

# Specific test file
flutter test test/services/auth_service_test.dart

# Coverage report
flutter test --coverage
```

### Test Structure
```
test/
├── services/
│   ├── api_service_test.dart
│   ├── auth_service_test.dart
│   └── chat_service_test.dart
├── providers/
│   ├── auth_provider_test.dart
│   └── chat_provider_test.dart
└── widgets/
    └── message_bubble_test.dart
```

---

## 🚀 Building for Production

### Android Release Build
```bash
# Build APK
flutter build apk --release

# Build App Bundle (for Google Play)
flutter build appbundle --release

# Output location
build/app/outputs/apk/release/app-release.apk
build/app/outputs/bundle/release/app-release.aab
```

### iOS Release Build
```bash
# Build IPA
flutter build ios --release

# Output location
build/ios/iphoneos/Runner.app
```

### Obfuscation & Security
```bash
# Enable obfuscation
flutter build apk --release --obfuscate --split-debug-info=<output-directory>
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Flutter Not Found
```bash
# Add Flutter to PATH
export PATH="$PATH:~/flutter/bin"

# Verify installation
flutter doctor
```

#### Dependency Conflicts
```bash
# Clean and reinstall
flutter clean
flutter pub get
flutter pub upgrade
```

#### Build Failures
```bash
# Clear build artifacts
flutter clean

# Run with verbose output
flutter run -v

# Check for issues
flutter doctor -v
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
rm -rf Pods
rm Pod.lock
pod install
cd ..
flutter run -d ios
```

#### API Connection Issues
- Verify backend server is running on correct port
- Check CORS configuration on backend
- Ensure API base URL is correct
- Check device network connectivity
- Try connecting to backend from browser/Postman

---

## 📖 Best Practices

### Code Organization
- Keep screens focused on UI
- Extract reusable widgets
- Use providers for state management
- Keep services for business logic

### Performance Optimization
- Use `const` constructors where possible
- Implement lazy loading for lists
- Cache API responses appropriately
- Use `CustomPaint` for complex UI

### Security
- Never hardcode API keys or secrets
- Use secure storage for sensitive data
- Validate all user inputs
- Implement certificate pinning for HTTPS

### Error Handling
- Implement try-catch in async operations
- Show user-friendly error messages
- Log errors for debugging
- Implement retry logic where appropriate

---

## 📚 Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Language Guide](https://dart.dev/guides)
- [Provider Package](https://pub.dev/packages/provider)
- [HTTP Package](https://pub.dev/packages/http)
- [Material Design](https://material.io/design)

---

## 🤝 Contributing

Contributions are welcome! Please follow the established code style and structure.

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](../LICENSE) file for details.

---

## 📁 Project Structure

```
client/
├── lib/
│   ├── main.dart                 # App entry point
│   ├── screens/                  # UI screens (to be created)
│   │   ├── auth/
│   │   ├── chat/
│   │   └── profile/
│   ├── widgets/                  # Reusable widgets (to be created)
│   ├── models/                   # Data models (to be created)
│   ├── providers/                # State management (to be created)
│   ├── services/                 # API services (to be created)
│   ├── utils/                    # Utilities & constants (to be created)
│   └── themes/                   # App themes (to be created)
├── test/
│   └── widget_test.dart         # Example widget tests
├── android/                      # Android-specific files
├── ios/                          # iOS-specific files
├── pubspec.yaml                 # Project dependencies
└── analysis_options.yaml        # Dart lint rules
```

---

## 🔧 Development Commands

### Format Code
```bash
flutter format lib/
```

### Analyze Code
```bash
flutter analyze
```

### Run Tests
```bash
flutter test
```

### Build Release
```bash
# APK (Android)
flutter build apk --release

# App Bundle (Android)
flutter build appbundle --release

# IPA (iOS)
flutter build ios --release
```

### Clean Build
```bash
flutter clean
flutter pub get
flutter run
```

---

## 📡 API Integration

The app communicates with the backend at:
- **Dev**: `http://localhost:5000`
- **Production**: To be configured

### Authentication
- Tokens stored in secure local storage
- JWT handling for API requests
- Auto token refresh on expiry
- Logout clears all tokens

---

## 🔐 Security Considerations

- Store sensitive tokens in secure storage (not SharedPreferences)
- Implement certificate pinning for production
- Validate SSL certificates
- Never hardcode API keys or secrets
- Use environment variables for configuration

---

## 🐛 Debugging

### Enable Debug Logs
```bash
flutter run --verbose
```

### Hot Reload
- Press `r` during `flutter run` to hot reload
- Press `R` to hot restart

### DevTools
```bash
flutter pub global activate devtools
flutter pub global run devtools
```

---

## 📚 Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Flutter Cookbook](https://flutter.dev/docs/cookbook)
- [Material Design](https://material.io/design)
- [Cupertino (iOS) Design](https://flutter.dev/docs/development/ui/widgets/cupertino)

---

## 📝 Current Status

- [ ] UI/UX design
- [ ] Authentication screens
- [ ] Chat interface
- [ ] Profile management
- [ ] Image generation UI
- [ ] State management setup
- [ ] API client implementation
- [ ] Error handling & validation
- [ ] Unit tests
- [ ] Widget tests
- [ ] Integration tests

---

## 🤝 Contributing

Contributions are welcome! Please see the main [AI-Chat-App README](../README.md) for contribution guidelines.

---

**Last Updated**: May 19, 2026  
**Version**: 1.0.0 (Development)
