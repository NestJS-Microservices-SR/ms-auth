import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  registerUser(@Payload() registerUserDto: RegisterUserDTO) {
    return this.authService.registerUser(registerUserDto);
  }

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginUserDto: LoginUserDTO) {
    return loginUserDto;
  }

  @MessagePattern('auth.verify.user')
  verifyUser(data: any) {
    return 'verify user';
  }
}
