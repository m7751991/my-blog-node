import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import BlogModel from "./blog.model";
import { CategoryModelType } from "../types";

@Entity()
class CategoryModel implements CategoryModelType {
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
        return BigInt(Date.now());
      },
      from: (value: string) => Number(value),
    },
  })
  createdAt!: bigint;

  @Column({
    nullable: true,
    type: "bigint",
    transformer: {
      to: (value: number) => {
        if (!!value) {
          return BigInt(value);
        }
        return BigInt(Date.now());
      },
      from: (value: string) => Number(value),
    },
  })
  updatedAt?: bigint;

  @OneToMany(() => BlogModel, (blog: BlogModel) => blog.categoryId)
  blogs: BlogModel[];

  @Column({ default: 0 })
  blogCount: number;

  constructor(params: CategoryModel) {
    this.createdAt = BigInt(Date.now());
    Object.assign(this, params);
  }
}

export default CategoryModel;
