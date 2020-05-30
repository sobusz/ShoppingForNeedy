// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import * as firebase from 'firebase';
import {ElementRef, ViewChild} from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  zakupy:boolean = false;
  samochod:boolean = false;
  pies:boolean = false;
  apteka:boolean = false;
  rozmowa:boolean = false;

  
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public toastController: ToastController
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

  public async presentToast() {
    const toast = await this.toastController.create({
      message: 'Twoje ustawienia zostały zapisane.',
      color: "primary",
      duration: 2500
    });
    toast.present();
  }
// -- write to databse -- 
  test() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = firebase.auth().currentUser.uid;
        let imieInput = (document.getElementById('testXD') as HTMLInputElement).value;
        let telefonInput = (document.getElementById('telefon') as HTMLInputElement).value; 
        //var dd = this.zakupy;
        //this.zakupy

        writeUserData(userId, imieInput, telefonInput)
      } else {
        // No user is signed in.
      }
    });

    let zak = this.zakupy;
    let sam = this.samochod;
    let roz = this.rozmowa;
    let apt = this.apteka;
    let pies = this.pies;

    function writeUserData(userId, name, number) {
      firebase.database().ref('/users/' + userId).update({
        imie: name,
        mam_samochod: sam,
        moge_porozmawiac: roz,
        nr_telefonu: number,
        pojade_do_apteki: apt,
        wyprowadze_psa: pies,
        zrobie_zakupy: zak,
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

  changeSamochod(){
    this.samochod = !this.samochod;
  }
  changeRozmowa(){
    this.rozmowa = !this.rozmowa;
  }
  changeApteka(){
    this.apteka = !this.apteka;
  }
  changePies(){
    this.pies = !this.pies;
  }
  changeZakupy(){
    this.zakupy = !this.zakupy;
  }
}