import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sound!: Howl;

  playSound(name: string): void {
    const soundSrc = `./assets/sounds/${name}.mp3`;
    console.log(`Playing sound from: ${soundSrc}`); 
    if (this.sound) {
      this.sound.unload();
    }
    this.sound = new Howl({
      src: [soundSrc]
    });
    this.sound.play();
  }
}
