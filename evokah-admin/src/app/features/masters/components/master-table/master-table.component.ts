import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MasterItem, MastersService, MasterType } from '../../../../core/services/masters.service';

export interface ColumnDef {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'color';
}

export interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'color' | 'select';
  required?: boolean;
  options?: { value: any; label: string }[];
}

@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss']
})
export class MasterTableComponent implements OnInit {
  @Input() title = '';
  @Input() masterType!: MasterType;
  @Input() columns: ColumnDef[] = [];
  @Input() fields: FieldDef[] = [];
  @Input() description = '';

  @ViewChild('dialogTpl') dialogTpl!: TemplateRef<any>;

  items: MasterItem[] = [];
  filteredItems: MasterItem[] = [];
  loading = true;
  saving = false;
  editingId: string | number | null = null;
  searchQuery = '';

  form!: FormGroup;
  dialogRef?: MatDialogRef<any>;

  displayedColumns: string[] = [];

  constructor(
    private svc: MastersService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.displayedColumns = [...this.columns.map(c => c.key), 'actions'];
    this.buildForm();
    this.load();
  }

  buildForm(): void {
    const controls: any = {};
    this.fields.forEach(f => {
      controls[f.key] = [null, f.required ? Validators.required : []];
    });
    this.form = this.fb.group(controls);
  }

  load(): void {
    this.loading = true;
    this.svc.getAll(this.masterType).subscribe({
      next: (data: any) => {
        this.items = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.snack.open('Failed to load data', 'Dismiss', { duration: 4000 });
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredItems = q
      ? this.items.filter(i => i.name?.toLowerCase().includes(q) || i.slug?.toLowerCase().includes(q))
      : [...this.items];
  }

  openAdd(): void {
    this.editingId = null;
    this.form.reset();
    this.dialogRef = this.dialog.open(this.dialogTpl, { width: '500px', disableClose: true });
  }

  openEdit(item: MasterItem): void {
    this.editingId = item.id;
    const val: any = {};
    this.fields.forEach(f => { val[f.key] = (item as any)[f.key]; });
    this.form.reset(val);
    this.dialogRef = this.dialog.open(this.dialogTpl, { width: '500px', disableClose: true });
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    const payload = this.form.value;
    const op = this.editingId
      ? this.svc.update(this.masterType, this.editingId, payload)
      : this.svc.create(this.masterType, payload);

    op.subscribe({
      next: () => {
        this.snack.open(this.editingId ? 'Updated successfully' : 'Created successfully', '✓', { duration: 3000 });
        this.dialogRef?.close();
        this.saving = false;
        this.load();
      },
      error: (err: any) => {
        this.snack.open(err.error?.message || 'Operation failed', 'Dismiss', { duration: 4000 });
        this.saving = false;
      }
    });
  }

  confirmDelete(item: MasterItem): void {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    this.svc.delete(this.masterType, item.id).subscribe({
      next: () => {
        this.snack.open('Deleted successfully', '✓', { duration: 3000 });
        this.load();
      },
      error: (err: any) => this.snack.open(err.error?.message || 'Delete failed', 'Dismiss', { duration: 4000 })
    });
  }

  toggleActive(item: MasterItem): void {
    this.svc.update(this.masterType, item.id, { isActive: !item.isActive }).subscribe({
      next: () => { item.isActive = !item.isActive; },
      error: () => this.snack.open('Failed to update status', 'Dismiss', { duration: 3000 })
    });
  }

  trackById(_: number, item: MasterItem) { return item.id; }
}
