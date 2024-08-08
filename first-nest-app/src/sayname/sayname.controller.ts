import { Body, Controller, Post } from '@nestjs/common';
import { SaynameDto } from 'src/dto/sayname.dto';
import { SaynameService } from './sayname.service';

@Controller('sayname')
export class SaynameController {

    constructor(
        private readonly saynameService: SaynameService
    ){}

    @Post()
    sayMyName(@Body() name: SaynameDto) {
        return this.saynameService.sayMyName(name.name);
    }
}
