import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminProduct, AdminProductService } from '../../../core/services/admin-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: AdminProduct[] = [];
  filteredProducts: AdminProduct[] = [];
  loading = true;
  searchQuery = '';

  displayedColumns: string[] = ['image', 'sku', 'name', 'price', 'status', 'featured', 'actions'];

  constructor(
    private productService: AdminProductService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.snack.open('Failed to load products', 'Dismiss', { duration: 4000 });
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredProducts = q
      ? this.products.filter(p => p.name?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q))
      : [...this.products];
  }

  deleteProduct(product: AdminProduct): void {
    if (!confirm(`Delete product "${product.name}"? This cannot be undone.`)) return;
    
    this.productService.delete(product.id).subscribe({
      next: () => {
        this.snack.open('Product deleted', '✓', { duration: 3000 });
        this.loadProducts();
      },
      error: (err) => {
        this.snack.open('Failed to delete product', 'Dismiss', { duration: 4000 });
      }
    });
  }

  toggleActive(product: AdminProduct): void {
    const newStatus = !product.isActive;
    this.productService.update(product.id, { isActive: newStatus }).subscribe({
      next: () => {
        product.isActive = newStatus;
        this.snack.open(`Product ${newStatus ? 'activated' : 'deactivated'}`, '✓', { duration: 2000 });
      },
      error: () => this.snack.open('Failed to update status', 'Dismiss', { duration: 3000 })
    });
  }
}
