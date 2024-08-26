class User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public avatarUrl: string;
  public dataTimeCreated: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    avatarUrl: string,
    dataTimeCreated: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.dataTimeCreated = dataTimeCreated;
  }
}
