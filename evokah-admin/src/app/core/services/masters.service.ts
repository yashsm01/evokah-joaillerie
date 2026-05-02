import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface MasterItem {
  id: string | number;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder?: number;
  collectionId?: string;
  hexColor?: string;
  metalPremium?: number;
  code?: string;
  minPrice?: number;
  maxPrice?: number;
  label?: string;
}

export type MasterType = 'collections' | 'metals' | 'styles' | 'shapes' | 'types' | 'categories' | 'price-groups';

@Injectable({ providedIn: 'root' })
export class MastersService {
  private base = `${environment.apiUrl}/api/masters`;

  constructor(private http: HttpClient) {}

  getAll(type: MasterType): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/${type}`);
  }

  create(type: MasterType, payload: Partial<MasterItem>): Observable<any> {
    return this.http.post<any>(`${this.base}/${type}`, payload);
  }

  update(type: MasterType, id: string | number, payload: Partial<MasterItem>): Observable<any> {
    return this.http.put<any>(`${this.base}/${type}/${id}`, payload);
  }

  delete(type: MasterType, id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.base}/${type}/${id}`);
  }
}
