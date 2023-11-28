import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { TeacherModel } from './teacher.model';
import { TeacherDTO } from './teacher.dto';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherModel)
    private teacherRepository: Repository<TeacherModel>,
    @Inject(forwardRef(() => CourseService))
    private courseService: CourseService,
  ) { }

  async create(teacher: TeacherDTO): Promise<TeacherModel> {
    const course = await this.courseService.findOneByName(teacher.course)
    if (!course) {
      throw new Error(`不存在课程：${teacher.course}`)
    }
    const obj = {
      ...teacher,
      course
    }
    return this.teacherRepository.save(obj);
  }

  findAll(): Promise<TeacherModel[]> {
    return this.teacherRepository.find();
  }

  findById(id: number): Promise<TeacherModel[]> {
    return this.teacherRepository.findBy({ id: Equal(id) })
  }

  async findOne(id: number): Promise<TeacherModel> {
    const res = await this.teacherRepository.findOne({
      where: { id }, relations: {
        course: {
          students: true,
        },
      }
    });
    console.log('res: ', res);
    return res;
  }
}
