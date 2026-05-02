import { Component } from '@angular/core';

@Component({
  selector: 'app-metals-page',
  template: `<app-master-table
    title="Metals"
    masterType="metals"
    description="Manage metal options (Yellow Gold, White Gold, Rose Gold, Platinum)."
    [columns]="cols"
    [fields]="fields">
  </app-master-table>`,
})
export class MetalsPageComponent {
  cols = [
    { key: 'name',         label: 'Name' },
    { key: 'code',         label: 'Code' },
    { key: 'hexColor',     label: 'Colour',  type: 'color' as const },
    { key: 'metalPremium', label: 'Premium ($)' },
    { key: 'isActive',     label: 'Status',  type: 'badge' as const },
  ];
  fields = [
    { key: 'name',         label: 'Name',          required: true },
    { key: 'code',         label: 'Code',           required: true },
    { key: 'hexColor',     label: 'Hex Colour',     type: 'color' as const },
    { key: 'metalPremium', label: 'Premium ($)',     type: 'number' as const },
  ];
}
