<script lang="ts">
  import { onMount } from 'svelte';
  import {
    ButtonSubmit, LoginField, PasswordField, OtpCodeField, ErrorMessages, Loading
  } from './components';
  import { AuthForm, OtpForm } from './screens';
  import { authService } from './libs/fsm/authMachine';

  onMount(() => {
    authService.send('INIT');
  });
</script>

<main>
  {#if $authService.matches('Loading')
    || $authService.matches('AuthForm.Loading')
    || $authService.matches('OtpForm.Loading')
  }
    <Loading />
  {:else if $authService.matches('AuthForm')}
    <AuthForm>
      <LoginField slot="login" />
      <PasswordField slot="password" />
      <ButtonSubmit slot="submit" disabled={!$authService.can('SUBMIT')} />
      <ErrorMessages slot="errors" errors={$authService.context.errors} />
    </AuthForm>
  {:else if $authService.matches('OtpForm')}
    <OtpForm>
      <OtpCodeField slot="otp_code" />
      <ButtonSubmit slot="submit" disabled={!$authService.can('SUBMIT')} />
      <ErrorMessages slot="errors" errors={$authService.context.errors} />
    </OtpForm>
  {/if}
</main>
