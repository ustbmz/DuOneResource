import { IsNotEmpty, ArrayMinSize, IsInt, Min, Max } from "class-validator";

export class Movie {
    @IsNotEmpty({ message: "电影名称不可以为空" })
    public name: string;

    @IsNotEmpty({ message: "电影类型不可以为空" })
    @ArrayMinSize(1, { message: "电影类型至少有一个" })
    public types: string[];

    @IsNotEmpty({ message: "上映地区不可以为空" })
    @ArrayMinSize(1, { message: "上映地区至少有一个" })
    public areas: string[];

    @IsNotEmpty({ message: "时长不可以为空" })
    @IsInt({ message: "时长必须是整数" })
    @Min(1, { message: "时长最小1分钟" })
    @Max(999999, { message: "时长过长" })
    public timeLong: number;

    @IsNotEmpty({ message: "是否热映不可以为空" })
    public isHot: boolean = false;

    @IsNotEmpty({ message: "是否即将上映不可以为空" })
    public isComing: boolean = false;

    @IsNotEmpty({ message: "是否是经典影片不可以为空" })
    public isClassic: boolean = false;

    public description?: string;

    public poster?: string;
}
