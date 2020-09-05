import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}


}
