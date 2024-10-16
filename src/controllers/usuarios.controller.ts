import { Controller, Get, Post, Body, Put, Param, Patch, UseGuards} from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { crearUsuarioDto } from '../dtos/crear-usuario.dto';
import { ICollection } from 'src/interface/ICollection';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enums/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('usuarios')
export class UsuariosController implements ICollection {
  constructor(private usuarioService: UsuariosService) {}
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() nuevoUsuario: crearUsuarioDto) {
    return this.usuarioService.create(nuevoUsuario);
  }

  @Get()
  @Roles([RolesEnum.ADMINISTRADOR]) //restriccion de rol para el metodo getAll
  @UseGuards(AuthGuard)
  getAll() {
    return this.usuarioService.getAll();
  }

  @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.USUARIO])
  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id') id: number | string) {
    return this.usuarioService.getById(id);
  }

  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  @Patch(':id')
  updateById(
    @Param('id') id: number | string,
    @Body() usuarioModificado: crearUsuarioDto,
  ) {
    return this.usuarioService.updateById(id, usuarioModificado);
  }

  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  @Put(':id')
  deleteById(@Param('id') id: number | string) {
    return this.usuarioService.deleteById(id);
  }
}
