/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PackagesService } from '../packages.service';
import { WellnessPackage } from '../entities/wellness-package.entity';
import { CreatePackageDto } from '../dto/create-package.dto';
import { UpdatePackageDto } from '../dto/update-package.dto';

@ApiTags('Admin / Packages')
@Controller('admin/packages')
export class AdminPackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all wellness packages (Admin)' })
  @ApiResponse({ status: 200, type: [WellnessPackage] })
  findAll(): Promise<WellnessPackage[]> {
    return this.packagesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new wellness package' })
  @ApiResponse({ status: 201, type: WellnessPackage })
  create(@Body() dto: CreatePackageDto): Promise<WellnessPackage> {
    return this.packagesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing wellness package' })
  @ApiResponse({ status: 200, type: WellnessPackage })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePackageDto,
  ): Promise<WellnessPackage> {
    return this.packagesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a wellness package' })
  @ApiResponse({ status: 204, description: 'Package successfully deleted' })
  remove(@Param('id') id: string): Promise<void> {
    return this.packagesService.remove(id);
  }
}
