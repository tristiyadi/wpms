/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackagesService } from './packages.service';
import { WellnessPackage } from './entities/wellness-package.entity';
import { NotFoundException } from '@nestjs/common';

const mockPackage = {
  id: 'uuid-1',
  name: 'Spa Day',
  description: 'Relaxing spa',
  price: 50000,
  duration_minutes: 60,
  created_at: new Date(),
  updated_at: new Date(),
};

describe('PackagesService', () => {
  let service: PackagesService;
  let repo: Repository<WellnessPackage>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackagesService,
        {
          provide: getRepositoryToken(WellnessPackage),
          useValue: {
            find: jest.fn().mockResolvedValue([mockPackage]),
            findOneBy: jest.fn().mockResolvedValue(mockPackage),
            create: jest.fn().mockReturnValue(mockPackage),
            save: jest.fn().mockResolvedValue(mockPackage),
            merge: jest.fn().mockReturnValue(mockPackage),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<PackagesService>(PackagesService);
    repo = module.get<Repository<WellnessPackage>>(
      getRepositoryToken(WellnessPackage),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of packages', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockPackage]);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a package by id', async () => {
      const result = await service.findOne('uuid-1');
      expect(result).toEqual(mockPackage);
    });

    it('should throw NotFoundException if package not found', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      await expect(service.findOne('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new package', async () => {
      const dto = { name: 'New', price: 100, duration_minutes: 30 };
      const result = await service.create(dto as any);
      expect(result).toEqual(mockPackage);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a package', async () => {
      await service.remove('uuid-1');
      expect(repo.delete).toHaveBeenCalledWith('uuid-1');
    });

    it('should throw NotFoundException if nothing affected', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 0, raw: [] });
      await expect(service.remove('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
