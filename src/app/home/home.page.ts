// home.page.ts
import { Component, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import * as firebase from 'firebase';
import { FirebaseApp } from '@angular/fire';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
  }


  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

      // -- get location of current user and create his marker --
      firebase.initializeApp({
      apiKey: "AIzaSyCK0303BhB_05pCa0RQg2Xt_ft-8XYBXrM",
      authDomain: "needy-93473.firebaseapp.com",
      databaseURL: "https://needy-93473.firebaseio.com/",
      projectId: "needy-93473",
      storageBucket: "needy-93473.appspot.com",
      messagingSenderId: "882615586096",});

      var rootRef = firebase.database().ref();
      var urlRef = rootRef.child("users");
      urlRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
          console.log(child.val().imie);
          console.log(child.val().nr_telefonu);
          console.log(child.val().lat);
          console.log(child.val().lng);
          console.log(child.val().zrobie_zakupy);
          console.log(child.val().mam_samochod);
          console.log(child.val().wyprowadze_psa);
          console.log(child.val().pojade_do_apteki);
          console.log(child.val().moge_porozmawiac);
        });
      });

      // -- end --

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }

}