import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError, of, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private products = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(d => this.mapToFrontendProduct(d))),
      tap(mapped => this.products.next(mapped)),
      catchError(() => of([]))
    );
  }

  getBySlug(slug: string): Observable<Product | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${slug}`).pipe(
      map(data => data ? this.mapToFrontendProduct(data) : undefined),
      catchError(() => of(undefined))
    );
  }

  // Synchronous fallback for related products if already loaded
  getAll(): Product[] { 
    return this.products.value; 
  }
  
  private mapToFrontendProduct(p: any): Product {
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      basePrice: Number(p.basePrice),
      tag: p.tag,
      collection: p.collection?.slug || 'engagement',
      type: p.type?.slug || 'ring',
      category: p.category?.name || '',
      style: p.style?.slug || 'all',
      priceGroup: p.priceGroup?.slug || 'under3000',
      metals: p.metals?.map((m: any) => m.code) || [],
      shapes: p.shapes?.map((s: any) => s.slug) || [],
      img: p.media?.find((m: any) => m.isPrimary && m.mediaType === 'image')?.url || p.media?.find((m: any) => m.mediaType === 'image')?.url || '',
      images: p.media?.filter((m: any) => m.mediaType === 'image').map((m: any) => m.url) || [],
      modelUrl: p.media?.find((m: any) => m.mediaType === '3d_model')?.url || undefined,
    };
  }
}
