import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class CreateSubscribeDto {
  @IsString()
  @IsNotEmpty()
  emailSubscribe: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  createdBy: User;
}
