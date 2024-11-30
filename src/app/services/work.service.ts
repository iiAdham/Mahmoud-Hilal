import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  firestoreUrl = 'https://firestore.googleapis.com/v1/projects/mahmoud-hilal/databases/(default)/documents/work';
  apiKey = 'AIzaSyD7AzYCsJODcYyhFQ5Roi19cOIGr7BihJk';

  constructor(private http: HttpClient) { }

  add(description: any, img: any, type: any, url: any) {
    const api = `${this.firestoreUrl}?key=${this.apiKey}`;
    return this.http.post(api, {
      fields: {
        description: { stringValue: description },
        img: { stringValue: img },
        type: { stringValue: type },
        url: { stringValue: url }
      }
    });
  }
  get() {
    const url = `${this.firestoreUrl}?key=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const documents = response.documents || [];
        return documents.map((doc: any) => {
          const id = doc.name.split('/').pop();
          return {
            id: id,
            ...doc.fields
          };
        });
      })
    );
  }

  delete(id: string) {
    const deleteUrl = `${this.firestoreUrl}/${id}?key=${this.apiKey}`;
    return this.http.delete(deleteUrl);
  }
}
