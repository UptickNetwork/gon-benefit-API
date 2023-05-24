import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from './entities/nft.entity';
import {MatauriModule } from 'src/metauri/metauri.module';

@Module({
  imports: [TypeOrmModule.forFeature([Nft]),MatauriModule],
  controllers: [NftController],
  providers: [NftService]
})
export class NftModule {}
