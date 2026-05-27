import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { launchReducer } from '../../state/launch.reducer';
import { LaunchesListComponent } from './launches-list';

describe('LaunchesList', () => {
  let component: LaunchesListComponent;
  let fixture: ComponentFixture<LaunchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchesListComponent],
      providers: [
        provideStore({ launch: launchReducer }),
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
