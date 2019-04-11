import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar,
    private Router: Router) {


  }

  /**
   * Displays a Success Message
   */
  onSuccess(message?: string, duration?: number) {
    if (message && duration)
      this.snackBar.open(message, null, {
        duration: duration,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success'],
      });
    else
      this.snackBar.open('Success!', null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success'],
      });

  }

  /**
   * Displays a Success Message
   */
  addToCart() {

    let snacky = this.snackBar.open('Added To Cart!', 'Checkout', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });


    snacky.onAction().subscribe(() => {
      window.scrollTo(0, 0);
      this.Router.navigate(['/cart']);
    });
  }

  /**
   * Displays an Error Message
   */
  onError(message?: string, duration?: number) {
    if (message && duration)
      this.snackBar.open(message, null, {
        duration: duration,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-error'],
      });
    else
      this.snackBar.open('Error', null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-error'],
      });
  }



}
