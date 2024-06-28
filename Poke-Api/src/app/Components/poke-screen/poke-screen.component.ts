import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poke-screen',
  templateUrl: './poke-screen.component.html',
  styleUrls: ['./poke-screen.component.css']
})
export class PokeScreenComponent {
  @Input() pokemon: any;
  @Input() shadowDetails: boolean = true;

  constructor() { }
}
