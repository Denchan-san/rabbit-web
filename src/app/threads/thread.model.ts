export class Thread {
    public id: number;
    public title: string;
    public description: string;
    public imageUrl?: string;
    public userId?: number;
    public createdDate: Date;
    public updatedDate: Date;
  
    constructor(
      id: number,
      title: string,
      description: string,
      createdDate: Date,
      updatedDate: Date,
      imageUrl?: string,
      userId?: number
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.imageUrl = imageUrl;
      this.userId = userId;
      this.createdDate = createdDate;
      this.updatedDate = updatedDate;
    }
  }
  