export interface blogInterface {
  id?: number | string;
  userId?: number;
  title?: string;
  content?: string;
  image?: string | null;  // image có thể null nếu không có ảnh
  status?: string;  // 'draft' hoặc 'public'
  createAt?: Date;
}