import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsString } from 'class-validator';
import Teacher from '../teachers/entity'
import Student from '../students/entity'

@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', { default: 'red' })
  colour: string

  @Column('text', { default: new Date() })
  date: string

  @Column('text', { nullable: true })
  remark: string

  @ManyToOne(_ => Teacher, teacher => teacher.evaluation)
  teacher: Teacher

  @ManyToOne(_ => Student, student => student.evaluation)
  student: Student
}
