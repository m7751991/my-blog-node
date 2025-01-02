export interface CategorySearchDataType {
  name?: string;
  id?: number;
}

export interface CategoryModelType {
  id: number;
  name: string;
  description?: string;
  createdAt: bigint;
  updatedAt?: bigint;
  blogs: BlogModel[];
  blogCount: number;
}
