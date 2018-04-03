import { JsonController, Post, Body, HttpCode } from 'routing-controllers'
import Teacher from './entity';

@JsonController()
export default class TeacherController {

  @Post('/teachers')
    @HttpCode(201)
    async createTeacher(
      @Body() teacher: Teacher
    ) {
      const {password, ...rest} = teacher
      const entity = Teacher.create(rest)
      await entity.setPassword(password)
      return entity.save()
    }
  //
  // @Get('/teachers/:id([0-9]+)')
  // getTeacher(
  //   @Param('id') id: number
  // ) {
  //   return Teacher.findOneById(id)
  // }
}
