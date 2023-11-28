import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'graphql_demo',
      entities: ['dist/**/*.model.js'],
      synchronize: true,
      logging: true,
    }),
    StudentModule,
    CourseModule,
    TeacherModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({ autoSchemaFile: 'schema.gql', driver: ApolloDriver }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
