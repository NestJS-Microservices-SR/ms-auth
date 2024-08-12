import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDTO } from './dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor() {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Prisma connected');
  }

  async registerUser(registerUserDto: RegisterUserDTO) {
    const { email, name, password } = registerUserDto;
    try {
      const user = await this.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        throw new RpcException({
          status: 400,
          message: 'User already exists',
        });
      }

      const newUser = this.user.create({
        data: {
          email,
          name,
          password,
        },
      });

      return {
        user: newUser,
        token: 'abc'
      }
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }
}
