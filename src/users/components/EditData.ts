export default class EditData {
    email: string;
    firstName: string;
    lastName: string;
    constructor(dto: any) {
        this.email = dto.email;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
    }
}