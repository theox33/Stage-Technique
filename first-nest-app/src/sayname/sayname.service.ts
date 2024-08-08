import { Injectable } from '@nestjs/common';

@Injectable()
export class SaynameService {
    sayMyName(name) {
        return `Your name is ${name}`;
    }
}
