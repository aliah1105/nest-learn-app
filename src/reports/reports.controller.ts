/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGaurd } from '../gaurds/auth.guard';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) {}
    @Post()
    @UseGuards(AuthGaurd)
    createReport(@Body() body: CreateReportDto) { 
        return this.reportService.create(body);
    }
}
