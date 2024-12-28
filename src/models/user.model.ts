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
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @OneToMany(() => CommentModel, (comment) => comment.author)
  comments!: CommentModel[];

  constructor(props: UserModelType) {
    Object.assign(this, props);
  }
}

export default UserModel;
