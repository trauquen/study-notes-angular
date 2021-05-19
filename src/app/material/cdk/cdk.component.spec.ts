import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CdkComponent } from './cdk.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CdkComponent', () => {
  let component: CdkComponent;
  let fixture: ComponentFixture<CdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdkComponent ],
      imports: [ HttpClientTestingModule, MatFormFieldModule, MatListModule, MatIconModule, ClipboardModule,
        MatInputModule, BrowserAnimationsModule, FormsModule
      ]
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
