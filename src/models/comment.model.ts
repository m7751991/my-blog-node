// src/models/comment.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import UserModel from "./user.model"; // 引入用户模型
import BlogModel from "./blog.model";

@Entity()
class CommentModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  comments!: string;

  @ManyToOne(() => BlogModel, (blog) => blog.comments) // 修正为 blog
  blogId!: BlogModel; // 更改为 blog

  @ManyToOne(() => UserModel, (user) => user.comments) // 关联用户模型
  author!: UserModel;

  @Column({ nullable: true }) // 允许为空，表示不是所有评论都有父评论
  parentId?: number; // 回复的父评论 ID

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ default: true })
  status!: boolean;
}

export default CommentModel;
