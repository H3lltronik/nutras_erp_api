import { IsNotEmpty } from 'class-validator';

export class CreateKosherDetailsDto {
  @IsNotEmpty()
  agency: string;

  @IsNotEmpty()
  certifiedCompany: string;

  @IsNotEmpty()
  nameOnCertificate: string;

  @IsNotEmpty()
  kidOrUkd: string;

  @IsNotEmpty()
  certificatePageNumber: number;

  @IsNotEmpty()
  certificateValidity: string;
}
