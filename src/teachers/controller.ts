import { JsonController, Post, Param, Get, Body, HttpCode } from 'routing-controllers'
import Teacher from './entity';

@JsonController()
export default class UserController {

  @Post('/teachers')
    @HttpCode(201)
    async createTeacher(
      @Body() teacher: Teacher
    ) {
      const {password, ...rest} = teacher
      const entity = Teacher.create(rest)
      await entity.setPassword(password)
      await entity.save()
    }

  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return Teacher.findOneById(id)
  }

  @Get('/users')
  allUsers() {
    return Teacher.find()
  }
}
