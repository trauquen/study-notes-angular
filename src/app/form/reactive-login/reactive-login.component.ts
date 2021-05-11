import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { reservedNameValidator } from '../reserved-name.directive';


@Component({
  selector: 'app-reactive-login',
  templateUrl: './reactive-login.component.html',
  styleUrls: ['./reactive-login.component.scss']
})
export class ReactiveLoginComponent implements OnInit {
  // loginForm = new FormGroup({
  //   username: new FormControl('hunter', Validators.required),
  //   password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
  // });
  loginForm: FormGroup = new FormGroup({});

  // heroDetails = new FormGroup({
  //   name: new FormControl(''),
  //   realName: new FormControl(''),
  //   biometricData: new FormGroup({
  //     age: new FormControl(''),
  //     eyes: new FormControl(''),
  //     hair: new FormControl('')
  //   }),
  //   powers: new FormArray([])
  // });

  heroDetails: FormGroup = new FormGroup({});

  showPasswordHint = false;

  ridesArr = ['toyota', 'muscle', 'horse'];

  constructor(private builder: FormBuilder) {
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
        eyes: ['', Validators.required],
        hair: ['', Validators.required],
        gender: [''],
        rides: this.builder.array(this.ridesArr.map(ride => this.builder.control(false))),
        skin: ['', Validators.required]
      }),
      powers: this.builder.array([])
    });
  }

  ngOnInit(): void {
    this.buildForm();

    this.password.valueChanges.subscribe((value:
      string) => {
      this.showPasswordHint = value.length < 6;
    });
  }

  login(): void {
    const controls = this.loginForm.controls;
    console.log('User:' + controls.username.value);
    console.log('Password:' + controls?.password.value);
  }

  get username(): AbstractControl {
    return this.loginForm.controls.username;
  }
  get password(): AbstractControl {
    return this.loginForm.controls.password;
  }
  get powers(): FormArray {
    return this.heroDetails.controls.powers as FormArray;
  }
  get rides(): FormArray {
    return this.heroDetails.get('biometricData.rides') as FormArray;
  }

  addPower(): void {
    this.powers.push(this.builder.control(''));
  }

  removePowerAt(i: number): void {
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
        eyes: '#006400',
        hair: '#8b4513',
        gender: 'woman',
        rides: [true, false, true],
        skin: 1
      },
      powers: powersArr
    });
  }

  addBio(): void {
    this.heroDetails.patchValue({
      biometricData: {
        age: 35,
        hair: '#ff0000',
        gender: 'man',
        rides: [true, true, false]
      },
      powers: ['boat', 'bucket', 'boss']
    });
  }

  saveHero(): void{
    console.log(this.heroDetails.valid, this.heroDetails.value);
    console.warn(this.rides.value);
  }
}
