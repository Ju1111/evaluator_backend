import { JsonController, Param, NotFoundError, Get, Body, HttpCode, Post, Authorized, Put, Delete } from 'routing-controllers'
import Student from './entity'

@JsonController()
export default class StudentController {

  @Get('/students')
  @HttpCode(200)
  async getStudents(
  ) {
    return Student.find()
  }

  @Get('/students/:id([0-9]+)')
  @HttpCode(200)
  async getStudent(
    @Param('id') studentId: number
  ) {
    const student = await Student.findOneById(studentId)
    if (!student) throw new NotFoundError('Student does not exist!')
    return student
  }

  @Post('/students')
  @HttpCode(201)
  async createStudent(
    @Body() student: Student
  ) {
    return student.save();
  }

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
