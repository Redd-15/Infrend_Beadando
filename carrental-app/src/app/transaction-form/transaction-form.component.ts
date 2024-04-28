import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CarrentalTransferDTO, UserDTO } from '../../../models';
import { UserService } from '../services/user.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {

  formBuilder = inject(FormBuilder);

  userService = inject(UserService);

  transactionService = inject(TransactionService);

  users: UserDTO[] = [];

  transactionForm = this.formBuilder.group<CarrentalTransferDTO>({
    id: 0,
    amount: 0,
    timestamp: '',
    source: null,
    destination: null
  });

  ngOnInit(): void {
   this.userService.getAll().subscribe(users => this.users = users);
  }

  createTransaction() {
    const transaction = this.transactionForm.value as CarrentalTransferDTO;

    console.log('IN', transaction);

    this.transactionService.create(transaction).subscribe(transactionAdded => {
      console.log('OUT', transactionAdded);
    });
  }

}
