export class Thread {
    public id: number;
    public title: string;
    public description: string;
    public image?: string;
    public userId?: number;
  
    constructor(
      id: number,
      title: string,
      description: string,
      image?: string,
      userId?: number
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.image = image;
      this.userId = userId;
    }
  }
  