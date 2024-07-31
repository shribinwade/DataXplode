import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isParentLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isChildLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  

  setLoadingState(isLoading: boolean): void {
    this.isLoading.next(isLoading);
  }
  setParentState(isLoading: boolean): void {
    this.isParentLoading.next(isLoading);
  }
  setChildState(isLoading: boolean): void {
    this.isChildLoading.next(isLoading);
  }
}
