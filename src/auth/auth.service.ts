import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserSerivce } from 'src/user/user.service';

@Injectable()
export class AuthService {

  private issuer = "login";
  private audience = 'users';

  constructor(
    private readonly JWTService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserSerivce,
  ) { }


  async createToken(user: User) {
    return {
      acesssToken: this.JWTService.sign({
        name: user.name,
        email: user.email,
      },
        {
          expiresIn: "10 seconds",
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        })
    }
  }

  async checkToken(token: string) {

    try {
      const data = this.JWTService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,

      });
      return data
    }
    catch (e) {
      throw new BadRequestException(e)
    }

  }

  async isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true
    }
    catch (e) {
      return false
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email incorretos');
    }

    //Enviar email para trocar senha...

    return true;
  }

  async reset(password: string, token: string) {
    // validar token

    const id = 0;

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {

    const user = await this.userService.create(data)
    return this, this.createToken(user)
  }
}
