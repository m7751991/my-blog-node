import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import CommentModel from "./comment.model";
import CategoryModel from "./category.model";

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

  @Column({
    type: "bigint",
    transformer: {
      // 插入时转换为 bigint
      to: (value: number) => {
        if (!!value) {
          return BigInt(value);
        }
        return BigInt(Date.now());
      },
      from: (value: string) => Number(value), // 查询时转换为数字
    },
  })
  createdAt!: number; // 将类型更改为 number，以存储时间戳

  @Column({
    nullable: true,
    type: "bigint",
    transformer: {
      // 插入时转换为 bigint
      to: (value: number) => {
        if (!!value) {
          return BigInt(value);
        }
        return null;
      },
      from: (value: string) => Number(value), // 查询时转换为数字
    },
  })
  updatedAt?: number;

  @Column({ nullable: true, default: false })
  hot: boolean; // 是否为热门博客的标志

  @Column({ nullable: true, default: 0 })
  views: number; // 观看次数

  @Column({ nullable: true, default: 0 })
  likes: number; // 点赞次数

  @Column({ nullable: true })
  coverImage?: string; // 封面图片的URL（可选）

  @Column({ nullable: true })
  @IsNotEmpty({ message: "seo描述不能为空" })
  seoDescription: string; // 博客的SEO描述

  @Column({ nullable: true })
  @IsNotEmpty({ message: "seo关键词不能为空" })
  seoKeywords: string; // 博客的SEO关键词

  @Column({ nullable: true })
  categoryId: number; // 关联的类别

  @Column({ nullable: true })
  categoryName: string; // 关联的类别

  //   @ManyToOne(() => CategoryModel, (category: CategoryModel) => category.blogs, { nullable: true })
  //   category: CategoryModel; // 类别实体关系

  @Column({ nullable: true })
  summary: string; // 博客摘要（可选）

  @Column({ nullable: true })
  tags?: string; // 与博客相关的标签数组

  @Column()
  allowReprint: boolean; // 是否允许转载的标志

  @Column()
  isPublic: boolean; // 是否公开的标志

  @Column()
  isPinned: boolean; // 是否置顶的标志

  @Column()
  allowComments: boolean; // 是否允许评论的标志

  @Column({ nullable: true })
  status: number; // 博客状态

  @Column({ nullable: true })
  statusText: string; // 博客状态text

  @OneToMany(() => CommentModel, (comment) => comment.blogId)
  comments?: CommentModel[]; // 与博客相关的评论数组（可选）

  constructor(blogData: BlogModel) {
    Object.assign(this, blogData); // 将博客数据赋值给模型
  }
}

export default BlogModel;
