import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsString, IsInt } from 'class-validator';
import Student from '../students/entity'

@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsInt()
  @Column('int', { nullable: false })
  batchNumber: number

  @IsString()
  @Column('text', { nullable: false })
  startDate: string

  @IsString()
  @Column('text', { nullable: false })
  endDate: string

  @OneToMany(_=> Student, student => student.batch)
  student: Student[]
}
