import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent {
  @Input() track?: Track

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['track']) {
      console.log('Track atualizado no filho:', changes['track'].currentValue);
    }
  }
}

export type Track = {
  musicName: string,
  albumsName: string,
  artistsName: string[],
  link: string
}