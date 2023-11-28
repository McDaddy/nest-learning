import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseModel } from './course.model';
import { AddStudentsDTO, CourseDTO } from './course.dto';
import { StudentModel } from 'src/student/student.model';
import { StudentService } from 'src/student/student.service';
// import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseModel)
    private courseRepository: Repository<CourseModel>,
    private studentService: StudentService,
    // private teacherService: TeacherService,
  ) { }

  async create(course: CourseDTO): Promise<CourseModel> {
    return this.courseRepository.save(course);
  }

  findAll(): Promise<CourseModel[]> {
    return this.courseRepository.find();
  }

  async addStudents({ studentIds, id }: AddStudentsDTO): Promise<CourseModel> {
    const students = await this.studentService.findByIds(studentIds);
    return this.courseRepository.save({ id, students });
  }

  async findOne(id: number): Promise<CourseModel> {
    const res = await this.courseRepository.findOne({
      where: { id }, relations: {
        students: true,
        teacher: true
      }
    });
    return res;
  }

  async findOneByName(name: string): Promise<CourseModel> {
    const res = await this.courseRepository.findOne({
      where: { name }
    });
    return res;
  }
}
