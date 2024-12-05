import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, BadRequestException } from '@nestjs/common';
import { GyerekekService } from './gyerekek.service';
import { CreateGyerekekDto } from './dto/create-gyerekek.dto';
import { UpdateGyerekekDto } from './dto/update-gyerekek.dto';

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



  @Get(':id')
  findOne(@Param('id') id: string) {
    const childId = +id;
    if (isNaN(childId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.gyerekekService.findOne(childId);
  }

  @Get(':id/toys')
  findToys(@Param('id') id: string) {
    return this.gyerekekService.findToys(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGyerekekDto: UpdateGyerekekDto) {
    const childId = +id;
    if (isNaN(childId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.gyerekekService.update(childId, updateGyerekekDto);
  }

  @Put(':id/toys/:toyId')
  addToy(@Param('id') id: string, @Param('toyId') toyId: string) {
    const childId = +id;
    if (isNaN(childId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.gyerekekService.addToy(childId, +toyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const childId = +id;
    if (isNaN(childId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.gyerekekService.remove(childId);
  }

  @Delete(':id/toys/:toyId')
  removeToy(@Param('id') id: string, @Param('toyId') toyId: string) {
    const childId = +id;
    if (isNaN(childId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.gyerekekService.removeToy(childId, +toyId);
  }
}
