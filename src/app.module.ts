import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { UserModule } from './user/user.module';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'gon_quanyika',
      autoLoadEntities: true,
      synchronize: true,
    }),
    NotesModule,
    UserModule,
	NftModule
  ]
})
export class AppModule {}
