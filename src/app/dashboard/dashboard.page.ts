// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import * as firebase from 'firebase';
import {ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService
  ) { }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

  }
// -- write to databse -- 
  test() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = firebase.auth().currentUser.uid;

        let imieInput = (document.getElementById('testXD') as HTMLInputElement).value;
        let telefonInput = (document.getElementById('telefon') as HTMLInputElement).value;

        // tu powinno być zczytywanie wartości toggla z html'a 

        writeUserData(userId, imieInput, telefonInput)
      } else {
        // No user is signed in.
      }
    });


        // do writeUserData trzeba przekazać dane które zczytamy z toggla (zmienić z true/false na zmienną z test())

    function writeUserData(userId, name, number) {
      firebase.database().ref('/users/' + userId).update({
        imie: name,
        mam_samochod: true,
        moge_porozmawiac: true,
        nr_telefonu: number,
        pojade_do_apteki: true,
        wyprowadze_psa: true,
        zrobie_zakupy: true,
      });
    }
  }
  
// --end: write to databse -- 

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}