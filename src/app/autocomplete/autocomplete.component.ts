import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutocompleteConfig, AutocompleteItem, AutocompleteItemDetails } from '../models/autocomplete.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent<T extends AutocompleteItem> {
  @Input() data: T[] = [];
  @Input() config?: AutocompleteConfig;
  @Input() selectedItem?: AutocompleteItemDetails | null;

  @Output() inputFocused = new EventEmitter<void>;
  @Output() itemSelected = new EventEmitter<string>;

  showDropdown = false;
  inputControl = new FormControl('');

  onInputFocus(): void {
    this.showDropdown = true;
    this.inputFocused.emit();
  }

  onInputBlur(): void {
    this.showDropdown = false;
  }

  selectItem(item: T): void {
    this.inputControl.setValue(item.name);
    this.itemSelected.emit(item.url);
  }

}
