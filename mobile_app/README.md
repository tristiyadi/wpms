# 📱 WPMS Mobile App

Flutter-based mobile application for viewing wellness packages.

## 📁 Project Structure

```text
lib/
├── models/          # Data models and JSON serialization
├── screens/         # UI Screen widgets (Package List)
├── services/        # API communication logic
└── main.dart        # Flutter entry point and theme config
```

## ⚙️ Setup Instructions

1. **Install Dependencies**:

   ```bash
   flutter pub get
   ```

2. **Run App**:

   ```bash
   # Run in Chrome (Web)
   flutter run -d chrome

   # Run on Windows
   flutter run -d windows
   ```

## 🏗 Architectural Decisions

- **Platform-Agnostic Service**: The `ApiService` automatically detects if it's running on Web or Mobile/Desktop to adjust the Base URL (`localhost` vs `10.0.2.2`).
- **Standard Flutter Routing**: Simple state management using `StatefulWidget` for clear, easy-to-read lifecycle management.
- **Modular Data Modeling**: Separate model files with `fromJson` factories ensuring clean API-to-Dart mapping.

## 💡 Assumptions Made

- **Read-Only**: The mobile app is intended as a client-side viewer and does not include package modification capabilities.
- **Connection**: Assumes the host machine (localhost) is running the NestJS backend during development.
