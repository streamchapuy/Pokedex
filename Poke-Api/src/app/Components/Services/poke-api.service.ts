import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private pokeApiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }
  
  obtenerTodos():Observable<any>{
    return this.http.get<any>(`${this.pokeApiUrl}/pokemon?limit=10`);
  }
  
   obtenerPokemon(name:string):Observable<any>{
     return this.http.get<any>(`${this.pokeApiUrl}/pokemon/${name}`);
   }

}
