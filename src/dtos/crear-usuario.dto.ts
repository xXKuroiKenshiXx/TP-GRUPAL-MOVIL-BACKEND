//especifica los datos que queremos recibir al crear usuario en usuarios.service

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class crearUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  clave: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  nombre_usuario: string;
  
  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  rol: string;
}