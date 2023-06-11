import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface UserInfo{
  name: string;
  type: string;
}


@Injectable({
  providedIn: 'root'
})
  
export class AuthService {

  public API: string = 'http://localhost:3000';
  public isAuthenticated: boolean = false;
  public userType?: string;
  public user: any = {}

  constructor(private router: Router) { }


  

  getUserObject() {
    localStorage.getItem('user')
  }

  async getUserFromStorage(): Promise<UserInfo | null> {
    const userInfo = localStorage.getItem('user-info')
    if (userInfo) {
      return await JSON.parse(userInfo)
    } else {
      return null;
      // try to fetch
      // if not work logout
    }
  }

  isLoggedIn(): boolean {
    // return false
    console.log(localStorage.getItem('access_token'))
    return !!localStorage.getItem('access_token');
  }

  saveToken(token: string): void{
    localStorage.setItem('access_token', `Bearer ${token}`)
  }


  getUserInfo(): any {
      const cookieValue = document.cookie.split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith('user='))
        ?.split('=')[1];
    return cookieValue
  }

  getAuthCookie() {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('access_token=')) {
          return cookie.substring('access_token='.length, cookie.length);
        }
      }
      return '';
  }

  getToken(): any{
    return localStorage.getItem('access_token')
  }

  saveType(type: string): void{
    localStorage.setItem('type', type)
  }

  getType(): string | null {
    const type = localStorage.getItem('type');
    if (type) return type;
    return null;
  }

  logout(): void {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('access_token');
    localStorage.removeItem('user-info');
    this.router.navigateByUrl('/login')
  }

  test_id: string | null = null
  test_name: string | null = null
  saveTest(ong_id?: string | null, ong_name?: string | null) {
    this.test_id = ong_id || null;
    this.test_name = ong_name || null; 
  }
  getTest() {
    return { ong_id: this.test_id, ong_name: this.test_name };
  }

}
