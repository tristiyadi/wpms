import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_app/models/package_model.dart';

void main() {
  group('WellnessPackage Model', () {
    test('should create WellnessPackage from valid JSON', () {
      final json = {
        'id': '123',
        'name': 'Spa Relaxation',
        'description': 'A very relaxing spa session.',
        'price': 50000,
        'duration_minutes': 60,
        'created_at': '2023-10-01T12:00:00Z',
        'updated_at': '2023-10-02T14:00:00Z',
      };

      final package = WellnessPackage.fromJson(json);

      expect(package.id, '123');
      expect(package.name, 'Spa Relaxation');
      expect(package.description, 'A very relaxing spa session.');
      expect(package.price, 50000);
      expect(package.durationMinutes, 60);
      expect(package.createdAt, DateTime.parse('2023-10-01T12:00:00Z'));
      expect(package.updatedAt, DateTime.parse('2023-10-02T14:00:00Z'));
    });

    test('should handle nullable description', () {
      final json = {
        'id': '124',
        'name': 'Basic Massage',
        'description': null,
        'price': 30000,
        'duration_minutes': 30,
        'created_at': '2023-10-05T09:00:00Z',
        'updated_at': '2023-10-05T09:00:00Z',
      };

      final package = WellnessPackage.fromJson(json);

      expect(package.description, isNull);
    });
  });
}
