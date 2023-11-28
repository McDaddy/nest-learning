import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { StudentModel } from './student.model';
import { StudentDTO } from './student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentModel)
    private studentRepository: Repository<StudentModel>,
  ) { }

  async create(student: StudentDTO): Promise<StudentModel> {
    return this.studentRepository.save(student);
  }

  findAll(): Promise<StudentModel[]> {
    return this.studentRepository.find();
  }

  findByIds(ids: number[]): Promise<StudentModel[]> {
    return this.studentRepository.findBy({ id: In(ids) })
  }

  findOne(id: number): Promise<StudentModel> {
    return this.studentRepository.findOne({
      where: { id }, relations: {
        courses: true
      }
    });
  }
}
