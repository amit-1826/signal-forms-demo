import { Component, signal } from '@angular/core';
import { IntakeModel } from './models/intake.model';

import { form, FormField, applyWhen, validate, hidden, required, minLength, maxLength, pattern, submit, disabled, applyEach, email } from '@angular/forms/signals';

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
    isRemote: false,
    travelBudget: 0,
    contactAddress: {
      street: '',
      city: '',
      zipCode: ''
    },
    members: [{ name: '', role: '', email: '' }]
  });

  protected readonly intakeForm = form(this.model, (schema) => {
    required(schema.projectName, { message: 'Project name is required' });
    minLength(schema.projectName, 3, { message: 'Project name must be at least 3 characters long' });
    maxLength(schema.description, 500, { message: 'Description must be less than 500 characters' });
    pattern(schema.projectCode, /^[A-Za-z0-9-]{3,20}$/, { message: 'Project code must be alphanumeric with dashes and between 3 and 20 characters' });

    hidden(schema.contactAddress, {
      when: ({ valueOf }) => valueOf(schema.isRemote), // Hide contactAddress if isRemote is true
    });

    applyWhen(schema.contactAddress, ({ valueOf }) => !valueOf(schema.isRemote), (address) => {
      required(address.street, {
        when: ({ valueOf }) => !valueOf(schema.isRemote), // Only required if isRemote is false
        message: 'Street address is required for non-remote projects'
      });

      required(address.city, {
        when: ({ valueOf }) => !valueOf(schema.isRemote), // Only required if isRemote is false
        message: 'City is required for non-remote projects'
      });
      pattern(address.zipCode, /^\d{5}(-\d{5})?$/, { message: 'Zip code must be in the format 12345 or 12345-6789' });

    });

    required(schema.travelBudget, { message: 'Travel budget is requred' });

    validate(schema.travelBudget, ({ value, valueOf }) => {
      if (!valueOf(schema.isRemote) && value() <= 0) {
        return { kind: 'travelBudget', message: 'Travel budget must be greater than 0 for non-remote projects' };
      }
      return null;
    })

    disabled(schema.travelBudget, {
      when: ({ valueOf }) => valueOf(schema.isRemote), // Disable travelBudget if isRemote is true
    });

    applyEach(schema.members, (member) => {
      required(member.name, { message: 'Member name is required' });
      required(member.role, { message: 'Member role is required' });
      required(member.email, { message: 'Member email is required' });
      email(member.email, { message: 'Member email must be a valid email address' });
    });

    minLength(schema.members, 1, { message: 'At least one team member is required' });
  });

  addMember() {
    this.model.update((m) => ({
      ...m,
      members: [...m.members, { name: '', role: '', email: '' }]
    }))
  }

  removeMember(index: number) {
    this.model.update((m) => ({
      ...m,
      members: m.members.filter((_, i) => i !== index)
    }))
  }


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
