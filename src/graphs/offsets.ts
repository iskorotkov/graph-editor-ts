export class Offsets {
  constructor (public top: number = 0, public left: number = 0) {
    if (top < 0 || left < 0) {
      throw new RangeError("Offsets can't be negative")
    }
  }
}
