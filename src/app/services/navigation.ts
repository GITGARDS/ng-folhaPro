import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  menuShow = signal<boolean>(false);
  constructor() {}
}
