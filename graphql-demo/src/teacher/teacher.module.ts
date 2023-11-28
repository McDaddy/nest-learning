import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { TeacherModel } from './teacher.model';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherModel]),
    forwardRef(() => CourseModule)
  ],
  providers: [TeacherService, TeacherResolver],
  exports: [TeacherService],
})

export class TeacherModule { }
