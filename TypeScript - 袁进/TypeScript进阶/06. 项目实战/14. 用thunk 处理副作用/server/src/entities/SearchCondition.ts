import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity {
    /**
     * 页码，从1开始
     */
    @IsInt({ message: "页码必须是整数" })
    @Min(1, { message: "页码最小值为1" })
    @Type(() => Number)
    public page: number = 1;

    /**
     * 页容量（每页的记录数）
     */
    @IsInt({ message: "页容量必须是整数" })
    @Min(1, { message: "页容量最小值为1" })
    @Type(() => Number)
    public limit: number = 10;

    /**
     * 搜索关键字
     */
    @Type(() => String)
    public key: string = "";

    public static transform(plainObject: object): SearchCondition {
        return super.baseTransform(SearchCondition, plainObject);
    }
}
