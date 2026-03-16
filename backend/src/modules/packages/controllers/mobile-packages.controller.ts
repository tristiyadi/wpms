/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PackagesService } from '../packages.service';
import { WellnessPackage } from '../entities/wellness-package.entity';

@ApiTags('Mobile / Packages')
@Controller('mobile/packages')
export class MobilePackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all wellness packages (Mobile)' })
  @ApiResponse({ status: 200, type: [WellnessPackage] })
  findAll(): Promise<WellnessPackage[]> {
    return this.packagesService.findAll();
  }
}
