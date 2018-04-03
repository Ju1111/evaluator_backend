import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsDate, IsNumber } from 'class-validator';
import Student from '../students/entity'

@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsNumber()
  @Column('number')
  batchNumber: number

  @IsDate()
  @Column('date', { default: Date() })
  startDate: Date

  @IsDate()
  @Column('date', { default: Date() })
  endDate: Date

  @OneToMany(_=> Student, student => student.batch)
  student: Student[]
}
