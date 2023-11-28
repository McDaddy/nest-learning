import {
  Resolver,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { TeacherModel } from './teacher.model';
import { TeacherService } from './teacher.service';

@Resolver((of) => TeacherModel)
export class TeacherResolver {
  constructor(
    @Inject(TeacherService) private teacherService: TeacherService,
  ) { }
  @Query((returns) => TeacherModel)
  async teacher(@Args('id') id: number): Promise<TeacherModel> {
    return await this.teacherService.findOne(id);
  }

  @Query((returns) => [TeacherModel])
  async teachers(): Promise<TeacherModel[]> {
    return await this.teacherService.findAll();
  }

  @Mutation(returns => TeacherModel)
  async createTeacher(
    @Args('name') name: string,
    @Args('course') course: string,
  ): Promise<TeacherModel> {
    return await this.teacherService.create({ name, course })
  }
}
