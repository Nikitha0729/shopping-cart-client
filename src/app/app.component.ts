import { Component, OnInit } from '@angular/core';
import { Cart } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  records: Cart[] = [];
  newRecord: Cart = {
    name: '',
    description: '',
    image: '',
    price: 0,
    quantity: 0,
  };
  selectedRecord: Cart | null = null;
  showForm = false;

  constructor(private recordService: CartService) {
    this.getRecords();
  }

  ngOnInit(): void {
    this.getRecords();
  }

  showUpdateForm(record: Cart): void {
    this.selectedRecord = record;
    this.showForm = true;
  }

  hideForm(): void {
    this.selectedRecord = null;
    this.showForm = false;
  }

  getRecords(): void {
    this.recordService
      .getRecords()
      .subscribe((record) => (this.records = record));
  }

  addRecord(): void {
    this.recordService.addRecord(this.newRecord).subscribe(() => {
      this.getRecords();
      this.newRecord = {
        name: '',
        description: '',
        image: '',
        price: 0,
        quantity: 0,
      };
    });
  }

  updateRecord(record: Cart) {
    if (record._id) {
      this.recordService.updateRecord(record._id, record).subscribe(
        (updatedRecord) => {
          const index = this.records.findIndex(
            (p) => p._id === updatedRecord._id
          );
          if (index !== -1) {
            this.records[index] = updatedRecord;
            this.selectedRecord = null;
            this.showForm = false;
          }
        },
        (error) => {
          console.error('Error updating record:', error);
        }
      );
    }
  }

  deleteRecord(recordId: string | undefined): void {
    if (!recordId) return;
    this.recordService
      .deleteRecord(recordId)
      .subscribe(() => this.getRecords());
  }
}
