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
  templateUrl: './launch-detail.html'
})
export class LaunchDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  // Lê o :id da URL de forma síncrona
  private launchId = this.route.snapshot.paramMap.get('id') ?? '';

  // Seletor parametrizado: encontra o lançamento pelo ID dentro da Store
  launch = this.store.selectSignal(selectLaunchById(this.launchId));

  // Seletor de favoritos para verificar o estado da estrela em tempo real
  favoriteIds = this.store.selectSignal(selectFavoriteIds);

  // Signal computado: derivado dos dois sinais acima - recalcula automaticamente se mudar
  isFavorite = computed(() => this.favoriteIds().includes(this.launchId));

  ngOnInit(): void {
    // Segurança: se o ID for inválido ou a store ainda estiver vazia, redireciona para a lista
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
