export class BookModel {
    // tslint:disable-next-line:variable-name
    _id!: string;
    title!: string;
    author!: string;
    genre!: string;
    image!: {
        data: string;
        mimetype: string;
        name: string;
    };
}
