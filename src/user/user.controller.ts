import { Controller, Get, Post, Body, Patch, Param,Query, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
	  let userDto=new User()
	  let findUserDto=new FindUserDto();
	  findUserDto.address=createUserDto.address
	  userDto= await this.userService.findOneByaddress(findUserDto);
	  
	  if(userDto&&userDto.id){
	  }else{
		userDto=  await this.userService.create(createUserDto);
	  }
	  let jsonResult={
	  	"code":0,
	  	"obj":userDto
	  }
    return jsonResult
  }

  @Get('info')
  async findOneByaddress(@Query('address') address: string) {
	let findUserDto=new FindUserDto();
	findUserDto.address=address
	  // https://blog.csdn.net/qq1195566313/article/details/127590610
	 let obj= await this.userService.findOneByaddress(findUserDto);
	 let code=1;
	 
	 if(obj&&obj.id>0){
		 code=0
	 }
	  let jsonResult={
	    	"code":code,
	    	"obj":obj
	    }
	  return jsonResult
  }
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }


  @Post('edit')
  async update(@Body() updateUserDto: UpdateUserDto) {
	  let userDto=new User()
	  let findUserDto=new FindUserDto();
	  findUserDto.address=updateUserDto.address
	  userDto= await this.userService.findOneByaddress(findUserDto);
	 await this.userService.update(userDto.id,updateUserDto);
	  userDto= await this.userService.findOneByaddress(findUserDto);
	  let code=1;
	  
	  if(userDto&&userDto.id>0){
	  		 code=0
	  }
	   let jsonResult={
	     	"code":code,
	     	"obj":userDto
	     }
    return jsonResult
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
