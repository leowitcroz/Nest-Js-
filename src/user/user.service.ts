import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserSerivce {

    constructor(private readonly prisma: PrismaService){
        
    }   

  async create({ email, name, password }: CreateUserDTO) {

    return this.prisma.user.create({
        data:{
            email,
            name,
            password,
        },
    })

  }

  async list(){
    return this.prisma.user.findMany()
  }

  async show(id: number){
    return this.prisma.user.findUnique({
      where:{
        id
      }
    })
  }
}