/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Request } from 'express';
import * as multer from 'multer';

/**
 * Filter for the upload of files
 */
export const FileFilter = {
    fileFilter: (req: Request, file, cb: (err: Error, success: boolean) => void) => {
        if (file.originalname.endsWith('.txt')) cb(null, true);
        else return cb(null, false);
    },
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2 * 10,
    },
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'D:\\Backup\\Backup\\Projects\\Personal\\WhatsAppChat-Analytics\\chats');
        },
        filename(req, file, cb) {
            cb(null, `${Date.now()}-chat.txt`);
        },
    }),
};
