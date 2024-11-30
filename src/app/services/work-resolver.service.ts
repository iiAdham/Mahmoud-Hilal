import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { WorkService } from './work.service';

@Injectable({
  providedIn: 'root'
})
export class WorkResolverService implements Resolve<any> {

  constructor(private workService: WorkService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.workService.get();
  }
}
