import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { SocialPlatform } from "src/shared/enum/social-platform.enum";
import { User } from "src/users/user.entity";

export class CreateSocialLinkDto {
  @IsEnum(SocialPlatform, { message: "icon must be one of: facebook, twitter, x, instagram, linkedin, youtube, tiktok, snapchat, whatsapp" })
  icon: SocialPlatform;

  @IsString()
  @MinLength(3)
  @MaxLength(1024)
  link: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  createdBy: User;
}
