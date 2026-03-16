import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePackageSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price: z.number().int().min(0),
  duration_minutes: z.number().int().min(1),
});

export class CreatePackageDto extends createZodDto(CreatePackageSchema) {}
