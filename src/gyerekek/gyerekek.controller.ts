import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { GyerekekService } from './gyerekek.service';
import { CreateGyerekekDto } from './dto/create-gyerekek.dto';
import { UpdateGyerekekDto } from './dto/update-gyerekek.dto';
import { CreateJatekokDto } from 'src/jatekok/dto/create-jatekok.dto';
@Controller('children')
export class GyerekekController {
  constructor(private readonly gyerekekService: GyerekekService) {}

  @Post()
  create(@Body() createGyerekekDto: CreateGyerekekDto) {
    return this.gyerekekService.create(createGyerekekDto);
  }

  @Get()
  findAll() {
    return this.gyerekekService.findAll();
  }

  @Get('byBehavior')
  findChildrenByBehavior(@Query('behavior') behavior: string) {
    return this.gyerekekService.findChildrenByBehavior(behavior);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gyerekekService.findOne(+id);
  }

  @Get(':id/toys')
  findToys(@Param('id') id: string) {
    return this.gyerekekService.findToys(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGyerekekDto: UpdateGyerekekDto) {
    return this.gyerekekService.update(+id, updateGyerekekDto);
  }

  @Put(':id/toys/:toyId')
  addToy(@Param('id') id: string, @Param('toyId') toyId: string) {
    return this.gyerekekService.addToy(+id, +toyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gyerekekService.remove(+id);
  }

  @Delete(':id/toys/:toyId')
  removeToy(@Param('id') id: string, @Param('toyId') toyId: string) {
    return this.gyerekekService.removeToy(+id, +toyId);
  }
}
