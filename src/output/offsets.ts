export class Offsets {
    constructor(public left: number = 0,
                public top: number = 0,
                public right: number = 0,
                public bottom: number = 0) {
        if (left < 0 || top < 0 || right < 0 || bottom < 0) {
            throw new RangeError('Offsets can\'t be negative')
        }
    }
}