import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { LoginService } from './login.service';
import { LOGIN_FORM_FIELDS } from './constants';

@Component({
  selector: 'ww-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @HostBinding('class')
  public hostClass = 'place-center full-size';

  public loginFormFields = [...LOGIN_FORM_FIELDS];

  public constructor(private readonly loginService: LoginService) { }

  public login(formValue: unknown): void {
    const { username, password } = formValue as { username: string, password: string };
    this.loginService
      .login(username, password)
      .subscribe();
  }
}
