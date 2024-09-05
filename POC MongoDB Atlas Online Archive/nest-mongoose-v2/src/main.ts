import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuration du répertoire des vues
  app.setBaseViewsDir(join(__dirname,'..', 'views'));
  app.setViewEngine('hbs');

  // Enregistrement du helper formatDate
  hbs.registerHelper('formatDate', function(date) {
    // Formatage de la date, par exemple en utilisant toLocaleDateString
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  // Enregistrement du helper 'eq'
  hbs.registerHelper('eq', function(arg1, arg2) {
    return arg1 == arg2;
  });

  await app.listen(3000);
}

bootstrap();
