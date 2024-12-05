import { Toy } from 'src/jatekok/entities/jatekok.entity';

export class Gyerekek {
    id: number;
    name: string;
    address: string;
    isGood: boolean;
    toys: Toy[];
}
