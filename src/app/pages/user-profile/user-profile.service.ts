import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserToFetch } from '../../shared/auth/models/user.model';


@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private http: HttpClient) {}

  fetchUser(id: number) {
    return this.http.get<UserToFetch>(`http://localhost:8080/users/${id}`);
  }

  updateUser(
    id: number,
    updates: { username?: string; email?: string; password?: string; image?: string }
  ) {
    const payload: any = {};
  
    if (updates.username) payload.username = updates.username;
    if (updates.email) payload.email = updates.email;
    if (updates.password) payload.password = updates.password;
    if (updates.image) payload.image = updates.image;
  
    console.log(id, payload);
  
    return this.http.put(`http://localhost:8080/users/${id}`, payload);
  }
  
}
