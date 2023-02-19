import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'dontdothis-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.http
      .post<{message: string}>('/api/auth/login', this.form.value)
      .subscribe(({message}) => this.snackBar.open(message));
  }
}
