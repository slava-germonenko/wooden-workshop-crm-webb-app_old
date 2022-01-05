import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { DynamicFormModule } from '@framework/dynamic-form';

import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  const componentFactory = createComponentFactory({
    component: LoginComponent,
    declarations: [LoginComponent],
    imports: [DynamicFormModule, LoginModule, ReactiveFormsModule],
    providers: [
      mockProvider(LoginService, {
        login: () => of({}),
      }),
    ],
  });

  let spectator: Spectator<LoginComponent>;

  beforeEach(() => {
    spectator = componentFactory();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined.', () => {
    expect(spectator.component).toBeDefined();
  });

  it('Should create login form', () => {
    expect(spectator.query('form')).toBeDefined();
    expect(spectator.query('form input[name="username"]')).toBeDefined();
    expect(spectator.query('form input[name="password"]')).toBeDefined();
    expect(spectator.query('form button[type="submit"]')).toBeDefined();
  });

  describe('login', () => {
    it('Should be defined', () => {
      expect(spectator.component.login).toBeDefined();
    });

    it('Should call login', () => {
      spectator.typeInElement('test username', 'form input[name="username"]');
      spectator.typeInElement('test password', 'form input[name="password"]');

      const loginFuncSpy = jest.spyOn(spectator.component, 'login');
      spectator.triggerEventHandler('form', 'ngSubmit', 'lul');
      expect(loginFuncSpy).toBeCalledWith({ username: 'test username', password: 'test password' });
    });
  });
});
