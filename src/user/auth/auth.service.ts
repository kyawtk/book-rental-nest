import {
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
@Injectable()
export class AuthService {
  constructor(
    private prisma: DatabaseService,
    private jwtService: JwtService,
  ) {}
  async signup(signUpDto: SignUpDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            name: signUpDto.name,
          },
          { phone: signUpDto.phone },
          { email: signUpDto.email },
        ],
      },
    });
    if (userExists) throw new ConflictException("User already exists");
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
    return { token, user };
  }

  private generateToken(userId, userName) {
    const token = this.jwtService.sign(
      {
        userId,
        userName,
      },
      { secret: "secret234p9usldfasdlweiuhodsf" },
    );
    return token;
  }
}
