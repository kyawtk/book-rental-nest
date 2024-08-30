import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrorCodes } from "libs/utils/enums";
@Injectable()
export class AuthService {
  constructor(
    private prisma: DatabaseService,
    private jwtService: JwtService,
  ) {}
  async signup(signUpDto: SignUpDto) {
    try {
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          name: signUpDto.name,
          phone: signUpDto.phone,
          email: signUpDto.email,
          password: hashedPassword,
        },
      });
      const token = this.generateToken(user.userId, user.name);
      return { token, user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == PrismaErrorCodes.UNIQUE_CONSTRAINT_VIOLATION) {
          throw new BadRequestException("Email or phone number already exists");
        }
      }
      throw error;
    }
  }
  async signin(signInDto: SignInDto) {
    const user = await this.prisma.user.findFirst({
      where: { phone: signInDto.phone },
    });
    if (!user) throw new NotFoundException("User not found");
    //veryfy password
    const passwordCorrect = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!passwordCorrect)
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);

    const token = this.generateToken(user.userId, user.name);

    return { token, user: { name: user.name, id: user.userId } };
  }

  private generateToken(userId, userName) {
    const token = this.jwtService.sign({
      userId,
      userName,
    });
    return token;
  }
}
