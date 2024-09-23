/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';
import { AuthGaurd } from '../gaurds/auth.guard';
import { CurrentUser } from '../users/decorators/currentUser.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) {}
    @Post()
    @UseGuards(AuthGaurd)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) { 
        return this.reportService.create(body, user);
    }
}
