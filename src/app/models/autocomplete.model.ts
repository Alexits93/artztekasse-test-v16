export interface AutocompleteConfig {
    label?: string;
    placeholder?: string;
}

export interface AutoCompleteData {
    count: number;
    next: string;
    results: AutocompleteItem[];
    previous?: string;
}

export interface AutocompleteItem {
    name: string;
    url: string;
}

export interface AutocompleteItemDetails {
    name: string;
    sprites: AutocompleteItemDetailsImgURL;
    weight: number;
}

export interface AutocompleteItemDetailsImgURL {
    front_default: string;
}
