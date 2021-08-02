import { extend } from 'vee-validate';
import { required, email, numeric } from 'vee-validate/dist/rules';

// extend Vee-validate rules
extend('required', {
  ...required,
  message: '此欄位必填',
});

extend('email', {
  ...email,
  message: '必須輸入有效的 Email 地址',
});

extend('numeric', {
  ...numeric,
  message: '此欄位只能填寫0-9之間的數字',
});
