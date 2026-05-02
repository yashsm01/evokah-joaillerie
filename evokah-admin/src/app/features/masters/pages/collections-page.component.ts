import { Component } from '@angular/core';

@Component({
  selector: 'app-collections-page',
  template: `<app-master-table
    title="Collections"
    masterType="collections"
    description="Manage top-level product collections (Engagement, Wedding, All)."
    [columns]="cols"
    [fields]="fields">
  </app-master-table>`,
})
export class CollectionsPageComponent {
  cols = [
    { key: 'name',      label: 'Name' },
    { key: 'slug',      label: 'Slug' },
    { key: 'sortOrder', label: 'Order' },
    { key: 'isActive',  label: 'Status', type: 'badge' as const },
  ];
  fields = [
    { key: 'name',      label: 'Name',       required: true },
    { key: 'slug',      label: 'Slug',       required: true },
    { key: 'sortOrder', label: 'Sort Order', type: 'number' as const },
  ];
}
