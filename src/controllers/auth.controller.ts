import { Body, Controller, Post } from '@nestjs/common';
import { loginDto } from 'src/dtos/login.dto';
import { AuthService } from 'src/services/auth.service';

@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post()
    async login(@Body() loginDto: loginDto) {
        return await this.authService.login(loginDto);
    }
}
