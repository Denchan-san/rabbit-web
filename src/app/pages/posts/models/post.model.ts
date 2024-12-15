export class Post {
  id: number;
  title: string;
  description: string;
  image: string | null 
  threadId?: number;
  userId?: number;
  createdDate: string;
}
