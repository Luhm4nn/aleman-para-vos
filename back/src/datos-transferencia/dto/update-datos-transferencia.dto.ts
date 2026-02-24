import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateDatosTransferenciaDto {
    @IsString()
    @IsNotEmpty()
    alias: string;

    @IsString()
    @IsNotEmpty()
    cvu: string;

    @IsString()
    @IsNotEmpty()
    nombreCuenta: string;
}
