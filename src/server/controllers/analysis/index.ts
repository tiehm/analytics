/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Request } from 'express';
import { Authorized, Body, Get, JsonController, Param, Post, Req, UploadedFile } from 'routing-controllers';
import { FileFilter } from '../../../util/FileFilter';
import { GetData } from './getData/GetData';
import { GetHomepage } from './getHomepage/GetHomepage';
import { AnalysisForm } from './new/AnalysisForm';
import { NewAnalysis } from './new/NewAnalysis';

@JsonController('/analysis')
export class Analysis {
    @Get('/')
    @Authorized()
    public getHomepage(@Req() req: Request) {
        return GetHomepage(req);
    }

    @Get('/:id')
    @Authorized()
    public getData(@Req() req: Request, @Param('id') id: string) {
        return GetData(req, id);
    }

    @Post('/new')
    @Authorized()
    public newAnalysis(
        @Req() req: Request,
        @UploadedFile('file', { required: false, options: FileFilter }) file: unknown,
        @Body({ required: true }) body: AnalysisForm,
    ) {
        return NewAnalysis(req, file, body);
    }
}
