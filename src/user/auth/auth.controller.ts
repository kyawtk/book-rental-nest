import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { Http2ServerResponse } from "http2";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignUpDto })
  @Post("/signup")
  @Public()
  signup(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @ApiBody({ type: SignInDto })
  @Post("/signin")
  @HttpCode(200)
  @Public()
  signin(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  //   @UseGuards(AuthGuard)
  //   @Get("/profile")
  //   async profile(@Request() req) {
  //     return req.user ;
  //   }
}
