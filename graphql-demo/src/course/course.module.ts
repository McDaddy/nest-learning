import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { CourseModel } from './course.model';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseModel]),
    forwardRef(() => StudentModule),
    forwardRef(() => TeacherModule),
  ],
  providers: [CourseService, CourseResolver],
  exports: [CourseService],
})

export class CourseModule {}
