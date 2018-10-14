import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { Logger } from '../../providers/logger.service';
export class UserDetails {
  username: string;
  password: string;
  email: string;
  gender: string;
  birthdate: string;
}

@Component({
  selector: 'account-signup',
  templateUrl: 'account-signup.html'
})
export class AccountSignupPage {

  public userDetails: UserDetails;

  constructor(private navCtrl: NavController, private auth: AuthService, private dutil: DisplayUtilService) {
    this.userDetails = new UserDetails();
  }

  // public genderList = [
  //   {
  //     value: Gender.Male,
  //     text: Gender[Gender.Male]
  //   }, {
  //     value: Gender.Female,
  //     text: Gender[Gender.Female]
  //   }, {
  //     value: Gender.Other,
  //     text: Gender[Gender.Other]
  //   }
  // ]

  public submitted: boolean = false;

  onSignUp(form) {

    this.submitted = true;

    if (form && form.valid) {

      this.dutil.showLoader('登録しています...');

      let details = this.userDetails;

      let param = {
        username: details.username,
        password: details.password,
        attributes: {
          email: details.username, // username same value
          gender: details.gender,
          birthdate: details.birthdate
        }
      }

      this.auth.signUp({ email: details.username, password: details.password })
        .then(res => {
          this.auth.mailVerify()
            .then(res => {
            })
            .catch(err => {
              this.dutil.showAlert('エラー', err.message);
            })
          this.navCtrl.setRoot(AccountConfirmationCodePage);
        })
        .catch(err => {
          this.dutil.showAlert('登録失敗', err.message);
          Logger.debug(err);
        })
        .then(() => this.dutil.dismissLoader());
    }
  }
}
