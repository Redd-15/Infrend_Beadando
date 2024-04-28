import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CarrentalTransferDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<CarrentalTransferDTO[]>('/api/transactions');
  }

  create(transaction: CarrentalTransferDTO) {
    return this.http.post<CarrentalTransferDTO>('/api/transaction', transaction);
  }

  transactionOfUser(userId: number){
    return this.http.get<CarrentalTransferDTO[]>('/api/transactions/created-by' + userId);
  }
}