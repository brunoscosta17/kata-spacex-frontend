import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { selectLaunchById, selectFavoriteIds } from '../../state/launch.selectors';
import { toggleFavorite } from '../../state/launch.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-launch-detail',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './launch-detail.html',
  styleUrl: './launch-detail.scss'
})
export class LaunchDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  private launchId = this.route.snapshot.paramMap.get('id') ?? '';

  launch = this.store.selectSignal(selectLaunchById(this.launchId));

  favoriteIds = this.store.selectSignal(selectFavoriteIds);

  isFavorite = computed(() => this.favoriteIds().includes(this.launchId));

  ngOnInit(): void {
    if (!this.launchId) {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  toggleFavorite(): void {
    this.store.dispatch(toggleFavorite({ id: this.launchId }));
  }
}
