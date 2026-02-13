import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../shared/models/client.model';
import { CustomValidators } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true
})
export class ListComponent {
    private clientService = inject(ClientService);

    searchPlate = signal('');

    newClient: Client = { nome: '', telefone: '', cpf: '', placaCarro: '' };

    clients = this.clientService.filteredClients;

    searchDigit = '';

    private fb = inject(FormBuilder);
    clientForm: FormGroup;

    constructor() {
      this.clientForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        cpf: ['', [Validators.required, CustomValidators.cpf]],
        placaCarro: ['', [Validators.required, CustomValidators.carPlate]],
        telefone: ['', Validators.required]
      });
    }

    ngOnInit() {
    }

    applyFilter() {
      this.clientService.setFilter(this.searchDigit);
    }

    save() {
      if (this.clientForm.valid) {
        this.clientService.add(this.clientForm.value).subscribe(() => {
          this.clientForm.reset();
        });
      }
    }

    delete(id: number | undefined) {
      if (id) this.clientService.remove(id).subscribe();
    }

    private resetForm() {
      this.newClient = { nome: '', telefone: '', cpf: '', placaCarro: '' };
    }
}
