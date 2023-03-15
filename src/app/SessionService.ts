import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  public setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public getItem(key: string): any {
    return sessionStorage.getItem(key);
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clear(): void {
    sessionStorage.clear();
  }
}
