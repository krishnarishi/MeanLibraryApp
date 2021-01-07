export class AuthorModel {

    // tslint:disable-next-line:variable-name
    _id!: string;
    name!: string;
    genre!: string;
    image!: {
        data: string;
        mimetype: string;
        name: string;
    };
}
