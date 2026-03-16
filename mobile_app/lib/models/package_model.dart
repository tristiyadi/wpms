class WellnessPackage {
  final String id;
  final String name;
  final String? description;
  final int price;
  final int durationMinutes;
  final DateTime createdAt;
  final DateTime updatedAt;

  WellnessPackage({
    required this.id,
    required this.name,
    this.description,
    required this.price,
    required this.durationMinutes,
    required this.createdAt,
    required this.updatedAt,
  });

  factory WellnessPackage.fromJson(Map<String, dynamic> json) {
    return WellnessPackage(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      price: json['price'],
      durationMinutes: json['duration_minutes'],
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
    );
  }
}
