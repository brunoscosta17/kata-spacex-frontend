import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpacexService } from '../services/spacex';
import * as LaunchActions from './launch.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LaunchEffects {
    private actions$ = inject(Actions);
    private spacexService = inject(SpacexService);

    loadLaunches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LaunchActions.loadLaunches),
            mergeMap(() =>
                this.spacexService.getPastLaunches().pipe(
                    map(launches => LaunchActions.loadLaunchesSuccess({ launches })),
                    catchError(error => of(LaunchActions.loadLaunchesFailure({ error })))
                )
            )
        )
    );
}
