# 📱 WPMS Mobile App

Flutter-based mobile application for viewing wellness packages.

## 📁 Project Structure

```text
lib/
├── models/          # Data models and JSON serialization
├── screens/         # UI Screen widgets (Package List)
├── services/        # API communication logic
└── main.dart        # Flutter entry point and theme config
test/
└── unit/            # Unit tests for models and services
```

## ⚙️ Setup Instructions

1. **Install Dependencies**:

   ```bash
   flutter pub get
   ```

2. **Testing**:

   The project includes unit tests for business logic and data integrity.

   - **Run all tests**:

     ```bash
     flutter test
     ```

   - **Run specific unit tests**:

     ```bash
     flutter test test/unit/package_model_test.dart
     flutter test test/unit/api_service_test.dart
     ```

   *How it works*: We use the standard `flutter_test` package along with `mocktail` for mocking. The `ApiService` is designed with **Dependency Injection**, allowing us to inject a `MockClient` to simulate network responses (200 OK, 404 Not Found, etc.) without actually calling the backend.

3. **Run App**:

   ```bash
   # Run in Chrome (Web)
   flutter run -d chrome

   # Run on Windows
   flutter run -d windows
   ```

## 🏗 Architectural Decisions

- **Platform-Agnostic Service**: The `ApiService` automatically detects if it's running on Web or Mobile/Desktop to adjust the Base URL (`localhost` vs `10.0.2.2`).
- **Dependency Injection**: Services accept optional dependencies (like `http.Client`) to make them easily testable.
- **Standard Flutter Routing**: Simple state management using `StatefulWidget` for clear, easy-to-read lifecycle management.
- **Modular Data Modeling**: Separate model files with `fromJson` factories ensuring clean API-to-Dart mapping.

## 💡 Assumptions Made

- **Read-Only**: The mobile app is intended as a client-side viewer and does not include package modification capabilities.
- **Connection**: Assumes the host machine (localhost) is running the NestJS backend during development.
