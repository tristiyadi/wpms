import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PackagesService } from '../modules/packages/packages.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const packagesService = app.get(PackagesService);

  const seedData = [
    {
      name: 'Relax & Unwind Massage',
      description: 'A soothing full-body massage to relieve stress.',
      price: 450000,
      duration_minutes: 60,
    },
    {
      name: 'Deep Tissue Therapy',
      description: 'Focuses on realigning deeper layers of muscles.',
      price: 600000,
      duration_minutes: 90,
    },
    {
      name: 'Aromatherapy Session',
      description:
        'Uses essential oils to promote physical and emotional health.',
      price: 500000,
      duration_minutes: 75,
    },
  ];

  console.log('Seeding data...');
  for (const data of seedData) {
    await packagesService.create(data);
    console.log(`Created package: ${data.name}`);
  }

  console.log('Seeding complete!');
  await app.close();
}

bootstrap().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
