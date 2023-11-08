export type Step =
  | 'auth_form'
  | 'enter_otp_form'
  | 'enter_credentials'
  | 'show_attach_form'
  | 'show_reattach_form'
  | 'login-by-otp-form'
  | 'activate_totpKey'
  | 'success-totp-activate'
  | 'redirect';

interface IGeoLocation {
  lat: {
    valueDegrees: number;
  };
  lon: {
    valueDegrees: number;
  };
  height: {
    valueMeters: 'NaN';
  };
}

export type ConstraintName =
  | 'NotNull'
  | 'Size'
  | 'Min'
  | 'Max'
  | 'DecimalMin'
  | 'DecimalMax'
  | 'FilteredSize'
  | 'Pattern'
  | 'ConfigurableMinSize'
  | 'ConfigurableMaxSize'
  | 'ConfigurablePattern';

export interface IAttributes {
  min?: number;
  max?: number;
  regexp?: string;
  value?: number | string;
  skip?: string;
  flags?: any[];
}

export interface IConstraint {
  name: ConstraintName;
  attributes?: IAttributes;
}

export interface IForm {
  name: string;
  fields: {
    [name: string]: {
      constraints: IConstraint[];
    };
  };
  errors: { message: string }[];
}

export interface SSOResponseSchema {
  location?: string;
  view?: {
    // 'auth_form'
    esiaRedirectUri?: string;
    totpKey?: string;
    ssoUrl?: string;
    esiaAppId?: string;
    isBlocked?: boolean;
    vkontakteRedirectUri?: string;
    esiaRequestUri?: string;
    odnoklassnikiRedirectUri?: string;
    esiaRequestScopesAsArray?: string[];
    utm?: any;
    // enter_otp_form
    nextOtpCodePeriod?: number;
    otpCodeAvailableAttempts?: number;
    method?: 'SMS' | 'otp' | 'totp';
    expireOtpCodeTime?: number;
    blockedFor?: number;
    otpCodeNumber?: number;
    msisdn?: string;
    category?: 'default';
    extendedAttributes?: any;
    geolocation?: IGeoLocation;
    nextOtpPeriod?: number;
    // enter_credentials
    passwordChangeTimeout?: number;
    username?: string;
    //show_attach_form
    firstName?: string;
    fullName?: string;
    socialNetworkId?: PartnerId;
    step?: string;
    avatarUrl?: string;
    //reattach_form
    oldFullName?: string;
    oldAvatarUrl?: string;
    //oidc
    oidc_providers?: OIDCProvider[];
    _device_nonce?: string;
    authenticationRequest?: {
      authenticationUri?: string;
      state?: string;
      nonce?: string;
    };
  };
  form?: IForm;
  serverUrl?: string;
  step: Step;
  execution?: string;
  access_token?: string;
  // otp_success
  mpt?: string;
  mpt_expires_in?: number;
  authorization_code?: string;
  token_type?: string;
  expires_in?: number;
}

export enum EventID {
  Start = 'start',
  Cancel = 'cancel',
  AuthCode = 'authCode',
  Next = 'next',
  Send = 'send',
  ESIA = 'esia',
  OIDC = 'oidc',
  VALIDATE = 'validate',
}

export enum OIDCProvider {
  SUDIR = 'sudir',
}

export interface IRequestParams {
  username?: string;
  password?: string;
  newPasswordBody?: string;
  otpCode?: string;
  redirect_uri?: string;
}

export enum PartnerId {
  ESIA = 'esia',
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  MAILRU = 'mailru',
  ODNOKLASSNIKI = 'odnoklassniki',
  TWITTER = 'twitter',
  YANDEX = 'yandex',
  VKONTAKTE = 'vkontakte',
}
