import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import { Observable, from } from 'rxjs';
import { take } from 'rxjs/operators';

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
