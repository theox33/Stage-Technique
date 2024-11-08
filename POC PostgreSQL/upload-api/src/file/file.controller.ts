import { Controller, Get, Param, Post, Delete, Req, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { RequestWithUser } from './types/express-request.interface';
import { Response } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: RequestWithUser) {
    const userId = req.user?.sub; // Cast de `req` en `unknown` puis en `RequestWithUser`
    return this.fileService.uploadFile(file, userId);
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: number, @Req() req: RequestWithUser, @Res() res: Response) {
    const userId = req.user?.sub;
    const file = await this.fileService.getFile(id, userId);
    res.set({
      'Content-Type': file.fileType,
      'Content-Disposition': `attachment; filename="${file.fileName}"`,
    });
    res.send(file.fileData);
  }

  @Get('metadata/:id')
  async getFileMetadata(@Param('id') id: number, @Req() req: RequestWithUser) {
    const userId = req.user?.sub;
    const file = await this.fileService.getFile(id, userId);
    return {
      id: file.id,
      fileName: file.fileName,
      fileType: file.fileType,
      fileSize: file.fileSize,
    };
  }

  @Get()
  async getUserFiles(@Req() req: RequestWithUser) {
    const userId = req.user?.sub;
    return this.fileService.getUserFiles(userId);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: number, @Req() req: RequestWithUser) {
    const userId = req.user?.sub;
    await this.fileService.deleteFile(id, userId);
    return { message: 'Fichier supprimé avec succès' };
  }
}
