import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<any>{
        return await this.userService.register(createUserDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return await this.userService.login(loginDto)
    }

}