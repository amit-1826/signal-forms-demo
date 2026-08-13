import { Component, signal } from '@angular/core';
import { IntakeModel } from './models/intake.model';

import { form, FormField, required, minLength, maxLength, pattern, submit } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [FormField]
})
export class App {

  protected readonly model = signal<IntakeModel>({
    projectName: '',
    description: '',
    projectCode: '',
    isRemote: false
  });

  protected readonly intakeForm = form(this.model, (schema) => {
    required(schema.projectName, { message: 'Project name is required' });
    minLength(schema.projectName, 3, { message: 'Project name must be at least 3 characters long' });
    maxLength(schema.description, 500, { message: 'Description must be less than 500 characters' });
    pattern(schema.projectCode, /^[A-Za-z0-9-]{3,20}$/, { message: 'Project code must be alphanumeric with dashes and between 3 and 20 characters' });
  });


  onSubmit() {
    submit(this.intakeForm, async () => {
      try {
        console.log('Form submitted successfully:', this.model());
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    })
  }
}
