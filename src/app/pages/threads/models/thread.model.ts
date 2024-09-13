export class Thread {
    public id: number;
    public title: string;
    public description: string;
    public imageUrl?: string;
    public userId?: number;
  
    constructor(
      id: number,
      title: string,
      description: string,
      imageUrl?: string,
      userId?: number
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.imageUrl = imageUrl;
      this.userId = userId;
    }
  }
  