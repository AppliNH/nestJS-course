import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<void>{ // ValidationPipe triggers the class validator which are set in the DTO
        return this.authService.signUp(authCredentials);
    }

    @Post('/signin')
    signIn(@Body() authCredentials: AuthCredentialsDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentials);
    }

    @Post('/testAuth')
    @UseGuards(AuthGuard())
    testAuth(@Req() req) {
        console.log(req)

    }
}  
