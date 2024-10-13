/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Patch, Param, Get, Query } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';
import { AuthGaurd } from '../gaurds/auth.guard';
import { CurrentUser } from '../users/decorators/currentUser.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/ApproveReportDto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) { }
    @Post()
    @UseGuards(AuthGaurd)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @Patch('/:id')
    approveReport(@Body() body: ApproveReportDto, @Param('id') id: string) {
        return this.reportService.changeApproval(+id, body.approved);
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {

    }
}
