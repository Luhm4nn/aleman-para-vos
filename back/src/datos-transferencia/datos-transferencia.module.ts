import { Module } from '@nestjs/common';
import { DatosTransferenciaService } from './datos-transferencia.service';
import { DatosTransferenciaController } from './datos-transferencia.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [DatosTransferenciaController],
    providers: [DatosTransferenciaService],
})
export class DatosTransferenciaModule { }
