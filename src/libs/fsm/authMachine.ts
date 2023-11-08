import { assign, createMachine, interpret } from 'xstate';
import { inspect } from '@xstate/inspect';
import qs from 'qs';
import api from '../api';
import type { SSOResponseSchema } from '../api/sso/interfaces';
import { EventID } from '../api/sso/interfaces';

export const authParams = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  realm: import.meta.env.VITE_REALM,
  grant_type: import.meta.env.VITE_GRANT_TYPE,
  service: import.meta.env.VITE_SERVICE,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
};

inspect({
  // options
  // url: 'https://stately.ai/viz?inspect', // (default)
  iframe: false, // open in new window
});

const authMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXAFgWQIYGNMBLAOzADoBJCAGzAGJKA5SgFQG0AGAXUVAAcA9rCLoigknxAAPRAEYATAFZyANiUAODUs6q5qzgBY5G1QBoQAT0RLN5Qxs4BOXYaUO5TgL5eLaLHiEpBQAMoK4EKRQ9BASFKQAboIA1hQAZmDohJQkoly8SCBCImISUrIIcpyO5AoAzEoGGvVOOnJ1FtYIHuROCgDsTnoKbi6Gqv0+fhg4BMRk5GERUfRgAE5rgmvk-DS46GlbALbkGVmYOXk8UsWi4pKFFeMK5P0ainKGCk7aqg6dNn6hlqnHaTn0Tn6EwUqimIH8syCCwAyqh8Pg4LB6PkbsI7mVHjYFACEO9yHUFAoNE4hgo5J46sY4QjAvMKKj0ZjsXICgI8aUHqAKkpiVZED85OStDDHNptJDmTNWcFyAiAGLHVUzDVrI6MJgABQAqqwAPohADyAHFmDjCrcBeV5LpyI06o46apZQY5CTGf1asovaDPEooUNFQE5ir1ZrY7r9cazQbkMjkQB1C0AJQAIna+SV7k7Sf0Sd8A4ZOKDVKoafSXEo6pHEWytVgdSd43rkUaAELYNj5or8ouEhBUyV-DTGJxuHTqQyGEmVpy9KfuoxDfSNZvKhZdxbhSIkaKxBaJFLpTKEDs5-a4IcO0dCxD9b72Ux9aecfoNf5i7pOBeIYfzkKFmn6WxDF3aN921TUlmPaJ1k2bZdn2Q5dVOa9MFve9HxHAkXwQN9VwcWsqUrX93A0P1GnIdo-h+NwjDAhQYKRCgDw5DFYCxAjCyImRnRqepGmqFo2g6ACvhUL1G3qb4Rn6ThGQ41sDzVXAiBoVA1gYAT8UFYTSQaWpZzpKsgXI0sAJhANHCUSEQzqOQlE8aDfHhJVYIoC10H4DtyH8wLjkTE1TQAYQtHMAFFDMdMcYRURpww0fpBjqdQSSqGFekGP4nM-dolHUlUQqCiqwp7ftB2ue1COMp4wPIKt10GRQstsrpZ2BWwvxcClxkMJsvJZXzgoCoLEJWM94hIJJUjbFtyqmhCjyiBAL3wfZ7nyBLnxM386ldLQHDpRl3NUklwROudbB0L5IRpMqFiqrCZpPVYNi2HY9gOOMfM4ybQo+jaTy2hbBB2gV9vqgsjOLY7TunZp2jcKppJ6gxakGDKvkg1yNFevy1qwrSdL0gz4eHQSmsQd4Xncr5DEhUxG3cHLqg0V4PJ0UxWYy0avJIQQIDgKRxs43E6eLABaJwSTl1RWqrNX1bVqkSaoWgwBlxGxy+ElbB5qctE+OoMucbXPqgfXEuIukA3qEammpCZpyXACOdqRlPneS6Xe1indP0+3DoqTrVzDNyKU4WxQNFLowxeUx0s8X9lHdUqxqB1seMxcOhMjlpXX6WOFHjnRy6TxAvhV7QYSqWcHsY7WuyL+mEDqRWAJMTgPzqKuOaBExJlzqNgYPDuGtlscPnsEaGnBcDMfMGSgNa9yGWUoZLvb+CweWE9O+LSsXjAsME8Zd1FD9UxeccPHvgpOQD-bTUC740+xz6VcVMvkLSkltaIyRGOSEUehnD3U+O-XCmoQ5Ux-sRP+rxQSQSAfUN4fpWaBmATCEYqMgTa3ekcZBJknaugmLWdKmVsoAWaCdWwrkMqDR0NbCeK03pkxOKQ8hFQqRM2aDWBOKkgLxy5mSRyblwSxxITww8x87azwNsRRsAZGy3ycJbKuygbp0nJIoRsid9BaHkaDE4X94AqIdiZFwKs+hgUhIuL4pgsbiiqOQdKBg+gOGcPScxQVEFhxsRHcULpHF4xcVSVQ7jKg-lXEPdyrkM5AW8D4LwQA */
    context: {
      step: '',
      execution: '',
      login: '',
      password: '',
      otpCode: '',
      errors: [],
    },
    id: 'AuthMachine',
    initial: 'Idle',
    states: {
      Idle: {
        on: {
          INIT: {
            target: 'Loading',
          },
        },
      },
      Loading: {
        invoke: {
          id: 'fetchInit',
          src: 'fetchInit',
          onError: [
            {
              target: 'Failure',
            },
          ],
          onDone: [
            {
              target: 'Success',
              actions: 'setData',
            },
          ],
        },
      },
      Failure: {},
      Success: {
        always: [
          {
            target: 'AuthForm',
            cond: 'authForm',
          },
          {
            target: 'OtpForm',
            cond: 'otpForm',
          },
        ],
      },
      AuthForm: {
        initial: 'AuthForm',
        states: {
          AuthForm: {
            on: {
              INPUT_LOGIN: {
                target: 'AuthForm',
                actions: 'setLogin',
              },
              INPUT_PASSWORD: {
                target: 'AuthForm',
                actions: 'setPassword',
              },
              SUBMIT: {
                target: 'Loading',
                cond: 'authFormValid',
              },
            },
          },
          Loading: {
            invoke: {
              id: 'fetchFormData',
              src: 'fetchFormData',
              onDone: [
                {
                  target: 'Success',
                  actions: 'setData',
                },
              ],
              onError: [
                {
                  target: 'Failure',
                },
              ],
            },
          },
          Success: {
            always: {
              target: '#AuthMachine.Success',
            },
          },
          Failure: {
            always: {
              target: 'AuthForm',
            },
          },
        },
      },
      OtpForm: {
        initial: 'OtpForm',
        states: {
          OtpForm: {
            on: {
              INPUT_OTP_CODE: {
                target: 'OtpForm',
                actions: 'setOtpCode',
              },
              SUBMIT: {
                target: 'Loading',
                cond: 'otpFormValid',
              },
            },
          },
          Loading: {
            invoke: {
              src: 'fetchCode',
              onDone: [
                {
                  target: 'Success',
                  actions: 'setData',
                },
              ],
              onError: [
                {
                  target: 'Failure',
                },
              ],
            },
          },
          Success: {
            type: 'final',
          },
          Failure: {
            always: {
              target: 'OtpForm',
            },
          },
        },
      },
    },
    tsTypes: {} as import('./authMachine.typegen').Typegen0,
    schema: {
      events: {} as
        | { type: 'INIT' }
        | { type: 'SUBMIT' }
        | { type: 'INPUT_LOGIN'; value: string }
        | { type: 'INPUT_PASSWORD'; value: string }
        | { type: 'INPUT_OTP_CODE'; value: string },
      context: {} as {
        step: string;
        execution: string;
        login: string;
        password: string;
        otpCode: string;
        errors: { message: string }[];
      },
      services: {} as {
        fetchInit: {
          data: SSOResponseSchema;
        };
        fetchFormData: {
          data: SSOResponseSchema;
        };
        fetchCode: {
          data: SSOResponseSchema;
        };
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      setData: assign({
        step: (_, event) => event.data.step,
        execution: (_, event) => event.data.execution || '',
        errors: (_, event) => event.data.form?.errors || [],
      }),
      setLogin: assign({
        login: (_, event) => event.value,
      }),
      setPassword: assign({
        password: (_, event) => event.value,
      }),
      setOtpCode: assign({
        otpCode: (_, event) => event.value,
      }),
    },
    services: {
      fetchInit: () => api.sso.postAccessToken(qs.stringify(authParams)),
      fetchFormData: (ctx) =>
        api.sso.postAccessToken(
          qs.stringify({
            ...authParams,
            username: ctx.login,
            password: ctx.password,
            execution: ctx.execution,
            _eventId: EventID.Next,
          })
        ),
      fetchCode: (ctx) =>
        api.sso.postAccessToken(
          qs.stringify({
            ...authParams,
            otpCode: ctx.otpCode,
            execution: ctx.execution,
            _eventId: EventID.VALIDATE,
          })
        ),
    },
    guards: {
      authForm: (ctx) => ctx.step === 'auth_form',
      otpForm: (ctx) => ctx.step === 'enter_otp_form',
      authFormValid: (ctx) => ctx.login.trim().length !== 0 && ctx.password.trim().length !== 0,
      otpFormValid: (ctx) => ctx.otpCode.trim().length !== 0,
    },
    delays: {},
  }
);

export const authService = interpret(authMachine, { devTools: true }).start();
