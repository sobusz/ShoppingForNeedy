import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slides-example',
  template: `
  <ion-header>
  <ion-toolbar color="primary">
    <ion-title>Jak to działa</ion-title>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="home"></ion-back-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-menu-button autoHide="true"></ion-menu-button>
    </ion-buttons>
  </ion-toolbar>
  </ion-header>
    <ion-content>
      <ion-slides pager="true" [options]="slideOpts" display:block >
        <ion-slide class="custom-slider">
          <div>
            <h1>Jak to działa?</h1>
            <br>
            <br>

            <p>Jeżeli potrzebujesz, żeby ktoś pomógł Ci, bo nie możesz lub nie chcesz ryzykować wychodzenia - znajdź na mapie najbliższego Wolontariusza.</p>
            <br>
            <p>Jeżeli jesteś w stanie pomóc innym, masz chwilę czasu to zarejestruj się, wybierz zakres w którym jesteś w stanie pomóc i pomagaj innym. Dziękujemy <3</p>
            <br>
            <br>
          </div>
        </ion-slide>
        <ion-slide>
        <div>
        <h1>Lokalizacja</h1>
        <br>
        <br>

        <p>Niezależnie od tego którą stroną jesteś, zostaniesz poproszony/a o udostępnienie danych geolokalizacyjnych, prosimy o akceptację.</p>
        <br>
        <p>Jeżeli jesteś w stanie pomóc innym, masz chwilę czasu to zarejestruj się i prosto pomagaj innym. Dziękujemy <3</p>
        <br>
        <br>
      </div>
        </ion-slide>
        <ion-slide>
        <div>
        <h1>Zasady</h1>
        <br>
        <br>

        <p>Szanuj czas Wolontariuszy oraz ich prywatność. Nie nadużywaj i nie wykorzystuj ich danych do żadnego innego celu niż do niezbędnej pomocy.</p>
        <br>
        <p>Zadbaj o swoje bezpieczeństwo w każdym przypadku. Pamiętaj, że nikogo nie weryfikujemy. Nie wiesz kto jest po drugiej stronie - zawsze sprawdzaj tę osobę i zgłaszaj od razu na Policję, jeżeli masz jakiekolwiek podejrzenia.</p>
        <br>
        <br>
      </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  `
})

// @Component({
//   selector: 'app-about',
//   templateUrl: './about.page.html',
//   styleUrls: ['./about.page.scss'],
// })
export class AboutPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() {}

  ngOnInit() {
  }

}
