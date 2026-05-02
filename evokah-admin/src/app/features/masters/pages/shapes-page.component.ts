import { Component } from '@angular/core';

@Component({
  selector: 'app-shapes-page',
  template: `<app-master-table
    title="Shapes"
    masterType="shapes"
    description="Manage diamond/gemstone shapes (Round, Oval, Emerald, Pear, etc)."
    [columns]="cols"
    [fields]="fields">
  </app-master-table>`,
})
export class ShapesPageComponent {
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
