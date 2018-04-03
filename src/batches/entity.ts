import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsDate, IsInt } from 'class-validator';
import Student from '../students/entity'

@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsInt()
  batchNumber: number

  @IsDate()
  @Column('date', { nullable: false })
  startDate: Date

  @IsDate()
  @Column('date', { nullable: false })
  endDate: Date

  @OneToMany(_=> Student, student => student.batch)
  student: Student[]
}
