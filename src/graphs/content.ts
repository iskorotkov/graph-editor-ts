export class Content {
  constructor (
    public title: string,
    public text: string,
    public author: string = 'Anonymous',
    public creationDate: Date = new Date(Date.now())
  ) {
    if (creationDate > new Date(Date.now())) {
      throw new RangeError("Creation date can't be in the future")
    }
  }
}
