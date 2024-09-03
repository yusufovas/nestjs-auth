import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/user.dto";
import { UserEntity } from "./user.entity";
import { comparePasswords, encodePassword } from "../utils/bcrypt";
import { LoginDto } from "./dto/login.dto";
import { generateJwt } from "../utils/jwt";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) { }

    async register(createUserDto: CreateUserDto): Promise<UserEntity> {

        const user = await this.userModel.findOne({ email: createUserDto.email })
        if (user) {
            throw new HttpException('email was registered before', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const password = encodePassword(createUserDto.password)
        const createdUser = new this.userModel({ ...createUserDto, password })
        return await createdUser.save()
    }

    async login(loginDto: LoginDto) {
        const user = await this.userModel.findOne({ email: loginDto.email })
        if (!user) {
            throw new HttpException('cannot find a user with such email', HttpStatus.NOT_FOUND)
        }

        const isMatch = comparePasswords(loginDto.password, user.password)
        if (isMatch) {
            return { message: 'successful login!', token: generateJwt(loginDto.email) }
        }
        throw new HttpException('wrong password', HttpStatus.BAD_REQUEST)
    }
}

