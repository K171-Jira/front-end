export default class SignupData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    constructor(dto: any) {
        this.email = dto.email;
        this.password = dto.password;
        this.confirmPassword = dto.confirmPassword;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
    }
}