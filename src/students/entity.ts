import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { MinLength, IsString } from 'class-validator';
import Evaluation from '../evaluations/entity';
import Batch from '../batches/entity'

@Entity()
export default class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text', { nullable: false })
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text', { nullable: false })
  lastName: string

  @IsString()
  @Column('text', { nullable: false })
  picture: string

  @OneToMany(_ => Evaluation, evaluation => evaluation.student, { eager: true })
  evaluation: Evaluation[]

  @ManyToOne(_=> Batch, batch => batch.student)
  batch: Batch
}
