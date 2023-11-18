import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { UpdatePutUserDTO } from './dto/update_put_user.dto';
import { UpdatePatchUserDTO } from './dto/update_patch_user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() {email,name,password}: CreateUserDTO) {
    return { 
      email,
      name,
      password
    };
  }

  @Get()
  async readAll() {
    return { users: [{}] };
  }

  @Get(':id')
  async readOne(@Param() params) {
    return { user: {}, params };
  }

  @Put(':id')
  async updateAll(@Body() {name,email,password}: UpdatePutUserDTO, @Param() params) {
    return {
      method: 'put',
      name,email,password,
      params,
    };
  }

  @Patch(':id')
  async updateParcial(@Body() name:UpdatePatchUserDTO, @Param() params) {
    return {
      method: 'patch',
      name,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param() param) {
    return {
      param,
    };
  }
}

// o @Param pega os paremetros da url como o id
