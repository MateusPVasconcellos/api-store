import upload from '@config/upload';
import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';

class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new AppError('File not found.', httpStatus.NOT_FOUND);
    }

    const fileContent = fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: upload.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: upload.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default new S3StorageProvider();
