import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import CommentModel from "./comment.model";

export interface BlogModelType {
  title: string;
  content: string;
  authorId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  coverImage?: string;
  seoDescription?: string;
  seoKeywords?: string;
  categoryId?: number;
}

@Entity()
class BlogModel {
  @PrimaryGeneratedColumn()
  id!: number;

  //   标题
  @Column()
  @IsNotEmpty({ message: "标题不能为空" })
  title!: string;

  //   内容
  @Column("text")
  @IsNotEmpty({ message: "内容不能为空" })
  content!: string;

  //   作者id
  @Column({ nullable: true })
  authorId?: number;

  //   创建时间
  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  //   更新时间
  @Column({ nullable: true })
  updatedAt?: Date;

  //   封面图片
  @Column({ nullable: true })
  coverImage?: string;

  //   seo描述
  @Column({ nullable: true })
  @IsNotEmpty({ message: "seo描述不能为空" })
  seoDescription?: string;

  //   seo关键词
  @Column({ nullable: true })
  @IsNotEmpty({ message: "seo关键词不能为空" })
  seoKeywords?: string;

  //   分类id
  @Column({ nullable: true })
  categoryId?: number;

  //   评论
  @OneToMany(() => CommentModel, (comment) => comment.blogId)
  comments?: CommentModel[];

  constructor(blogData: BlogModelType) {
    Object.assign(this, blogData);
  }
}

export default BlogModel;
