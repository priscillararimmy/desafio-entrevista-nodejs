import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}
   async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if(user) {
            // Checar se a senha informada corresponde a hash que está no banco
            const isPassworldValid = await bcrypt.compare(password, user.password)

            if(isPassworldValid) {
                return {
                    ...user,
                    password: undefined,
                }
            }
        }
        
        // Se chegar aqui, siginifica que não encontrou um user e/ou a senha não corresponde
        throw new Error('Email address or password provided is incorrect.')
    }
}
