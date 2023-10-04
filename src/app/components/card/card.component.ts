import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public pokemon: Pokemon;
  public sub$: Subscription;
  public pokeString: string = "";
  constructor(private pokemonService: PokemonsService) { }

  ngOnInit(): void {
    this.sub$ = this.pokemonService.getPokemon("charizard").subscribe({
      next: (poke: Pokemon | any) => {
        console.log("Retorno da api: ", poke);
        this.pokemon = poke;
      }
    })
  }

  public get(): void {
    this.sub$ = this.pokemonService.getPokemon(this.pokeString).subscribe({
      next: (poke: Pokemon | any) => {      
        this.pokemon = poke;
        this.pokeString = "";
      }
    });
    console.log("teste");
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    
  }

}
