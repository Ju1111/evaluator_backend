import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsString, IsString } from 'class-validator';
import Student from '../students/entity'

@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', { nullable: false })
  batchNumber: string

  @IsString()
  @Column('text', { nullable: false })
  startDate: string

  @IsString()
  @Column('text', { nullable: false })
  endDate: string

  @OneToMany(_=> Student, student => student.batch, { eager: true })
  student: Student[]
}
