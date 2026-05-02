import { Component } from '@angular/core';

@Component({
  selector: 'app-styles-page',
  template: `<app-master-table
    title="Styles"
    masterType="styles"
    description="Manage product styles (Solitaire, Halo, Pavé, Cluster, etc)."
    [columns]="cols"
    [fields]="fields">
  </app-master-table>`,
})
export class StylesPageComponent {
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
