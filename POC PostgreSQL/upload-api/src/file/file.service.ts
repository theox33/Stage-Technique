import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async uploadFile(file: Express.Multer.File, userId: string): Promise<File> {
    const newFile = new File();
    newFile.fileName = file.originalname;
    newFile.fileType = file.mimetype;
    newFile.fileSize = file.size;
    newFile.fileData = file.buffer;
    newFile.userId = userId;

    return this.fileRepository.save(newFile);
  }

  async getFile(id: number, userId: string): Promise<File> {
    const file = await this.fileRepository.findOne({ where: { id, userId }});
    if (!file) {
      throw new ForbiddenException('Accès interdit au fichier demandé');
    }
    return file;
  }

  async getFileMetadata(id: number, userId: string): Promise<Partial<File>> {
    const file = await this.getFile(id, userId);
    return {
      id: file.id,
      fileName: file.fileName,
      fileType: file.fileType,
      fileSize: file.fileSize,
    };
  }
  

  async deleteFile(id: number, userId: string): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id, userId }});
    if (!file) {
      throw new ForbiddenException('Accès interdit au fichier demandé');
    }
    await this.fileRepository.delete(id);
  }

  async getUserFiles(userId: string): Promise<File[]> {
    return this.fileRepository.find({ where: { userId }});
  }
}