import { JsonController, Param, NotFoundError, Get, Body, HttpCode, Post, Authorized } from 'routing-controllers'
import Batch from './entity'

@JsonController()
export default class BatchController {

  @Get('/batches')
  @HttpCode(200)
  async getBatches(
  ) {
    return Batch.find()
  }

  @Get('/batches/:id([0-9]+)')
  @HttpCode(200)
  async getBatch(
    @Param('id') batchId: number
  ) {
    const batch= await Batch.findOneById(batchId)
    if (!batch) throw new NotFoundError('Batch does not exist!')
    return batch
  }

  @Post('/batches')
  @HttpCode(201)
  async createBatch(
    @Body() batch: Batch,
  ) {
    return batch.save();
  }
}
