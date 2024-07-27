import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        // Handle successful login
        localStorage.setItem('token', result.token); // Store the token if applicable
        this.dialogRef.close(); // Close the dialog or redirect
        this.snackBar.open('Login successful', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        // Handle login failure
        this.snackBar.open('Login failed: ' + error.message, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
