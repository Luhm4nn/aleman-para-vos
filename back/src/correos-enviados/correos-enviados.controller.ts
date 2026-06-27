import { Controller, Get, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CorreosEnviadosService } from './correos-enviados.service';

@UseGuards(JwtAuthGuard)
@Controller('correos-enviados')
export class CorreosEnviadosController {
  constructor(private readonly correosEnviadosService: CorreosEnviadosService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.correosEnviadosService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.correosEnviadosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.correosEnviadosService.remove(+id);
  }
}
