import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import CommentModel from "./comment.model";

@Entity()
class BlogModel {
  @PrimaryGeneratedColumn()
  id!: number; // 博客的唯一标识符

  @Column()
  @IsNotEmpty({ message: "标题不能为空" })
  title!: string; // 博客标题

  @Column("text")
  @IsNotEmpty({ message: "内容不能为空" })
  content!: string; // 博客内容

  @Column({ nullable: true })
  authorId?: number; // 作者ID（可选）

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // 博客创建日期

  @Column({ nullable: true })
  updatedAt?: Date; // 博客最后更新日期（可选）

  @Column({ nullable: true })
  coverImage?: string; // 封面图片的URL（可选）

  @Column({ nullable: true })
  @IsNotEmpty({ message: "seo描述不能为空" })
  seoDescription?: string; // 博客的SEO描述（可选）

  @Column({ nullable: true })
  @IsNotEmpty({ message: "seo关键词不能为空" })
  seoKeywords?: string; // 博客的SEO关键词（可选）

  @Column({ nullable: true })
  categoryId?: number; // 分类ID（可选）

  @Column({ nullable: true })
  summary?: string; // 博客摘要（可选）

  @Column("text", { nullable: true })
  tags?: string[]; // 与博客相关的标签数组（可选）

  @Column({ nullable: true })
  accessMode?: string; // 访问模式（例如：公开、私密）（可选）

  @Column({ nullable: true })
  allowReprint?: boolean; // 是否允许转载的标志（可选）

  @Column({ nullable: true })
  isPublic?: boolean; // 是否公开的标志（可选）

  @Column({ nullable: true })
  isPinned?: boolean; // 是否置顶的标志（可选）

  @Column({ nullable: true })
  immediatePublish?: boolean; // 是否立即发布的标志（可选）

  @Column({ nullable: true })
  allowComments?: boolean; // 是否允许评论的标志（可选）

  @OneToMany(() => CommentModel, (comment) => comment.blogId)
  comments?: CommentModel[]; // 与博客相关的评论数组（可选）

  constructor(blogData: BlogModel) {
    Object.assign(this, blogData); // 将博客数据赋值给模型
  }
}

export default BlogModel;
