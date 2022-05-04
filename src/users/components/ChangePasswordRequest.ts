export default class ChangePasswordRequest {
    id: string;
    password: string;
    newPassword: string;
    constructor(dto: any) {
        this.id = dto._id;
        this.password = dto.password;
        this.newPassword = dto.newPassword;
    }
}