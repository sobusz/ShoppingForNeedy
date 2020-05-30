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
  public map: any;
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

      //this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        //this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

      let map = this.map;

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

          var userLatlng = new google.maps.LatLng(child.val().lat, child.val().lng);
          
          var marker = new google.maps.Marker({
            position: userLatlng,
            title:child.val().imie
        });
        // To add the marker to the map, call setMap();
        marker.setMap(map);

        var samochod = child.val().mam_samochod;
        var pies = child.val().wyprowadze_psa;
        var rozmowa = child.val().moge_porozmawiac;
        var zakupy = child.val().zrobie_zakupy;
  
        if(samochod){samochod = 'Mam samochód'}
        else{samochod = 'Nie mam samochodu'}

        if(pies){pies = 'Mogę wyprowadzić zwierzę na spacer'}
        else{pies = ''}

        if(rozmowa){rozmowa = 'Chętnie porozmawiam'}
        else{rozmowa = ''}

        if(zakupy){zakupy = 'Mogę zrobić zakupy'}
        else{zakupy = ''}



        const contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + child.val().imie + '</h1>' +
        '<h4> Numer telefonu: ' + '<br>' + child.val().nr_telefonu + '</h4>' +
        '<div id="bodyContent">' +
        '<h5>' + samochod + '</h5>' +
        '<h5>' + pies + '</h5>' +
        '<h5>' + rozmowa + '</h5>' +
        '<h5>' + zakupy + '</h5>'        
        '</div>';


        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        });
      });
      

      // -- end --

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  


  // getAddressFromCoords(lattitude, longitude) {
  //   // console.log("getAddressFromCoords " + lattitude + " " + longitude);
  //   // let options: NativeGeocoderOptions = {
  //   //   useLocale: true,
  //   //   maxResults: 5
  //   // };

  //   // this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
  //   //   .then((result: NativeGeocoderResult[]) => {
  //   //     this.address = "";
  //   //     let responseAddress = [];
  //   //     for (let [key, value] of Object.entries(result[0])) {
  //   //       if (value.length > 0)
  //   //         responseAddress.push(value);

  //   //     }
  //   //     responseAddress.reverse();
  //   //     for (let value of responseAddress) {
  //   //       this.address += value + ", ";
  //   //     }
  //   //     this.address = this.address.slice(0, -2);
  //   //   })
  //   //   .catch((error: any) => {
  //   //     this.address = "Address Not Available!";
  //   //   });

  // }

}