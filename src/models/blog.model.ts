import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import CommentModel from "./comment.model";

@Entity()
class BlogModel {
  @PrimaryGeneratedColumn()
  id!: number;

  //   标题
  @Column()
  title!: string;

  //   内容
  @Column("text")
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
  seoDescription?: string;

  //   seo关键词
  @Column({ nullable: true })
  seoKeywords?: string;

  //   分类id
  @Column({ nullable: true })
  categoryId?: number;

  //   评论
  @OneToMany(() => CommentModel, (comment) => comment.blogId)
  comments!: CommentModel[];
}

export default BlogModel;
