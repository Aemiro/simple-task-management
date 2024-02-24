import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { UserEntity } from '@user/persistence/users/user.entity';
import { TaskEntity } from '@project/persistence/tasks/task.entity';
import { ProjectEntity } from '@project/persistence/projects/project.entity';
import { ProjectModule } from '@project/project.module';
dotenv.config({ path: '.env' });
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      url: process.env.DB_URL,
      type: 'postgres',
      // host: process.env.DATABASE_HOST,
      // username: process.env.DATABASE_USERNAME,
      // password: process.env.DATABASE_PASSWORD,
      // database: process.env.DATABASE_NAME,
      // schema: process.env.DATABASE_SCHEMA,
      // port: parseInt(process.env.DATABASE_PORT),
      entities: [UserEntity, ProjectEntity, TaskEntity],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      logging: process.env.NODE_ENV === 'production' ? false : true,
    }),

    UserModule,
    ProjectModule,
  ],
})
export class AppModule {}
