import { Material } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateJatekokDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEnum(Material)
    material: Material;
    @IsNumber()
    weight: number;
    childId: number | null;
}
