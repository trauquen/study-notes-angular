import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CdkComponent } from './cdk.component';

describe('CdkComponent', () => {
  let component: CdkComponent;
  let fixture: ComponentFixture<CdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdkComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
