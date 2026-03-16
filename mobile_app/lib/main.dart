import 'package:flutter/material.dart';
import 'screens/package_list_screen.dart';

void main() {
  runApp(const WpmsApp());
}

class WpmsApp extends StatelessWidget {
  const WpmsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WPMS Mobile',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF10B981),
          primary: const Color(0xFF10B981),
          brightness: Brightness.light,
        ),
        useMaterial3: true,
        fontFamily: 'Roboto',
      ),
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF10B981),
          primary: const Color(0xFF10B981),
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
        fontFamily: 'Roboto',
      ),
      themeMode: ThemeMode.system, // Follows system theme (Dark/Light)
      home: const PackageListScreen(),
    );
  }
}
