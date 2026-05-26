import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Launch } from '../../state/launch.model';
import { Store } from '@ngrx/store';
import { selectAllLaunches } from '../../state/launch.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadLaunches } from '../../state/launch.actions';


@Component({
  selector: 'app-launches-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatChipsModule, MatButtonModule],
  templateUrl: './launches-list.html'
})
export class LaunchesListComponent implements OnInit {
  allLaunches: Launch[] = [];
  filteredLaunches: Launch[] = [];
  searchTerm: string = '';

  constructor(private store: Store) {
    this.store.select(selectAllLaunches).pipe(
      takeUntilDestroyed()
    ).subscribe(launches => {
      this.allLaunches = launches;
      this.filteredLaunches = launches;
      this.onSearchChange();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadLaunches());
  }

  onSearchChange() {
    this.filteredLaunches = this.allLaunches.filter(launch =>
      launch.name.includes(this.searchTerm.toLowerCase())
    );
  }
}