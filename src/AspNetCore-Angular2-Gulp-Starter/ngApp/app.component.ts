import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
  `
})
export class AppComponent {
    title = 'Hello from ASP.NET Core and Gulp';
}