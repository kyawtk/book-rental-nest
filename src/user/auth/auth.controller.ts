import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  signup(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }
  @Post("/signin")
  signin(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }
}
