import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<File> {
    const newFile = new File();
    newFile.fileName = file.originalname;
    newFile.fileType = file.mimetype;
    newFile.fileSize = file.size;
    newFile.fileData = file.buffer;

    return this.fileRepository.save(newFile);
  }

  async getFile(id: number): Promise<File> {
    return this.fileRepository.findOneBy({ id });
  }

  async getFileMetadata(id: number): Promise<File> {
    return this.fileRepository.findOne({
      where: { id },
      select: ['id', 'fileName', 'fileType', 'fileSize'],
    });
  }

  async deleteFile(id: number): Promise<void> {
    await this.fileRepository.delete({ id });
  }
}