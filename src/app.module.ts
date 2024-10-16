import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';


require('dotenv').config()

const CONFIG_DB: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: false,
};


@Module({
  imports: [
    TypeOrmModule.forRoot(CONFIG_DB),
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      global: true,
      secret: 'movilsecret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [UsuariosController, AuthController],
  providers: [UsuariosService,AuthService],
})
export class AppModule { }
