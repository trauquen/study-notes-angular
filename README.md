# Study Notes on Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

### Return undefined when get value from property of Object.

Format your object with `JSON.parse(JSON.stringify(user))` or `Object.assign(user)`, refer to auth.service.ts.

### Common Cli command.

`ng new project-name --routing --style scss --prefix pb`

`ng generate module shared --module app`

`ng serve --configuration=qa`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
