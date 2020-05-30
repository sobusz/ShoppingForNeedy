import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slides-example',
  template: `
    <ion-content>
      <ion-slides pager="true" [options]="slideOpts" display:block >
        <ion-slide class="custom-slider">
          <div>
            <h1>Jak to działa?</h1>
            <br>
            <br>

            <p>Jeżeli potrzebujesz, żeby ktoś pomógł Ci, bo nie możesz lub nie chcesz ryzykować wychodzenia - znajdź na mapie najbliższego Wolontariusza.</p>
            <br>
            <p>💖 Jeżeli jesteś w stanie pomóc innym, masz chwilę czasu to zarejestruj się i prosto pomagaj innym. Dziękujemy <3</p>
            <br>
            <br>
          </div>
        </ion-slide>
        <ion-slide>
          <h1>Slide 2</h1>
        </ion-slide>
        <ion-slide>
          <h1>Slide 3</h1>
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
