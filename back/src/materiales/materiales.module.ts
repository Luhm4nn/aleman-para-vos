import { Module } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MaterialesController],
  providers: [MaterialesService],
  exports: [MaterialesService],
})
export class MaterialesModule {}
