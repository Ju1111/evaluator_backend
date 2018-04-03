import { JsonController, Param, BadRequestError, NotFoundError, Get, Body, HttpCode, Post, Authorized, Put } from 'routing-controllers'
import Evaluation from './entity'

@JsonController()
export default class EvaluationController {

  @Get('/evaluations')
  @HttpCode(200)
  async getEvaluations(
  ) {
    return Evaluation.find()
  }

  @Get('/evaluations/:id([0-9]+)')
  @HttpCode(200)
  async getEvaluation(
    @Param('id') evaluationId: number
  ) {
    const evaluation = await Evaluation.findOneById(evaluationId)
    if (!evaluation) throw new NotFoundError('Evaluation does not exist!')
    return evaluation
  }

  @Post('/evaluations')
  @HttpCode(201)
  async createEvaluation(
    @Body() evaluation: Evaluation
  ) {
    return evaluation.save();
  }

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
