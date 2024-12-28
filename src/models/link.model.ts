import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export interface LinkProps {
  title: string;
  url: string;
  description?: string;
  isActive: boolean;
}

@Entity()
class Link {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  constructor(props: LinkProps) {
    Object.assign(this, props);
  }
}
export default Link;
