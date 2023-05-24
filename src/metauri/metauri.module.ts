import { Module } from '@nestjs/common';
import { MetauriService } from './metauri.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metauri } from './entities/metauri.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metauri])],
  providers: [MetauriService],
   exports: [MetauriService]
})
export class MatauriModule {}
