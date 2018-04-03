import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { MinLength, IsString, IsDate } from 'class-validator';
import Teacher from '../teachers/entity'
import Student from '../students/entity'

@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', { nullable: false })
  colour: string

  @IsDate()
  @Column('date', { default: Date() })
  date: Date

  @IsString()
  @MinLength(2)
  @Column('text', { nullable: false })
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text', { nullable: false })
  lastName: string

  @ManyToOne(_ => Teacher, teacher => teacher.evaluation)
  teacher: Teacher

  @ManyToOne(_ => Student, student => student.evaluation)
  student:Student
}
