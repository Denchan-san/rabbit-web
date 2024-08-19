export class Post {
  public id: number;
  public title: string;
  public description: string;
  public threadId?: number;
  public userId?: number;
  public createdDate: Date;
  public updatedDate: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    createdDate: Date,
    updatedDate: Date,
    threadId?: number,
    userId?: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.threadId = threadId;
    this.userId = userId;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
