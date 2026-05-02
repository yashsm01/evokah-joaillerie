import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { AdminProductService } from '../../../core/services/admin-product.service';
import { MastersService } from '../../../core/services/masters.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  productId: string | null = null;
  loading = true;
  saving = false;

  // Taxonomy data for dropdowns
  collections: any[] = [];
  types: any[] = [];
  metals: any[] = [];
  shapes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: AdminProductService,
    private mastersService: MastersService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId === 'new') this.productId = null;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      sku: ['', Validators.required],
      basePrice: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      collectionId: [null],
      typeId: [null],
      metals: [[]],
      shapes: [[]],
      isActive: [true],
      isFeatured: [false]
    });
  }

  loadData(): void {
    this.loading = true;

    // Load taxonomy data
    const requests: any = {
      collections: this.mastersService.getAll('collections'),
      types: this.mastersService.getAll('types'),
      metals: this.mastersService.getAll('metals'),
      shapes: this.mastersService.getAll('shapes')
    };

    if (this.productId) {
      requests.product = this.productService.getById(this.productId);
    }

    forkJoin(requests).subscribe({
      next: (res: any) => {
        this.collections = res.collections;
        this.types = res.types;
        this.metals = res.metals;
        this.shapes = res.shapes;

        if (res.product) {
          // Map product data to form. Adjust based on your actual backend response structure.
          const p = res.product;
          this.form.patchValue({
            name: p.name,
            slug: p.slug,
            sku: p.sku,
            basePrice: p.basePrice,
            description: p.description,
            collectionId: p.collectionId,
            typeId: p.typeId,
            metals: p.metals?.map((m: any) => m.id) || [],
            shapes: p.shapes?.map((s: any) => s.id) || [],
            isActive: p.isActive,
            isFeatured: p.isFeatured
          });
        }
        this.loading = false;
      },
      error: () => {
        this.snack.open('Error loading form data', 'Dismiss', { duration: 4000 });
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const data = this.form.value;

    const op = this.productId
      ? this.productService.update(this.productId, data)
      : this.productService.create(data);

    op.subscribe({
      next: () => {
        this.snack.open(this.productId ? 'Product updated' : 'Product created', '✓', { duration: 3000 });
        this.router.navigate(['/dashboard/products']);
      },
      error: (err) => {
        this.snack.open(err.error?.message || 'Failed to save product', 'Dismiss', { duration: 4000 });
        this.saving = false;
      }
    });
  }

  generateSlug(): void {
    const name = this.form.get('name')?.value;
    if (name && !this.form.get('slug')?.value) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      this.form.get('slug')?.setValue(slug);
    }
  }
}
