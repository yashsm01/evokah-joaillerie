import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user$ = this.authService.user$;
  today = new Date();

  stats = [
    { icon: 'inventory_2',  label: 'Total Products',    value: '—',  iconBg: 'rgba(59,130,246,.1)',   iconColor: '#3b82f6', trend: 0 },
    { icon: 'collections',  label: 'Collections',        value: '—',  iconBg: 'rgba(212,175,55,.12)',  iconColor: '#b8960c', trend: 0 },
    { icon: 'category',     label: 'Metal Types',         value: '—',  iconBg: 'rgba(168,85,247,.1)',   iconColor: '#a855f7', trend: 0 },
    { icon: 'stars',        label: 'Active Reviews',      value: '—',  iconBg: 'rgba(34,197,94,.1)',    iconColor: '#22c55e', trend: 0 },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
