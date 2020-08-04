import { Injectable } from '@angular/core';
const TOKEN_KEY = 'id_token';
const MANAGER_KEY = 'manager-key';
const USERNAME_KEY = 'Authusername';
const AUTHORITIES_KEY = 'auth';
const ROLE_KEY = 'rolekey';
const ID_KEY = 'AuthUserId';
const MANAGER_USERNAME_KEY = 'MANAGER_USERNAME';
const MANAGER_NAME_KEY = 'MANAGER_NAME';
const PASSWORD_KEY = 'MANAGER_PASSWORD';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: Array<string> = [];

  constructor() { }

  signOut() {window.sessionStorage.clear(); }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRole(role: string) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }
  public  getRole(): string {
    return sessionStorage.getItem(ROLE_KEY);
  }
  public getPassword(): string {
    return sessionStorage.getItem(PASSWORD_KEY);
  }
  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      try {
        JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
          this.roles.push(authority);
        });
      }catch (e) {
        console.log(e);
      }
    }
    return this.roles;
  }
  public getUserId(): string {
    return sessionStorage.getItem(ID_KEY);
  }
  public saveUserId(userId: string) {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, userId);
  }
  public getManagerUsername(): string {
    return sessionStorage.getItem(MANAGER_USERNAME_KEY);
  }
  public saveManagerUsername(managerUsername: string) {
   window.sessionStorage.removeItem(MANAGER_USERNAME_KEY);
   window.sessionStorage.setItem(MANAGER_USERNAME_KEY, managerUsername);
  }
  public getManagername(): string {
    return sessionStorage.getItem(MANAGER_NAME_KEY);
  }
  public saveManagerName(managerName: string) {
    window.sessionStorage.removeItem(MANAGER_NAME_KEY);
    window.sessionStorage.setItem(MANAGER_NAME_KEY, managerName);
  }



  public saveManager(manager) {
    window.sessionStorage.removeItem(MANAGER_KEY);
    window.sessionStorage.setItem(MANAGER_KEY, JSON.stringify(manager));
  }

  public getManager() {
    return JSON.parse(sessionStorage.getItem(MANAGER_KEY));
  }
}
