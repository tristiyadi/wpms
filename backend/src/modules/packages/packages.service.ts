/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WellnessPackage } from './entities/wellness-package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(WellnessPackage)
    private readonly packageRepo: Repository<WellnessPackage>,
  ) {}

  async findAll(): Promise<WellnessPackage[]> {
    return this.packageRepo.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: string): Promise<WellnessPackage> {
    const pkg = await this.packageRepo.findOneBy({ id });
    if (!pkg) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return pkg;
  }

  async create(dto: CreatePackageDto): Promise<WellnessPackage> {
    const newPkg = this.packageRepo.create(dto);
    return this.packageRepo.save(newPkg);
  }

  async update(id: string, dto: UpdatePackageDto): Promise<WellnessPackage> {
    const pkg = await this.findOne(id);
    const updated = this.packageRepo.merge(pkg, dto);
    return this.packageRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.packageRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
  }
}
