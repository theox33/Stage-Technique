import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { FileModule } from './file/file.module';
import { File } from './file/entities/file.entity';
import { JwtAuthMiddleware } from './file/middleware/jwt-auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const authServerUrl = configService.get('KEYCLOAK_URL');
        const realm = configService.get('KEYCLOAK_REALM');
        const clientId = configService.get('KEYCLOAK_CLIENT_ID');
        const secret = configService.get('KEYCLOAK_SECRET');
        const publicKey = configService.get('PUBLIC_KEY');

        // Ajoute des logs ici
        console.log('Keycloak Configuration:');
        console.log('  Auth Server URL:', authServerUrl);
        console.log('  Realm:', realm);
        console.log('  Client ID:', clientId);
        console.log('  Public Key:', publicKey);

        return {
          authServerUrl,
          realm,
          clientId,
          secret,
          publicKey,
        };
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('DB_HOST');
        const port = configService.get<number>('DB_PORT');
        const username = configService.get('DB_USERNAME');
        const password = configService.get('DB_PASSWORD');
        const database = configService.get('DB_NAME');

        // Ajoute des logs ici
        console.log('PostgreSQL Configuration:');
        console.log('  Host:', host);
        console.log('  Port:', port);
        console.log('  Username:', username);
        console.log('  Database:', database);

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [File],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE') || true,
        };
      },
    }),

    FileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('*');
  }
}
