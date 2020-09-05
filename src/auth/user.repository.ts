import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {

        const { username, password } = authCredentials;


        // salt encryption allows to generate a different hashed string everytime, even if the original string is the same
        // however, you still gotta store the salt hash, in order to re-match the original string
        // Note that the salt hash DOESN'T allow to DECRYPT the hashed string, since Salt Encryption is a one way hash
        // But it will allow you to generate another hashed string that you can match with the one in your db, to verify that pass is correct

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);


        try {
            await user.save()
        } catch (error) {
            if (error["code"] === "23505") {   // duplicate username
                throw new ConflictException("Username already exists");
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(authCredentials: AuthCredentialsDto): Promise<string> {

        const { username, password } = authCredentials;

        const user = await this.findOne({ username }); // Find using username
        
        if(user) {
            if(await user.validatePassword(password)) {
                return user.username;
            }
        }
        return null;

    }

}