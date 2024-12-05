import { Material } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
export class CreateJatekokDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEnum(Material)
    material: Material;
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    weight: number;
    childId: number | null;
}
