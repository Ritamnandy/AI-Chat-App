# 📱 AI-Chat-App Frontend (Flutter)

The Flutter-based mobile frontend for the AI-Chat-App, providing a beautiful and responsive interface for Android and iOS platforms.

## 🎯 Project Overview

This is the client-side application for the AI-Chat-App built with Flutter. It provides a seamless mobile experience for interacting with the Gemini AI chatbot, managing user profiles, and maintaining chat history.

### Features (In Development)
- 🔐 User authentication (registration, login, logout)
- 💬 Real-time chat with AI
- 🖼️ AI image generation
- 👤 User profile management
- 📱 Cross-platform (Android & iOS)
- 🎨 Material Design UI
- 🔄 State management
- 📡 API integration with backend
- 🔌 JWT token handling

---

## 🛠️ Tech Stack

- **Framework**: Flutter 3.11.5+
- **Language**: Dart 3.11.5+
- **Architecture**: MVC/MVVM pattern
- **State Management**: Provider / GetX (Configurable)
- **HTTP Client**: http or dio package
- **Local Storage**: shared_preferences / hive
- **UI Framework**: Material Design (Cupertino for iOS)

---

## 📦 Dependencies

See `pubspec.yaml` for the complete list of dependencies.

### Key Packages
- `flutter` - UI framework
- `cupertino_icons` - iOS icons
- Additional packages to be added for:
  - HTTP requests
  - State management
  - Local storage
  - Image caching

---

## 🚀 Getting Started

### Prerequisites
- Flutter SDK 3.11.5+ ([Download](https://flutter.dev/docs/get-started/install))
- Android Studio or Xcode
- A compatible device or emulator

### Installation

1. **Clone repository** (if not already done)
   ```bash
   cd client
   ```

2. **Get dependencies**
   ```bash
   flutter pub get
   ```

3. **Run the app**
   ```bash
   # On default device
   flutter run

   # On specific device
   flutter devices  # List available devices
   flutter run -d <device-id>
   ```

### Run Configurations

**Android**
```bash
flutter run -d android
# Or
flutter run -d emulator-5554
```

**iOS**
```bash
flutter run -d ios
# Or
flutter run -d iPhone\ Simulator
```

**Web** (if enabled)
```bash
flutter run -d web
```

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
