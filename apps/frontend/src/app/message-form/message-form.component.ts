import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'dontdothis-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent {
  form = this.fb.group({
    from: [null, Validators.required],
    content: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.http
      .post<{ message: string }>('/api/message', this.form.value)
      .subscribe(({ message }) => this.snackBar.open(message));
  }
}
