export class CreateThread {
    public title: string;
    public description: string;
    public image?: string;
    public userId?: string;
  
    constructor(
      title: string,
      description: string,
      image?: string,
      userId?: string
    ) {
      this.title = title;
      this.description = description;
      this.image = image;
      this.userId = userId;
    }
  }
  