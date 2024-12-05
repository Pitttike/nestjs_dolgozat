import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreateGyerekekDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    address: string;
    @IsBoolean()
    isGood: boolean;
}
