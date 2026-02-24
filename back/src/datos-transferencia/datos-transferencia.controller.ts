import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DatosTransferenciaService } from './datos-transferencia.service';
import { UpdateDatosTransferenciaDto } from './dto/update-datos-transferencia.dto';

@Controller('datos-transferencia')
export class DatosTransferenciaController {
    constructor(private readonly datosTransferenciaService: DatosTransferenciaService) { }

    @Get()
    getDatos() {
        return this.datosTransferenciaService.getDatos();
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    updateDatos(@Body() updateDto: UpdateDatosTransferenciaDto) {
        return this.datosTransferenciaService.updateDatos(updateDto);
    }
}
