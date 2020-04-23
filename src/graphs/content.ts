export class Content {
    constructor(public title: string,
                public text: string,
                public author: string = 'Anonymous',
                public creationDate: Date = new Date(Date.now())) {
    }
}
