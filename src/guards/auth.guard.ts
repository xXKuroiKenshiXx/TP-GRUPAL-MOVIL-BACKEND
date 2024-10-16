/*
https://docs.nestjs.com/guards#guards
*/

import {
  CanActivate,ExecutionContext,Injectable,UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/entities/usuario.entity';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';
import { UsuariosService } from 'src/services/usuarios.service';
import { extractTokenFromHeader } from 'src/helpers/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usuariosService: UsuariosService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); //traer datos de la peticion http
    const token = extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token); //verifica que el token sea válido
      const usuario: Usuario = await this.usuariosService.getById( payload.sub );

      //obtener roles configurados en el decorador de roles 
      const roles:string[] = this.reflector.get(Roles, context.getHandler());
      //si NO hay restriccion de roles le da acceso al usuario al metodo
      if (!roles) {
        request['usuario'] = usuario;
        return true;
      }
      //si hay restriccion de roles verifica que el usuario tenga el rol necesario
      if (roles.includes(usuario.rol)) {
        request['usuario'] = usuario;
        return true;
      }
      throw new UnauthorizedException('Permisos insuficientes');
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }


}
