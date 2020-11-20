import { getRepository } from 'typeorm';
import path from 'path';
import User from '../models/User';
import uploadConfig from '../config/upload';
import fs from 'fs';
import AppError from '../errors/AppError';

interface Request {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user){
        throw new AppError("Only autheticated can change avatar", 401);
    }

    if(user.avatar){
        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
        if (userAvatarFileExists){
            await fs.promises.unlink(userAvatarFilePath);
        }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
