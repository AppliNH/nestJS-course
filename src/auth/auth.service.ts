import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentials);
    }

}
