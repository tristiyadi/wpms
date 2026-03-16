import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('wellness_packages')
export class WellnessPackage {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Full Body Massage' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ example: 'A relaxing 60-minute massage.', required: false })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 50000,
    description: 'Price in smallest unit (e.g., Cents/Rupiah)',
  })
  @Column({ type: 'int' })
  price: number;

  @ApiProperty({ example: 60 })
  @Column({ type: 'int' })
  duration_minutes: number;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
