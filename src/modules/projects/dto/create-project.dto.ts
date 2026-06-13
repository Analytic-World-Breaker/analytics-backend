import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'My AI Analysis' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Analyzing Q3 marketing data', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
