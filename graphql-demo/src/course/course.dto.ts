import { Field, InputType } from "@nestjs/graphql";

export interface CourseDTO {
  name: string;
}

@InputType()
export class AddStudentsDTO {
  @Field()
  id: number;
  @Field((type) => [Number])
  studentIds: number[];
}