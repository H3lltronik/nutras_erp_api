import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPresentation } from '../../product/entities/product-presentation.entity';

@Injectable()
export class ProductPresentationSeederService {
  constructor(
    @InjectRepository(ProductPresentation)
    private productPresentationsRepository: Repository<ProductPresentation>,
  ) {}

  async seed() {
    console.log('Seeding product presentations...');

    const productPresentations = [
        {
            name: 'Saco',
        },
        {
            name: 'Bidón',
        },
        {
            name: 'Garrafón',
        },
        {
            name: 'Caja',
        },
        {
            name: 'Cubeta',
        },
        {
            name: 'Granel',
        },
        {
            name: 'Bulto',
        },
        {
            name: 'kg',
        },
        {
            name: 'Bobina',
        },
        {
            name: 'Rollo',
        },
        {
            name: 'Paquete',
        },
        {
            name: 'Caja',
        },
        {
            name: 'Pieza',
        },
        {
            name: 'Lata',
        },
        {
            name: 'Bolsa',
        },
    ];
    let productPresentationsSaved = [];
    for (const productPresentation of productPresentations) {
      const productPresentationEntity = await this.productPresentationsRepository.findOne({
        where: { name: productPresentation.name },
      });
      if (!productPresentationEntity) {
        await this.productPresentationsRepository.save(productPresentation);
      } else {
        await this.productPresentationsRepository.update(productPresentationEntity.id, productPresentation);
      }
      productPresentationsSaved.push(productPresentation);
    }
    return productPresentationsSaved;
  }
}
