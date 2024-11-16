import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('https://localhost:7021');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
