/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { Reflector } from '@nestjs/core';
import { RolesEnum } from 'src/enums/roles.enum';

export const Roles = Reflector.createDecorator<RolesEnum[]>( );