import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { selectAllLaunches, selectFavoriteIds } from '../../state/launch.selectors';
import { loadLaunches, toggleFavorite } from '../../state/launch.actions';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-launches-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatChipsModule, MatButtonModule, RouterModule],
  templateUrl: './launches-list.html',
  styleUrl: './launches-list.scss'
})
export class LaunchesListComponent implements OnInit {

  private store = inject(Store);

  allLaunches = this.store.selectSignal(selectAllLaunches);
  favoriteIds = this.store.selectSignal(selectFavoriteIds);
  searchTerm = signal('');
  filterType = signal<'all' | 'favorites' | 'success' | 'failed'>('all');

  searchControl = new FormControl('');

  filteredLaunches = computed(() => {
    let launches = this.allLaunches();
    const currentFilter = this.filterType();
    if (currentFilter === 'favorites') {
      const favs = this.favoriteIds();
      launches = launches.filter(l => favs.includes(l.id));
    } else if (currentFilter === 'success') {
      launches = launches.filter(l => l.success === true);
    } else if (currentFilter === 'failed') {
      launches = launches.filter(l => l.success === false);
    }

    const search = this.searchTerm().toLowerCase().trim();
    if (!search) return launches;
    return launches.filter(launch => launch.name.toLowerCase().includes(search));
  });

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(value => {
      this.searchTerm.set(value ?? '');
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadLaunches());
  }

  setFilter(type: 'all' | 'favorites' | 'success' | 'failed'): void {
    this.filterType.set(type);
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds().includes(id);
  }

  toggleFavorite(id: string) {
    this.store.dispatch(toggleFavorite({ id }));
  }
}