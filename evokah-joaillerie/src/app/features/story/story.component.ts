import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent {

  values = [
    {
      icon: '✦',
      title: 'Intention',
      desc: 'Every piece begins with a conversation. We listen before we design, ensuring each creation carries personal meaning.',
    },
    {
      icon: '◈',
      title: 'Craftsmanship',
      desc: 'Hand-finished by master artisans with decades of experience. No two pieces are exactly alike — perfection is personal.',
    },
    {
      icon: '❋',
      title: 'Ethics',
      desc: 'Conflict-free diamonds, recycled precious metals, and sustainable sourcing. Luxury should never cost the earth.',
    },
    {
      icon: '◇',
      title: 'Legacy',
      desc: 'We craft jewellery to outlast generations. Each piece is designed to be inherited, not discarded.',
    },
  ];

  milestones = [
    { year: '2015', title: 'Founded in Surat', desc: 'Evokah was born in the diamond capital of the world with a single vision — jewellery that tells your story.' },
    { year: '2017', title: 'First Bridal Collection', desc: 'Launched our signature engagement and bridal line, earning recognition from leading luxury publications.' },
    { year: '2019', title: 'Ethical Sourcing Pledge', desc: 'Became fully conflict-free certified and transitioned to 100% recycled gold and platinum.' },
    { year: '2021', title: 'Digital Atelier', desc: 'Introduced our 3D design consultation service, allowing clients worldwide to co-create their perfect piece.' },
    { year: '2023', title: 'International Expansion', desc: 'Opened private consultation rooms in Toronto, Dubai, and Singapore.' },
    { year: '2025', title: 'Evokah Today', desc: 'Over 4,000 bespoke pieces crafted. Every one a story. Every one forever.' },
  ];

  stats = [
    { number: '4,000+', label: 'Bespoke Pieces Crafted' },
    { number: '98%',    label: 'Client Satisfaction' },
    { number: '10+',    label: 'Years of Excellence' },
    { number: '100%',   label: 'Ethically Sourced' },
  ];
}
