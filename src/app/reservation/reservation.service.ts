import { Injectable, OnInit } from '@angular/core';
import { Reservations } from '../models/reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements OnInit{
  
  private reservations : Reservations[] = [];

  constructor(){
    let savedReservations = localStorage.getItem("reservation");
    this.reservations = savedReservations? JSON.parse(savedReservations):[];
  }

  ngOnInit(): void {
    
  }
  //CRUD 
  getReservations(): Reservations[]{
    return this.reservations;
  }

  getReservation(id: string): Reservations | undefined{
    return this.reservations.find(res => res.id ===id);
  }

  addReservation(reservation: Reservations): void{
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("reservation", JSON.stringify(this.reservations));
    console.log(this.reservations);
  }

  deleteReservations(id: String): void{
    let index = this.reservations.findIndex(res=> res.id ===id);
    this.reservations.splice(index,1);
    localStorage.setItem("reservation", JSON.stringify(this.reservations));
    
  }

  updateReservation(id: string ,updatedReservation: Reservations):void{
    let index= this.reservations.findIndex(res => res.id=== id);
    this.reservations[index] = updatedReservation;
    localStorage.setItem("reservation", JSON.stringify(this.reservations));
    
  }

}
