import { BadRequestException, Injectable } from '@nestjs/common';
import { loginDto } from 'src/dtos/login.dto';
import { Usuario } from 'src/entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuariosService,
        private jwtService: JwtService,
    ) { }
    async login(loginDto: loginDto): Promise<{ token: string }> {
        const usuario: Usuario = await this.usuarioService.getByUsername( loginDto.username );
        if (!usuario) { console.log('Nombre de usuario no válido') }

        const correctPassword: boolean = bcrypt.compareSync(loginDto.password, usuario.clave);

        if (!correctPassword) throw new BadRequestException('contraseña incorrecta')
        if (correctPassword) console.log('Sesion iniciada correctamente')
        const token: string = this.jwtService.sign({sub: usuario.id, rol: usuario.rol});

        return { token };
    }
}
