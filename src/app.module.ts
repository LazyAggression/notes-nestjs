import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    NotesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        entities: ['./dist/**/entities/*.entity.js'],
        entitiesTs: ['./src/**/entities/*.entity.ts'],
        type: 'postgresql',
        port: 5432,
        // dbName: configService.get<string>('DB_NAME'),
        // host: configService.get<string>('DB_HOST') ?? process.env.DB_HOST,
        // user:
        //   configService.get<string>('DB_USERNAME') ?? process.env.DB_USERNAME,
        // password:
        //   configService.get<string>('DB_PASSWORD') ?? process.env.DB_PASSWORD,
        // name: configService.get<string>('DB_NAME') ?? process.env.DB_NAME,
        clientUrl: configService.get<string>('DB_URL') ?? process.env.DB_URL,
      }),
    }),
  ],
})
export class AppModule {}
