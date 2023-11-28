import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { CourseModel } from 'src/course/course.model';

@ObjectType()
@Entity()
export class TeacherModel {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Field((type) => CourseModel!)
    @ManyToOne((type) => CourseModel)
    @JoinColumn()
    course: CourseModel;

    @Field()
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}