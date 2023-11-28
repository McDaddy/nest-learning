import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CourseModel } from './course.model';
import { CourseService } from './course.service';
import { AddStudentsDTO } from './course.dto';
import { StudentService } from 'src/student/student.service';

@Resolver((of) => CourseModel)
export class CourseResolver {
  constructor(
    @Inject(CourseService) private courseService: CourseService,
    @Inject(StudentService) private studentService: StudentService,
  ) { }
  @Query((returns) => CourseModel)
  async course(@Args('id') id: number): Promise<CourseModel> {
    return await this.courseService.findOne(id);
  }

  @Query((returns) => [CourseModel])
  async courses(): Promise<CourseModel[]> {
    return await this.courseService.findAll();
  }

  @Mutation(returns => CourseModel)
  async createCourse(
    @Args('name') name: string,
  ): Promise<CourseModel> {
    return await this.courseService.create({ name })
  }

  @Mutation(returns => CourseModel)
  async addStudents(
    @Args('courseWithStudents') courseWithStudents: AddStudentsDTO,
  ): Promise<CourseModel> {
    return await this.courseService.addStudents(courseWithStudents)
  }
}
