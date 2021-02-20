import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faDoorOpen = faDoorOpen;
  faListAlt = faListAlt;
  isLogged = false;
  isAdmin: boolean = false;
  roles: any[];
  private titulo:string = "Mis Encuestas"

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.isAdmin = this.hasRole('ROLE_ADMIN')

  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  hasRole(role: string): boolean {
    this.roles = this.tokenService.getAuthorities();
    if (this.roles.includes(role)) {
      console.log(this.roles);
      return true;
    }
    return false;
  }

}
