export class Commentary {
    id: number;
    content: string;
    postId: number;
    userId: number;
    commentaryToId: number | null;
    createdDate: string;
    updatedDate: string | null;
}