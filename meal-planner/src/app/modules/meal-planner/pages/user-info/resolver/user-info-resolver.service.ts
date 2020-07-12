import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { UserInfoService } from 'src/app/core/services/user-info.service';

import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';

@Injectable({
  providedIn: 'root'
})
export class UserInfoResolverService implements Resolve<UserInfo> {

  constructor(
    private userInfoService: UserInfoService,
    private router: Router,
  ) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfo> {
    return this.userInfoService.getUserInfo();
  }
}
