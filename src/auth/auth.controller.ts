import { LocalAuthGuard } from './guards/local-auth.guard.ts';
import { AuthService } from './auth.service';
import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

@Controller()
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login() {
        return 'Realizar login'
        // return this.authservice.login();
    }
}
