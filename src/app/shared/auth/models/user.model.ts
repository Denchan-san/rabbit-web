export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public avatar: string,
    private _token: string,
    private _tokenExparationDate: Date
  ) {}

  get token() {
    if (!this._tokenExparationDate || new Date() > this._tokenExparationDate) {
      return null;
    }

    return this._token;
  }
}
