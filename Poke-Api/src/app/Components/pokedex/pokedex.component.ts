import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../Services/poke-api.service';
import { SoundService } from '../Services/sound.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokemons: any[] = [];
  currentPokemon: any;
  currentIndex: number = 0;
  pokemonToSearch: string = '';
  sugerencia: string[] = [];
  allPokemonNames: string[] = [];
 



  constructor(
    private pokeApiService: PokeApiService,
    private soundService: SoundService
  ) { }

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  loadAllPokemons(): void {
    this.pokeApiService.obtenerTodos().subscribe((data) => {
      const results = data.results;
      results.forEach((pokemon: any) => {
        this.pokeApiService.obtenerPokemon(pokemon.name).subscribe((data) => {
          this.pokemons.push(data);
          if (this.pokemons.length === 1) {
            this.currentPokemon = this.pokemons[0];
            this.playPokemonSound(this.currentPokemon.name);
          }
        });
      });
    });
  }

  setCurrentPokemon(index: number): void {
    this.currentPokemon = this.pokemons[index];
    this.currentIndex = index;
    this.playPokemonSound(this.currentPokemon.name);
  }

  nextPokemon(): void {
    if (this.currentIndex < this.pokemons.length - 1) {
      this.currentIndex++;
      this.currentPokemon = this.pokemons[this.currentIndex];
      this.playPokemonSound(this.currentPokemon.name);
    }
  }

  previousPokemon(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentPokemon = this.pokemons[this.currentIndex];
      this.playPokemonSound(this.currentPokemon.name);
    }
  }

  onSearchClick(): void {
    if (this.pokemonToSearch.trim() !== '') {
      this.searchPokemon(this.pokemonToSearch.trim().toLowerCase());
      this.pokemonToSearch = '';
    }
  }

  searchPokemon(name: string): void {
    this.pokeApiService.obtenerPokemon(name).subscribe(pokeDetails => {
      this.pokemons = [pokeDetails];
      this.currentIndex = 0;
      this.currentPokemon = pokeDetails;
      this.playPokemonSound(this.currentPokemon.name);
    }, error => {
      console.error('Error al buscar el Pokémon:', error);

    });
  }

  playPokemonSound(name: string): void {
    this.soundService.playSound(name);
  }

  onkeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearchClick();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      if (this.sugerencia.length > 0) {
        this.pokemonToSearch = this.sugerencia[0];
        this.sugerencia = [];
      }
    }
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (input) {
      this.sugerencia = this.allPokemonNames.filter(name => name.startsWith(input)).slice(0, 5); // Limitar a 5 sugerencias
    } else {
      this.sugerencia = [];
    }
  }



    selectSugerencia(selectSugerencia: string): void {
      this.pokemonToSearch = selectSugerencia;
      this.sugerencia = [];
      this.onSearchClick()
    }
  }




