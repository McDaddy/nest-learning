import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { CourseModel } from 'src/course/course.model';

export enum SEX {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

@ObjectType()
@Entity()
export class StudentModel {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Field()
    @Column({ type: 'enum', nullable: false, enum: SEX, default: SEX.MALE })
    sex: SEX;

    @Field()
    @Column({ type: 'integer', nullable: false })
    age: number;

    @Field((type) => [CourseModel])
    @ManyToMany(() => CourseModel, (course) => course.students)
    courses: CourseModel[];

    @Field()
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}