// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.AuthMachine.OtpForm.Loading:invocation[0]': {
      type: 'done.invoke.AuthMachine.OtpForm.Loading:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.fetchFormData': {
      type: 'done.invoke.fetchFormData';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.fetchInit': {
      type: 'done.invoke.fetchInit';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.fetchFormData': { type: 'error.platform.fetchFormData'; data: unknown };
    'error.platform.fetchInit': { type: 'error.platform.fetchInit'; data: unknown };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    fetchCode: 'done.invoke.AuthMachine.OtpForm.Loading:invocation[0]';
    fetchFormData: 'done.invoke.fetchFormData';
    fetchInit: 'done.invoke.fetchInit';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    setData:
      | 'done.invoke.AuthMachine.OtpForm.Loading:invocation[0]'
      | 'done.invoke.fetchFormData'
      | 'done.invoke.fetchInit';
    setLogin: 'INPUT_LOGIN';
    setOtpCode: 'INPUT_OTP_CODE';
    setPassword: 'INPUT_PASSWORD';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    authForm: '';
    authFormValid: 'SUBMIT';
    otpForm: '';
    otpFormValid: 'SUBMIT';
  };
  eventsCausingServices: {
    fetchCode: 'SUBMIT';
    fetchFormData: 'SUBMIT';
    fetchInit: 'INIT';
  };
  matchesStates:
    | 'AuthForm'
    | 'AuthForm.AuthForm'
    | 'AuthForm.Failure'
    | 'AuthForm.Loading'
    | 'AuthForm.Success'
    | 'Failure'
    | 'Idle'
    | 'Loading'
    | 'OtpForm'
    | 'OtpForm.Failure'
    | 'OtpForm.Loading'
    | 'OtpForm.OtpForm'
    | 'OtpForm.Success'
    | 'Success'
    | {
        AuthForm?: 'AuthForm' | 'Failure' | 'Loading' | 'Success';
        OtpForm?: 'Failure' | 'Loading' | 'OtpForm' | 'Success';
      };
  tags: never;
}
