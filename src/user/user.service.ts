import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update_put_user.dto';
import { UpdatePatchUserDTO } from './dto/update_patch_user.dto';

@Injectable()
export class UserSerivce {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    { email, name, password, birthAt }: UpdatePutUserDTO,

    id: number,
  ) {
    await this.exist(id);

    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }

  async updateParcial(
    id: number,
    { email, name, password, birthAt }: UpdatePatchUserDTO,
  ) {
    await this.exist(id);
    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (name) {
      data.name = name;
    }

    if (password) {
      data.password = password;
    }

    if (email) {
      data.email = email;
    }

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.exist(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exist(id: number) {
    if (!(await this.show(id))) {
      throw new NotFoundException(
        `The user with the following id ${id} don't exist`,
      );
    }
  }
}
