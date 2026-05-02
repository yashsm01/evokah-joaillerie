import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  basePrice: number;
  description: string;
  isActive: boolean;
  isFeatured: boolean;
  collectionId?: string;
  typeId?: string;
  
  // Media
  media?: any[];
  videoUrl?: string;
  model3dUrl?: string;

  // Masters
  metals?: any[];
  shapes?: any[];
}

@Injectable({ providedIn: 'root' })
export class AdminProductService {
  private base = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AdminProduct[]> {
    // Note: this should probably use a paginated admin-specific endpoint. 
    // Using standard endpoint for now, assuming standard endpoint returns basic array.
    return this.http.get<AdminProduct[]>(this.base);
  }

  getById(id: string): Observable<AdminProduct> {
    return this.http.get<AdminProduct>(`${this.base}/${id}`);
  }

  create(data: any): Observable<AdminProduct> {
    return this.http.post<AdminProduct>(this.base, data);
  }

  update(id: string, data: any): Observable<AdminProduct> {
    return this.http.put<AdminProduct>(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  // Upload endpoints would go here if there are separate endpoints for media
  // or it could be handled via FormData directly in create/update.
}
