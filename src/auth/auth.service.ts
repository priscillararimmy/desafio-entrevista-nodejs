import { UserPayload } from './models/UserPayload';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    login(user: User): UserToken {
        const payload: UserPayload= {
            sub: user.id,
            email: user.email,
            name: user.name,
        }
    
        const jwtToken = this.jwtService.sign(payload);

        return {
            acess_token: jwtToken,
        }
    }

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
