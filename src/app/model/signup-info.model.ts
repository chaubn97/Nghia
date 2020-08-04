export class SignupInfoModel {
  cinemaId:number;
  managerUsername: string;
  managerPassword: string;
  managerName: string;
  roles: string[];

  constructor(cinemaId: number, managerUsername: string, managerPassword: string, managerName: string, any: any) {
    this.cinemaId = cinemaId;
    this.managerUsername = managerUsername;
    this.managerPassword = managerPassword;
    this.managerName = managerName;
    this.roles = [];
  }
}
