import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './Components/pokedex/pokedex.component';

import { PokeScreenComponent } from './Components/poke-screen/poke-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PokeApiService } from './Components/Services/poke-api.service';
import { CapitalizePipe } from './Components/Pipes/capitalize.pipe';
import { SoundService } from './Components/Services/sound.service';


@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,   
    PokeScreenComponent,
    CapitalizePipe
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PokeApiService,
    SoundService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
