import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { StudentModel } from 'src/student/student.model';
import { TeacherModel } from 'src/teacher/teacher.model';

@ObjectType()
@Entity()
export class CourseModel {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Field((type) => [StudentModel], { nullable: true })
    @ManyToMany((type) => StudentModel, (student) => student.courses)
    @JoinTable()
    students: StudentModel[];

    @Field((type) => [TeacherModel], { nullable: true })
    @OneToMany((type) => TeacherModel, (teacher) => teacher.course)
    teacher: TeacherModel[];

    @Field()
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}