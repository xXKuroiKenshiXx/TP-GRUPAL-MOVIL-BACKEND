import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { crearUsuarioDto } from '../dtos/crear-usuario.dto';
import { DeepPartial } from 'typeorm';
import { EstadosUsuarioEnum } from '../enums/estado-usuario.enum';
import { RolesEnum } from '../enums/roles.enum';
import { ICollection } from 'src/interface/ICollection';
import { CustomError } from 'src/helpers/CustomError';
import * as bcrypt from 'bcrypt';
import { responseStatusMsg } from 'src/helpers/utils';
import { MsgEnum } from 'src/enums/mensajes.enum';


@Injectable()
export class UsuariosService implements ICollection {
  constructor(
    @InjectRepository(Usuario) private userRepository: Repository<Usuario>,
  ) { }
  async create(usuarioDto: crearUsuarioDto) {
    try {
      const usuarios = await this.userRepository.find();
      const yaExiste = usuarios.find((u) => u.email === usuarioDto.email);
      if (!yaExiste) {
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(usuarioDto.clave, 10);

        const usuario: any = { ...usuarioDto }
        usuario.estado = usuario.estado ? usuario.estado : EstadosUsuarioEnum.ACTIVO
        usuario.rol = usuario.rol ? usuario.rol : RolesEnum.USUARIO
        usuario.clave = hashedPassword

        const usuarioEntity: DeepPartial<Usuario> = usuario;

        const nuevoUsuario = this.userRepository.create(usuarioEntity);
        return this.userRepository.save(nuevoUsuario);
      } else {
        return responseStatusMsg(404, MsgEnum.USUARIO_EXISTENTE);
      }
    } catch (error) {
      console.log(error);
      return responseStatusMsg(404, MsgEnum.ERROR_DESCONOCIDO);
    }
  }
  async getAll() {
    try {
      const result = await this.userRepository.find({
        where: {
          estado: EstadosUsuarioEnum.ACTIVO,
        },
      });
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async getById(id: string | number): Promise<Usuario> {
    try {
      const usuario = await this.userRepository.findOne({
        where: {
          id: typeof id === 'number' ? id : parseInt(id),
          estado: EstadosUsuarioEnum.ACTIVO,
        }});
      return usuario;
    } catch (err) {
      console.log(err);
      //return [];
    }
  }
  async updateById(id: string | number, usuarioModificado: crearUsuarioDto) {
    
    
    const usuario = await this.userRepository.findOne({
      where: { id: typeof id === 'number' ? id : parseInt(id) },
    });
    if (!usuario) new CustomError('Usuario no encontrado')

    const updateUsuario: any = { ...usuario, ...usuarioModificado }
    
    await this.userRepository.save(updateUsuario);

    return responseStatusMsg(200, MsgEnum.ELEMENTO_ATUALIZADO);
  }

  async deleteById(id: number | string) {
    try {
      const usuario = await this.userRepository.findOne({
        where: { id: typeof id === 'number' ? id : parseInt(id) },
      });

      if (!usuario) new CustomError('Usuario no encontrado')

      usuario.estado = EstadosUsuarioEnum.BAJA;
      await this.userRepository.save(usuario);
      return responseStatusMsg(200, MsgEnum.ELEMENTO_ELIMINADO);
    } catch (error) {
      console.log(error);
      return responseStatusMsg(200, MsgEnum.ERROR_DESCONOCIDO);
    }
  }

  async getByUsername(username: string): Promise <Usuario>{

    const usuario: Usuario = await this.userRepository.findOne({
      where: {
          nombre_usuario: username,
          estado: EstadosUsuarioEnum.ACTIVO
      },
    });
    return usuario;
  }
}

