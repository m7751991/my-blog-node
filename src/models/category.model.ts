import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class CategoryModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: "bigint",
    transformer: {
      to: (value: number) => {
        if (!!value) {
          return BigInt(value);
        }
        console.log(Date.now(), "Date.now()");

        return BigInt(Date.now());
      }, // 插入时转换为 bigint
      from: (value: string) => Number(value), // 查询时转换为数字
    },
  })
  createdAt!: bigint; // 将类型更改为 number，以存储时间戳

  @Column({
    nullable: true,
    type: "bigint",
    transformer: {
      to: (value: number) => {
        if (!!value) {
          return BigInt(value);
        }
        return null;
      }, // 插入时转换为 bigint
      from: (value: string) => Number(value), // 查询时转换为数字
    },
  })
  updatedAt: bigint; // 将类型更改为 number，以存储时间戳

  constructor(params: CategoryModel) {
    this.createdAt = Date.now() as unknown as bigint;
    Object.assign(this, params);
  }
}

export default CategoryModel;
