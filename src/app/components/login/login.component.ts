import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from 'models';
import { AppState } from 'src/app/store/state/app.state';
import { LogIn } from 'actions';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    }
    this.store.dispatch(new LogIn(payload))
  }

}
