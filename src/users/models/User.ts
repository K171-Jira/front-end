export default class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    constructor(dto: any) {
        this.id = dto._id;
        this.email = dto.email;
        this.password = dto.password;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
    }
  }