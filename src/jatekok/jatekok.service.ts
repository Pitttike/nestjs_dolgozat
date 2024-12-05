import { Injectable } from '@nestjs/common';
import { CreateJatekokDto } from './dto/create-jatekok.dto';
import { UpdateJatekokDto } from './dto/update-jatekok.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class JatekokService {
  constructor(private prisma: PrismaService) {}

  create(createJatekokDto: CreateJatekokDto) {
    return this.prisma.toy.create({
      data: {
        ...createJatekokDto,
      },
    });
  }

  findAll() {
    return this.prisma.toy.findMany();
  }

  async findOne(id: number) {
    const toy = await this.prisma.toy.findUnique({
      where: { id },
    });
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    }
    return toy;
  }

  async update(id: number, updateJatekokDto: UpdateJatekokDto) {
    try {
      return await this.prisma.toy.update({
        where: { id },
        data: updateJatekokDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Toy with ID ${id} not found`);
      }
      throw error;  
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.toy.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Toy with ID ${id} not found`);
      }
      throw error;
    }
  }
}
