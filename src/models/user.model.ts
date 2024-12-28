import { IsNotEmpty } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import CommentModel from "./comment.model";

export interface UserModelType {
  username: string;
  password: string;
  email?: string;
  isAdmin: boolean;
}

@Entity()
class UserModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "用户名不能为空" })
  username!: string;

  @Column()
  @IsNotEmpty({ message: "密码不能为空" })
  password!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: false })
  @IsNotEmpty({ message: "是否为管理员不能为空" })
  isAdmin!: boolean;

  @OneToMany(() => CommentModel, (comment) => comment.author)
  comments!: CommentModel[];

  constructor(props: UserModelType) {
    Object.assign(this, props);
  }
}

export default UserModel;
