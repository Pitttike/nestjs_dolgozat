import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { JatekokService } from './jatekok.service';
import { CreateJatekokDto } from './dto/create-jatekok.dto';
import { UpdateJatekokDto } from './dto/update-jatekok.dto';
@Controller('toys')
export class JatekokController {
  constructor(private readonly jatekokService: JatekokService) {}

  @Post()
  create(@Body() createJatekokDto: CreateJatekokDto) {
    return this.jatekokService.create(createJatekokDto);
  }

  @Get()
  findAll() {
    return this.jatekokService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    const numId = +id;
    if (isNaN(numId)) {
      throw new BadRequestException('Invalid ID format - must be a number');
    }
    return this.jatekokService.findOne(numId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJatekokDto: UpdateJatekokDto) {
    const numId = +id;
    if (isNaN(numId)) {
      throw new BadRequestException('Invalid ID format - must be a number');
    }
    return this.jatekokService.update(numId, updateJatekokDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numId = +id;
    if (isNaN(numId)) {
      throw new BadRequestException('Invalid ID format - must be a number');
    }
    return this.jatekokService.remove(numId);
  }
}
