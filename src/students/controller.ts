import { JsonController, Param, NotFoundError, Get, Body, HttpCode, Post, Authorized, Put, Delete } from 'routing-controllers'
import Student from './entity'
import Batch from '../batches/entity'

@JsonController()
export default class StudentController {

  @Authorized()
  @Get('/students')
  @HttpCode(200)
  async getStudents(
  ) {
    return Student.find()
  }

  @Authorized()
  @Get('/batches/:id([0-9]+)/students/:id([0-9]+)')
  @HttpCode(200)
  async getStudent(
    @Param('id') studentId: number
  ) {
    const student = await Student.findOneById(studentId)
    if (!student) throw new NotFoundError('Student does not exist!')
    return student
  }

  @Authorized()
  @Post('/batches/:id([0-9]+)/students')
  @HttpCode(201)
  async createStudent(
    @Param('id') batchId: number,
    @Body() student: Student
  ) {
    const batch = await Batch.findOneById(batchId)
    if (!batch) throw new NotFoundError('Batch does not exist!')

    const s = await Student.create({
      ...student,
      batch
    })

    return s.save()
  }

  @Authorized()
  @Put('/students/:id')
  @HttpCode(201)
  async updateStudent(
    @Param('id') studentId:number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOneById(studentId)
    if (!student) throw new NotFoundError('Student does not exist!')

    return Student.merge(student, update)
  }

  @Authorized()
  @Delete('/students/:id')
  @HttpCode(201)
  async deleteStudent(
    @Param('id') studentId: number
  ) {
    const student = await Student.findOneById(studentId)
    if (!student) throw new NotFoundError('Student does not exist!')
    await student.remove()

    return {
      message: 'You sucessfully removed the student.'
    }
  }
}
