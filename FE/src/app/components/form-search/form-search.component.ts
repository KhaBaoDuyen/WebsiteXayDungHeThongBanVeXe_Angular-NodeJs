import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-search',
  imports: [FormsModule],
  templateUrl: './form-search.component.html'
})
export class FormSearchComponent {
  searchTerm: string = ''; 

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchTerm.trim());
  }

  clearSearch() {
    this.searchTerm = '';
    this.search.emit('');
  }
}
