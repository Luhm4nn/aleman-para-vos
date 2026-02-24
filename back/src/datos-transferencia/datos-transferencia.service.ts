import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDatosTransferenciaDto } from './dto/update-datos-transferencia.dto';

@Injectable()
export class DatosTransferenciaService {
    constructor(private prisma: PrismaService) { }

    async getDatos() {
        let datos = await this.prisma.datosTransferencia.findFirst();

        // Si no existe ninguno, creamos uno por defecto vacío para que siempre haya algo
        if (!datos) {
            datos = await this.prisma.datosTransferencia.create({
                data: {
                    alias: '',
                    cvu: '',
                    nombreCuenta: '',
                },
            });
        }

        return datos;
    }

    async updateDatos(updateDto: UpdateDatosTransferenciaDto) {
        const current = await this.getDatos();
        return this.prisma.datosTransferencia.update({
            where: { id: current.id },
            data: updateDto,
        });
    }
}
