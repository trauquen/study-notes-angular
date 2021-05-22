# Study Notes on Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

### Return undefined when get value from property of Object.

Format your object with `JSON.parse(JSON.stringify(user))` or `Object.assign(user)`, refer to auth.service.ts.

### Common Cli command.

`ng new project-name --routing --style scss --prefix pb`

`ng generate module shared --module app`

`ng serve --configuration=qa`

### Using `switchMap` in `pipe()` to switch from one observable to the other.


### Fix `FormArray` Error: Cannot find control with path: 'powers -> i'.

Wrap `formControlName` with [] in template like below:

```
<p *ngFor="let power of powers.controls; let i=index">
  <label>Power:</label><input type="text" [formControlName]="i">
  <mat-icon class="icon" (click)="removePowerAt(i)">close</mat-icon>
</p>
```

### Test 

https://stackblitz.com/angular/kgpnygmredj
