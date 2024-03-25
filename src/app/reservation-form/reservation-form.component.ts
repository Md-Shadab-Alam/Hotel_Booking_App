import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservations } from '../models/reservations';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{
  
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router :Router,
    private activatedRoute : ActivatedRoute){

  }

  // adding validators with the help of group method
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      guestName:['',Validators.required],
      guestEmail:['',[Validators.required,Validators.email]],
      roomNumber:['',Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      let reservation = this.reservationService.getReservation(id)
      if(reservation)
        this.reservationForm.patchValue(reservation)
    }
  }

  onSubmit(){
    if(this.reservationForm.valid){

      let reservation: Reservations = this.reservationForm.value;

      let id= this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        //updating existing entry
        this.reservationService.updateReservation(id, reservation);
      }
      else{
        // new entry
        this.reservationService.addReservation(reservation);

      }
      this.router.navigate(['/list'])
    }
    else{
      console.log("not valid");
    }
  }
}
