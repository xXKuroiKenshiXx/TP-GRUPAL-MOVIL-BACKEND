import { Entity, PrimaryGeneratedColumn,Column } from 'typeorm';
import { EstadosUsuarioEnum } from '../enums/estado-usuario.enum';
import { RolesEnum } from '../enums/roles.enum';
import { Exclude } from 'class-transformer';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email' }) 
  gmail: string;

  @Exclude()
  @Column()
  clave: string;

  @Column()
  apellidos: string;

  @Column()
  nombres: string;

  @Column({ type: 'enum', enum: EstadosUsuarioEnum, default: 'ACTIVO' })
  estado: EstadosUsuarioEnum;

  @Column( { name: 'nombre_usuario' })
  nombre_usuario: string;

  @Column({ type: 'enum', enum: RolesEnum })
  rol: RolesEnum;

  // @Column({ name: 'fecha_registro', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  // fecha_registro: Date;
}
