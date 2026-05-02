import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';
import { MOCK_PRODUCTS } from '../data/products.mock';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  /** Fetch all products — uses mock when environment.useMockData = true */
  getProducts(): Observable<Product[]> {
    if (environment.useMockData) {
      return of(MOCK_PRODUCTS);
    }
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(catchError(() => of(MOCK_PRODUCTS)));
  }

  /** Fetch single product by ID */
  getProduct(id: number): Observable<Product | undefined> {
    if (environment.useMockData) {
      return of(MOCK_PRODUCTS.find(p => p.id === id));
    }
    return this.http
      .get<Product>(`${this.apiUrl}/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  /** Synchronous helpers for product detail (mock-only) */
  getAll(): Product[] { return MOCK_PRODUCTS; }
  getBySlug(slug: string): Product | undefined { return MOCK_PRODUCTS.find(p => p.slug === slug); }
  getById(id: number): Product | undefined { return MOCK_PRODUCTS.find(p => p.id === id); }
}
