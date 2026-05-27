import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { selectAllLaunches, selectFavoriteIds } from '../../state/launch.selectors';
import { loadLaunches, toggleFavorite } from '../../state/launch.actions';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-launches-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatChipsModule, MatButtonModule, RouterModule],
  templateUrl: './launches-list.html'
})
export class LaunchesListComponent implements OnInit {

  private store = inject(Store);
  private router = inject(Router);

  allLaunches = this.store.selectSignal(selectAllLaunches);
  favoriteIds = this.store.selectSignal(selectFavoriteIds);
  searchTerm = signal('');

  filteredLaunches = computed(() => {
    const launches = this.allLaunches();
    const search = this.searchTerm().toLowerCase();
    return launches.filter(launch => launch.name.toLowerCase().includes(search));
  });


  ngOnInit(): void {
    this.store.dispatch(loadLaunches());
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds().includes(id);
  }

  toggleFavorite(id: string) {
    this.store.dispatch(toggleFavorite({ id }));
  }
}