export class Thread {
    public id: number;
    public title: string;
    public description: string;
    public imageUrl?: string;
    public user?: any;
    public userId?: number;
  
    constructor(
      id: number,
      title: string,
      description: string,
      imageUrl?: string,
      user?: any,
      userId?: number
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.imageUrl = imageUrl;
      this.user = user;
      this.userId = userId;
    }
  }
  