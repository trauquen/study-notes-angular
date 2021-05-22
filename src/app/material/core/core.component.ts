import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Hero } from '../../shared/hero';
import { HeroService } from 'src/app/heroes/hero.service';
import { reservedNameValidator } from '../../form/reserved-name.directive';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoreComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  heroDetails: FormGroup = new FormGroup({});

  showPasswordHint?: boolean;
  maxDate?: Date;

  heroesFix: Hero[] = [
    { id: 1, name: 'Boothstomper', team: 'hero' },
    { id: 2, name: 'Drogfisher', team: 'hero' },
    { id: 3, name: 'Bloodyllips', team: 'hero' },
    { id: 4, name: 'Mr Bu Moverse', team: 'hero' },
    { id: 5, name: 'Piranhaelli', team: 'hero' }
  ];
  filteredHeroes$?: Observable<Hero[]>;

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(private builder: FormBuilder, private heroService: HeroService, private dialog: MatDialog ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 17, 0, 1);
   }

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
        birth: ['', Validators.required],
        hair: ['', Validators.required],
        gender: [''],
        rides: this.builder.group({
          toyota: this.builder.control(false),
          muscle: this.builder.control(false),
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

  get birth(): FormControl{
    return this.heroDetails.controls.biometricData.get('birth') as FormControl;
  }

  get hair(): FormControl{
    return this.heroDetails.controls.biometricData.get('hair') as FormControl;
  }

  get gender(): FormControl{
    return this.heroDetails.controls.biometricData.get('gender') as FormControl;
  }

  get rides(): FormGroup{
    return this.heroDetails.controls.biometricData.get('rides') as FormGroup;
  }

  get powers(): FormArray{
    return this.heroDetails.controls.powers as FormArray;
  }

  addPower(): void{
    this.powers.push(this.builder.control(''));
  }

  removePowerAt(i: number): void{
    this.powers.removeAt(i);
  }

  addHero(): void {
    this.heroDetails.reset();
    this.powers.clear();
    const powersArr = ['gun', 'machine gun', 'rocket'];
    powersArr.map(p => this.addPower());
    this.heroDetails.setValue({
      name: 'Maleward',
      realName: 'Agavens Jenmar',
      biometricData: {
        age: 30,
        birth: new Date(1 / 1 / 1979),
        hair: '#8b4513',
        gender: 'woman',
        rides: {toyota: true, muscle: false, horse: false},
        skin: 'white'
      },
      powers: powersArr
    });
  }

  addBio(): void {
    this.heroDetails.patchValue({
      biometricData: {
        age: 35,
        birth: new Date(11 / 20 / 1989),
        hair: '#ff0000',
        gender: 'man',
        rides: {toyota: true, muscle: true, horse: false},
      },
      powers: ['boat', 'bucket', 'boss']
    });
  }

  login(): void {
    console.log(this.loginForm.value);
  }

  saveHero(): void{
    console.log(this.heroDetails.value);
  }

  isChoiced(rides: object): boolean{
    return Object.values(rides).includes(true);
  }

  showDialog(): void{
    this.dialog.open(DialogComponent, {
      autoFocus: false,
      data: 'Confirm'
    }).afterClosed().subscribe(result => {
      if (result) { this.heroDetails.reset(); }
    });
  }

}
