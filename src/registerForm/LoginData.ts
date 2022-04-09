export default class LoginData {
  email: string;
  password: string;
  constructor(dto: any) {
    this.email = dto.email;
    this.password = dto.password;
  }
}
