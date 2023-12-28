import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePurchaseRequisitionDto } from '../dto/purchase_requisition/create-purchase_requisition.dto';
import { GetPurchaseRequisitionsFilterDto } from '../dto/purchase_requisition/get-purchase_requisition.dto';
import { UpdatePurchaseRequisitionDto } from '../dto/purchase_requisition/update-purchase_requisition.dto';
import { PurchaseRequisitionService } from '../services/purchase_requisition.service';

@Controller('purchaseRequisitions')
export class PurchaseRequisitionController {
  constructor(
    private readonly purchaseRequisitionService: PurchaseRequisitionService,
  ) {}

  @Post()
  create(@Body() createPurchaseRequisitionDto: CreatePurchaseRequisitionDto) {
    return this.purchaseRequisitionService.create(createPurchaseRequisitionDto);
  }

  @Get()
  async findAll(@Query() filterDto: GetPurchaseRequisitionsFilterDto) {
    const result = await this.purchaseRequisitionService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseRequisitionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseRequisitionDto: UpdatePurchaseRequisitionDto,
  ) {
    return this.purchaseRequisitionService.update(
      id,
      updatePurchaseRequisitionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseRequisitionService.remove(id);
  }
}
