export class Dimensions {
  constructor (public height: number = 0, public width: number = 0) {
    if (height < 0 || width < 0) {
      throw new RangeError("Height or width can't be negative")
    }
  }
}
