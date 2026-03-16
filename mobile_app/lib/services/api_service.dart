import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import '../models/package_model.dart';

class ApiService {
  final http.Client _client;

  ApiService({http.Client? client}) : _client = client ?? http.Client();

  // Use 10.0.2.2 for Android emulator, localhost for iOS/Web
  static String get baseUrl {
    if (kIsWeb) return 'http://localhost:3000';
    // For mobile emulators, 10.0.2.2 is usually the host machine
    return 'http://10.0.2.2:3000';
  }

  Future<List<WellnessPackage>> fetchPackages() async {
    try {
      final response = await _client.get(Uri.parse('$baseUrl/mobile/packages'));

      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(response.body);
        return data.map((json) => WellnessPackage.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load packages: ${response.statusCode}');
      }
    } catch (e) {
      // Fallback for desktop/other if 10.0.2.2 fails
      if (!kIsWeb && baseUrl.contains('10.0.2.2')) {
        return _fetchWithLocalhost();
      }
      rethrow;
    }
  }

  Future<List<WellnessPackage>> _fetchWithLocalhost() async {
    final response = await _client.get(
      Uri.parse('http://localhost:3000/mobile/packages'),
    );
    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(response.body);
      return data.map((json) => WellnessPackage.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load packages from localhost');
    }
  }
}
