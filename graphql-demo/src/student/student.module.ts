import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { StudentModel } from './student.model';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentModel]),
  ],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})

export class StudentModule {}
