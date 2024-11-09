import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 155)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(10, 155)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  password: string;
}
