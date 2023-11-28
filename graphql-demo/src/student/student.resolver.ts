import {
  Resolver,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { SEX, StudentModel } from './student.model';
import { StudentService } from './student.service';

@Resolver((of) => StudentModel)
export class StudentResolver {
  constructor(
    @Inject(StudentService) private studentService: StudentService,
  ) { }
  @Query((returns) => StudentModel)
  async student(@Args('id') id: number): Promise<StudentModel> {
    return await this.studentService.findOne(id);
  }

  @Query((returns) => [StudentModel])
  async students(): Promise<StudentModel[]> {
    return await this.studentService.findAll();
  }

  @Mutation(returns => StudentModel)
  async createStudent(
    @Args('name') name: string,
    @Args('sex') sex: SEX,
    @Args('age') age: number,
  ): Promise<StudentModel> {
    return await this.studentService.create({ name, sex, age })
  }
}
