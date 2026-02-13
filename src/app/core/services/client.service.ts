import { computed, Injectable, signal } from '@angular/core'; // Adicione o computed
import { delay, of } from 'rxjs';
import { Client } from '../../shared/models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private generateMockData(count: number): Client[] {
    const names = ['John Smith', 'Maria Garcia', 'Robert Brown', 'Linda Taylor', 'Michael Wilson', 'Patricia Clark', 'David Miller', 'Barbara Lewis', 'James Walker', 'Elizabeth Hall'];
    const plates = ['ABC', 'XYZ', 'KGP', 'LMN', 'JHO', 'DFG', 'RTY', 'UIO', 'QWE', 'VBN'];

    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      nome: `${names[i % names.length]}`, // Usa o índice para não repetir nomes se não quiser
      telefone: `+55 11 9${Math.floor(10000000 + Math.random() * 90000000)}`,
      cpf: `${Math.floor(100 + Math.random() * 899)}.${Math.floor(100 + Math.random() * 899)}.${Math.floor(100 + Math.random() * 899)}-${Math.floor(10 + Math.random() * 89)}`,
      placaCarro: `${plates[i % plates.length]}${Math.floor(1000 + Math.random() * 8999)}`
    }));
  }

  private _clients = signal<Client[]>(this.generateMockData(20));

  private _filterTerm = signal<string>('');

  filteredClients = computed(() => {
    const term = this._filterTerm();
    const list = this._clients();
    if (!term) return list;
    return list.filter(c => c.placaCarro.endsWith(term));
  });

  setFilter(digit: string) {
    this._filterTerm.set(digit);
  }

  add(client: Client) {
    const newClient = { ...client, id: Math.floor(Math.random() * 1000) };
    this._clients.update(list => [...list, newClient]);
    return of(newClient).pipe(delay(400));
  }

  remove(id: number) {
    this._clients.update(list => list.filter(c => c.id !== id));
    return of(true).pipe(delay(400));
  }
}
