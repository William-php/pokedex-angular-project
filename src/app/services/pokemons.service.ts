import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  public url: string = environment.pokeApi;
  public pokemonData: Pokemon | any
  constructor(private http: HttpClient) { }

  public getPokemon(pokemon: string): Observable<Pokemon> {

    return this.http.get<Pokemon>(`${this.url}pokemon/${pokemon.toLowerCase()}`).pipe(
      map((value: Pokemon | any) => {
        this.repoPokemon(value);
        return this.pokemonData;
      }),
      take(1)
    )
  }

  public repoPokemon(valueAPI: any): void {
    const arrayTypes: any[] = [];
    valueAPI?.types.map((t: any) => {
      arrayTypes.push(t.type.name.toUpperCase());
    });
    let name: string = (valueAPI?.name.split("")[0].toUpperCase() + valueAPI?.name.split('').splice(1, valueAPI?.name.length - 1).join().replaceAll(",", ""));
    
    this.pokemonData = {
      id: valueAPI?.id || "",
      name:  name || "",
      img: valueAPI?.sprites?.front_default || "",
      types: arrayTypes
    }    
  }
}
