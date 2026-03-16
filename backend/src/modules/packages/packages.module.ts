import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WellnessPackage } from './entities/wellness-package.entity';
import { PackagesService } from './packages.service';
import { AdminPackagesController } from './controllers/admin-packages.controller';
import { MobilePackagesController } from './controllers/mobile-packages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WellnessPackage])],
  controllers: [AdminPackagesController, MobilePackagesController],
  providers: [PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
