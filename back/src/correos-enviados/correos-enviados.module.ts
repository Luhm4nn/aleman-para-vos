import { Module } from '@nestjs/common';
import { CorreosEnviadosService } from './correos-enviados.service';
import { CorreosEnviadosController } from './correos-enviados.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CorreosEnviadosController],
  providers: [CorreosEnviadosService],
  exports: [CorreosEnviadosService],
})
export class CorreosEnviadosModule {}
