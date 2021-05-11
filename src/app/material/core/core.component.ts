import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Hero } from 'src/app/heroes/hero';
import { HeroService } from 'src/app/heroes/hero.service';
import { reservedNameValidator } from '../../form/reserved-name.directive';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  heroDetails: FormGroup = new FormGroup({});

  showPasswordHint?: boolean;

  heroes: Hero[] = [
    { id: 1, name: 'Boothstomper', team: 'hero' },
    { id: 2, name: 'Drogfisher', team: 'hero' },
    { id: 3, name: 'Bloodyllips', team: 'hero' },
    { id: 4, name: 'Mr Bu Moverse', team: 'hero' },
    { id: 5, name: 'Piranhaelli', team: 'hero' }
  ];
  filteredHeroes$?: Observable<Hero[]>;

  constructor(private builder: FormBuilder, private heroService: HeroService) { }

  private buildForm(): void {
    this.loginForm = this.builder.group({
      username: ['hunter', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
    this.heroDetails = this.builder.group({
      name: ['', reservedNameValidator()],
      realName: [''],
      biometricData: this.builder.group({
        age: ['', Validators.required],
        eyes: ['', Validators.required],
        hair: ['', Validators.required],
        gender: [''],
        rides: this.builder.group({
          toyota: this.builder.control(false),
          muscl: this.builder.control(false),
          horse: this.builder.control(false)
        }),
        skin: ['', Validators.required]
      }),
      powers: this.builder.array([])
    });
  }

  ngOnInit(): void {
    this.buildForm();

    this.filteredHeroes$ = this.heroDetails.controls.name.valueChanges.pipe(
      // map(name => this.heroes.filter(hero => hero.name.toLowerCase().startsWith(name.toLowerCase())))
      switchMap(name => this.heroService.filterHero(name))
    );

    this.password.valueChanges.subscribe((value: string) => {
      this.showPasswordHint = value.length < 6;
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }

  get username(): FormControl{
    return this.loginForm.controls.username as FormControl;
  }

  get password(): FormControl{
    return this.loginForm.controls.password as FormControl;
  }

  get age(): FormControl{
    return this.heroDetails.controls.biometricData.get('age') as FormControl;
  }

  login(): void {
    console.log(this.loginForm.value);
  }

  saveHero(): void{
    console.log(this.heroDetails.value);
  }

}
