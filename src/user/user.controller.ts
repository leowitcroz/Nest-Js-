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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { UpdatePutUserDTO } from './dto/update_put_user.dto';
import { UpdatePatchUserDTO } from './dto/update_patch_user.dto';
import { UserSerivce } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.intercptor';

@Controller('users')
export class UserController {

  constructor(private readonly userService:UserSerivce){

  }

  @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() {email,name,password,birthAt}: CreateUserDTO) {
    return this.userService.create({email,name,password,birthAt})
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
  async updateAll(@Body() {name,email,birthAt,password}: UpdatePutUserDTO, @Param('id', ParseIntPipe) id) {
    return this.userService.update({name,email,birthAt,password},id);
  }

  @Patch(':id')
  async updateParcial(@Body() data:UpdatePatchUserDTO, @Param('id', ParseIntPipe) id) {
    return this.userService.updateParcial(id,data)
  }
  

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.userService.delete(id )
  }
}

// o @Param pega os paremetros da url como o id
