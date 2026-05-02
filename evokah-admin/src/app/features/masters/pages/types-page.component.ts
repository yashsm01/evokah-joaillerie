import { Component } from '@angular/core';

@Component({
  selector: 'app-types-page',
  template: `<app-master-table
    title="Product Types"
    masterType="types"
    description="Manage product types (Ring, Necklace, Earring, Bracelet)."
    [columns]="cols"
    [fields]="fields">
  </app-master-table>`,
})
export class TypesPageComponent {
  cols = [
    { key: 'name',     label: 'Name' },
    { key: 'slug',     label: 'Slug' },
    { key: 'isActive', label: 'Status', type: 'badge' as const },
  ];
  fields = [
    { key: 'name', label: 'Name', required: true },
    { key: 'slug', label: 'Slug', required: true },
  ];
}
