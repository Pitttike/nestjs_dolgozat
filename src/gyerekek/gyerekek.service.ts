import { Injectable } from '@nestjs/common';
import { CreateGyerekekDto } from './dto/create-gyerekek.dto';
import { UpdateGyerekekDto } from './dto/update-gyerekek.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class GyerekekService {
  constructor(private prisma: PrismaService) { }

  create(createGyerekekDto: CreateGyerekekDto) {
    return this.prisma.child.create({
      data: createGyerekekDto,
    });
  }

  findAll() {
    return this.prisma.child.findMany();
  }

  findChildrenByBehavior(behavior: string) {
    if (behavior === 'good') {
      return this.prisma.child.findMany({
        where: { isGood: true },
      });
    }
    else if (behavior === 'bad') {
      return this.prisma.child.findMany({
        where: { isGood: false },
      });
    }
    else {
      throw new BadRequestException('Invalid behavior');
    }
  }

  async findOne(id: number) {
    const child = await this.prisma.child.findUnique({
      where: { id },
    });
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return child;
  }

  async findToys(id: number) {
    const child = await this.prisma.child.findUnique({
      where: { id },
      include: { toys: true },
    });
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return child.toys;
  }

  async update(id: number, updateGyerekekDto: UpdateGyerekekDto) {
    try {
      return await this.prisma.child.update({
        where: { id },
        data: updateGyerekekDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Child with ID ${id} not found`);
      }
      throw error;
    }
  }

  async addToy(id: number, toyId: number) {
    try {
      return await this.prisma.child.update({
        where: { id },
        data: { toys: { connect: { id: toyId } } },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Child with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.child.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Child with ID ${id} not found`);
      }
      throw error;
    }
  }

  async removeToy(id: number, toyId: number) {
    try {
      return await this.prisma.child.update({
        where: { id },
      data: { toys: { disconnect: { id: toyId } } },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Child with ID ${id}not found`);
      }
      throw error;
    }
  }
}
