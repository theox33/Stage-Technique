import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }

  // Route pour télécharger le fichier
  @Get('download/:id')
  async downloadFile(@Param('id') id: number, @Res() res: Response) {
    const file = await this.fileService.getFile(id);
    if (!file) {
      throw new NotFoundException('Fichier non trouvé');
    }

    // Configurer les en-têtes pour le téléchargement
    res.set({
      'Content-Type': file.fileType,
      'Content-Disposition': `attachment; filename="${file.fileName}"`,
    });

    // Envoyer les données binaires du fichier
    res.send(file.fileData);
  }

  // Route pour obtenir les métadonnées d'un fichier
  @Get('metadata/:id')
  async getFileMetadata(@Param('id') id: number) {
    const file = await this.fileService.getFileMetadata(id);
    if (!file) {
      throw new NotFoundException('Fichier non trouvé');
    }

    // Retourner uniquement les métadonnées, sans les données binaires
    return {
      id: file.id,
      fileName: file.fileName,
      fileType: file.fileType,
      fileSize: file.fileSize,
    };
  }

  // Route pour supprimer un fichier
  @Get('delete/:id')
  async deleteFile(@Param('id') id: number) {
    await this.fileService.deleteFile(id);
    return { message: 'Fichier supprimé avec succès' };
  }
}