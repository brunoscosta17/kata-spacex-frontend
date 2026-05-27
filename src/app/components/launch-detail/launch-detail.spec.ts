import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideStore } from '@ngrx/store';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { launchReducer } from '../../state/launch.reducer';
import { LaunchDetailComponent } from "./launch-detail";

describe("LaunchDetail", () => {
  let component: LaunchDetailComponent;
  let fixture: ComponentFixture<LaunchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchDetailComponent],
      providers: [
        provideStore({ launch: launchReducer }),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? '123' : null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
