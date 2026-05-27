import { createReducer, on, ActionReducer, MetaReducer } from '@ngrx/store';
import * as LaunchActions from './launch.actions';
import { Launch } from './launch.model';

export interface LaunchState {
  launches: Launch[];
  favoriteIds: string[];
  loading: boolean;
  error: any;
}

const FAVORITES_STORAGE_KEY = 'spacex_favorite_ids';

function loadInitialFavorites(): string[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }
  } catch {
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

export function localStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);

    try {
      const favoriteIds = nextState?.launch?.favoriteIds;
      if (favoriteIds !== undefined) {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
      }
    } catch {
    }

    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [localStorageMetaReducer];