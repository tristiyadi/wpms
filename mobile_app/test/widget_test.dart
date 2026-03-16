import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_app/main.dart';

void main() {
  testWidgets('App smoke test - renders correctly', (
    WidgetTester tester,
  ) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const WpmsApp());

    // Verify that the App Bar title is present.
    expect(find.text('Wellness Packages'), findsOneWidget);

    // Verify that it starts with a loading indicator or data (depending on speed)
    // In a widget test, FutureBuilder will usually show the loading state initially
    expect(find.byType(CircularProgressIndicator), findsOneWidget);
  });
}
