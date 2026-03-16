import 'dart:convert';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mocktail/mocktail.dart';
import 'package:mobile_app/services/api_service.dart';
import 'package:mobile_app/models/package_model.dart';

class MockClient extends Mock implements http.Client {}

void main() {
  late ApiService apiService;
  late MockClient mockClient;

  setUpAll(() {
    registerFallbackValue(Uri());
  });

  setUp(() {
    mockClient = MockClient();
    apiService = ApiService(client: mockClient);
  });

  group('ApiService', () {
    const mockPackagesJson = [
      {
        'id': '1',
        'name': 'Package 1',
        'description': 'Desc 1',
        'price': 100,
        'duration_minutes': 30,
        'created_at': '2023-01-01T00:00:00Z',
        'updated_at': '2023-01-01T00:00:00Z',
      }
    ];

    test('fetchPackages returns a list of WellnessPackage on success (200)', () async {
      when(() => mockClient.get(any()))
          .thenAnswer((_) async => http.Response(json.encode(mockPackagesJson), 200));

      final result = await apiService.fetchPackages();

      expect(result, isA<List<WellnessPackage>>());
      expect(result.length, 1);
      expect(result.first.name, 'Package 1');
    });

    test('fetchPackages throws an exception on error (404)', () async {
      when(() => mockClient.get(any()))
          .thenAnswer((_) async => http.Response('Not Found', 404));

      expect(() => apiService.fetchPackages(), throwsException);
    });

    test('fetchPackages fallback to localhost if 10.0.2.2 fails', () async {
      // Setup: first call fails (simulating network error on 10.0.2.2)
      // second call succeeds (simulating localhost fallback)
      
      var callCount = 0;
      when(() => mockClient.get(any())).thenAnswer((_) async {
        callCount++;
        if (callCount == 1) {
          throw Exception('Connection failed');
        }
        return http.Response(json.encode(mockPackagesJson), 200);
      });

      final result = await apiService.fetchPackages();

      expect(result.length, 1);
      expect(callCount, 2); // Should have called twice (first fail, second fallback)
    });
  });
}
