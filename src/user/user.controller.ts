import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { UpdatePutUserDTO } from './dto/update_put_user.dto';
import { UpdatePatchUserDTO } from './dto/update_patch_user.dto';
import { UserSerivce } from './user.service';

@Controller('users')
export class UserController {

  constructor(private readonly userService:UserSerivce){

  }

  @Post()
  async create(@Body() {email,name,password}: CreateUserDTO) {
    return this.userService.create({email,name,password})
  }

  @Get()
  async readAll() {
    return this.userService.list()
    
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id:number) {
    return this,this.userService.show(id)
  }

  @Put(':id')
  async updateAll(@Body() {name,email,password}: UpdatePutUserDTO, @Param('id', ParseIntPipe) id) {
    return {
      method: 'put',
      name,email,password,
      id,
    };
  }

  @Patch(':id')
  async updateParcial(@Body() name:UpdatePatchUserDTO, @Param('id', ParseIntPipe) id) {
    return {
      method: 'patch',
      name,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return {
      id,
    };
  }
}

// o @Param pega os paremetros da url como o id
