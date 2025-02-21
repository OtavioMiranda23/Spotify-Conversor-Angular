import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  track = {
    musicName: "",
    albumsName: "",
    artistsName: [""],
    link: ""
  };
  options = [
    { 
      site: "Youtube",
      value: 0
    }, 
    {
      site: "Youtube Music",
      value: 1
    }
  ];
  formulario = new FormGroup({
    link: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(https?:\/\/)?(www\.)?(open\.spotify\.com)\/.+(\/track\/).+$/)
    ]),
    selectedOption: new FormControl(this.options[0])
  });
  notShowButton = true;
  isLoading = false;
  isFetchError = {
    value: false,
    message: ""
  };
  constructor(private http: HttpService) {
    Notiflix.Notify.init({
      position: 'center-top'
    })
  }

  send() {
    this.isLoading = true;
    const link = this.formulario.get("link")?.value;
    const site = this.formulario.get("selectedOption")?.value?.value;
    const body = {
      link,
      siteValue: site
    };
    this.http.createYoutubeLink(body).subscribe({
      next: (data) => {
        this.track = data;
        this.track.link = this.track.link.replace("%3F", "?").replace("%3D", "=");
        this.track.musicName = this.track.musicName.replaceAll("+", " ");
        this.track.albumsName = this.track.albumsName.replaceAll("+", " ");
        this.track.artistsName = this.track.artistsName.map(artist => artist.replaceAll("+"," "));
  
        this.isLoading = false;
        this.isFetchError.value = false;
        this.isFetchError.message = "";
        Notiflix.Notify.success("Música convertida!")
      },
      error: (e) => {
        this.isLoading = false;
        this.isFetchError.value = true;
        this.isFetchError.message = e.message || "Ocorreu um erro inesperado.";
        console.error(e);
        Notiflix.Notify.failure("Ocorreu um erro")
      }
    });
  }
  validadeDisabledButton() {
    const inputValue = this.formulario.get('link')?.value;
    console.log(inputValue);
    const validRegexLink = /^(https?:\/\/)?(www\.)?(open\.spotify\.com)\/.+(\/track\/).+$/
    if (!inputValue) {
      this.notShowButton = true;
      return;
    }
    if (!validRegexLink.test(inputValue)) {
      this.notShowButton = true;
      return;
    } 
    this.notShowButton = false;
  }
}