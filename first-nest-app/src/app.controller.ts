import { Controller, Get, Post, Body, Param, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req, @Res() res) {
    console.log(res.headers);
    // return this.appService.getHello();
    res.status(200).json({
      res: this.appService.getHello()
    })
  }

  /*
  @Get()
  getQueryStrings(
    @Query('name') username,
    @Query('age') age,
    ): string {
    return `${username}, ${age}`;
  }
  */

  @Get('/askquestion')
  askQuestion() {
    return 'What is your name?'
  }

  @Post('/answer')
  answer(@Body() getAnswerDto: AnswerDto,
    @Req() req,
    @Res() res) {
      let response;
      let status;
      if (getAnswerDto.answer === 'yes') {
        response = 'It is yes',
        status = 200
      } else {
        response = 'It is no',
        status = 400
      }
    res.status(status).json({
      res: response
    })
  }

  @Get(':id')
  getRouteParam(@Param('id') userId: string) {
    return `${userId}`
  }
}
