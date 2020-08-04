export class RegisterModel {
    managerId? : number;
    managerUsername?: string;
    managerPassword?: string;
    cinemaId?: number;
    cinemaName?: string;
    managerName?: string;
    roles: string[];


    constructor(managerId: number, managerUsername: string, managerPassword: string, cinemaId: number, cinemaName: string, managerName: string, roles: string[]) {
        this.managerId = managerId;
        this.managerUsername = managerUsername;
        this.managerPassword = managerPassword;
        this.cinemaId = cinemaId;
        this.cinemaName = cinemaName;
        this.managerName = managerName;
        this.roles = ['STAFF'];
    }
}
