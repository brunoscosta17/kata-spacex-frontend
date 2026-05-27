import { createReducer, on, ActionReducer, MetaReducer } from '@ngrx/store';
import * as LaunchActions from './launch.actions';
import { Launch } from './launch.model';

export interface LaunchState {
  launches: Launch[];
  favoriteIds: string[];
  loading: boolean;
  error: any;
}

// Chave usada no localStorage para armazenar os IDs favoritos
const FAVORITES_STORAGE_KEY = 'spacex_favorite_ids';

// Carrega os favoritos do localStorage de forma segura na inicialização do estado
function loadInitialFavorites(): string[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }
  } catch {
    // Silencia erros de acesso a localStorage
  }
  return [];
}

export const initialState: LaunchState = {
  launches: [],
  favoriteIds: loadInitialFavorites(),
  loading: false,
  error: null
};

export const launchReducer = createReducer(
  initialState,
  on(LaunchActions.loadLaunches, state => ({ ...state, loading: true })),
  on(LaunchActions.loadLaunchesSuccess, (state, { launches }) => ({ ...state, loading: false, launches })),
  on(LaunchActions.loadLaunchesFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(LaunchActions.toggleFavorite, (state, { id }) => {
    const isFavorite = state.favoriteIds.includes(id);
    const favoriteIds = isFavorite
      ? state.favoriteIds.filter(favId => favId !== id)
      : [...state.favoriteIds, id];
    return { ...state, favoriteIds };
  })
);

/**
 * Meta-Reducer: intercepta TODAS as actions depois que o reducer as processa.
 * Após cada mudança de estado, persiste automaticamente o array favoriteIds
 * no localStorage. Não precisa de Effects, Subjects nem Observables para isso.
 *
 * Meta-Reducers são funções de ordem superior: recebem um reducer e retornam
 * um novo reducer com comportamento adicional (similar ao padrão Decorator).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    // Deixa o reducer original calcular o próximo estado
    const nextState = reducer(state, action);

    // Acessa a fatia 'launch' do estado global para persistir os favoriteIds
    try {
      const favoriteIds = nextState?.launch?.favoriteIds;
      if (favoriteIds !== undefined) {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
      }
    } catch {
      // Silencia erros de quota ou modo privado do navegador
    }

    return nextState;
  };
}

// MetaReducer<any> é o tipo correto quando registrado em provideStore() no nível raiz
export const metaReducers: MetaReducer<any>[] = [localStorageMetaReducer];