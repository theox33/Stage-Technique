import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SumServiceService } from './sum-service/sum-service.service';
import { SaynameModule } from './sayname/sayname.module';

@Module({
  imports: [SaynameModule],
  controllers: [AppController],
  providers: [AppService, SumServiceService],
})
export class AppModule {}
