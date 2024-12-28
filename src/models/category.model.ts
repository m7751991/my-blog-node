import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class CategoryModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ nullable: true })
  updatedAt?: Date;
}

export default CategoryModel;
