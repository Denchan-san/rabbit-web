export class Thread {
    public id: string;
    public title: string;
    public description: string;
    public imageUrl?: string;
    public user?: any;
    public userId?: number;
  
    constructor(
      id: string,
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
  