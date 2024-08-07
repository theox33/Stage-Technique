import { Injectable } from '@nestjs/common';

@Injectable()
export class SumServiceService {
    getSum(nb1: number, nb2: number): number {
        return nb1 + nb2;
    }
}
