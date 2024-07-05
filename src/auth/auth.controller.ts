import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  registerUser(data: any) {
    return 'register user';
  }

  @MessagePattern('auth.login.user')
  loginUser(data: any) {
    return 'login user';
  }

  @MessagePattern('auth.verify.user')
  verifyUser(data: any) {
    return 'verify user';
  }
}
