import { Component, OnDestroy, inject } from '@angular/core';
import { DataService } from './services/data.service';
import { Subject, of, switchMap, take, takeUntil } from 'rxjs';
import { AutocompleteItem, AutoCompleteData, AutocompleteConfig, AutocompleteItemDetails } from './models/autocomplete.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  readonly autocompleteConfig: AutocompleteConfig = {
    label: "Topic*",
    placeholder: "Ex. Topic",
  }
  private destroy$ = new Subject<void>();
  private defaultQueryParams: { [param: string]: string | number } = { limit: 151 };

  title = 'artztekasse-test-v16';
  items: AutocompleteItem[] = [];
  selectedItem: AutocompleteItemDetails | null = null;

  private dataService = inject(DataService<AutoCompleteData, AutocompleteItemDetails>);

  onAutocompleteFocus() {
    this.dataService.getData().pipe(
      take(1),
      switchMap(data => {
        if (!data || !data.results.length) {
          return this.dataService.fetchData(this.defaultQueryParams);
        }
        return of(data);
      }),
      takeUntil(this.destroy$)
    ).subscribe(fetchedData => {
      console.log(fetchedData);
      if (fetchedData) {
        this.items = fetchedData.results;
      }
    });
  }

  onListItemSelected(itemURL: string) {
    this.dataService.getItemData().pipe(
      take(1),
      switchMap(() => {
        return this.dataService.fetchItemDetails(itemURL);
      }),
      takeUntil(this.destroy$)
    ).subscribe(fetchedDetailData => {
      this.selectedItem = fetchedDetailData;
      /* this.selectedItem = {
        name: fetchedDetailData.name,
        sprites: {
          front_default: fetchedDetailData.sprites.front_default
        },
        weight: fetchedDetailData.weight
      } */
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
