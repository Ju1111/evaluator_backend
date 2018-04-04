import { JsonController, Param, NotFoundError, Get, Body, HttpCode, Post, Authorized, Put, BadRequestError } from 'routing-controllers'
import Evaluation from './entity'
import Student from '../students/entity'

@JsonController()
export default class EvaluationController {

  //get all evaluations for a certain student
  @Authorized()
  @Get('/students/:id([0-9]+)/evaluations')
  @HttpCode(200)
  async getEvaluations(
    @Param('id') studentId: number
  ) {
    const student = await Student.findOneById(studentId)
    if(!student) throw new BadRequestError(`Student not found`)

    const evaluation = await Evaluation.find()
    return { evaluation }
  }

  @Authorized()
  @Get('/evaluations/:id([0-9]+)')
  @HttpCode(200)
  async getEvaluation(
    @Param('id') evaluationId: number
  ) {
    const evaluation = await Evaluation.findOneById(evaluationId)
    if (!evaluation) throw new NotFoundError('Evaluation does not exist!')
    return evaluation
  }

  @Authorized()
  @Post('/evaluations')
  @HttpCode(201)
  async createEvaluation(
    @Body() evaluation: Evaluation
  ) {
    return evaluation.save();
  }

  @Authorized()
  @Put('/evaluations/:id')
  @HttpCode(201)
  async updateEvaluation(
    @Param('id') evaluationId:number,
    @Body() update: Partial<Evaluation>
  ) {
    const evaluation = await Evaluation.findOneById(evaluationId)
    if (!evaluation) throw new NotFoundError('Evaluation does not exist!')

    return Evaluation.merge(evaluation, update)
  }
}
