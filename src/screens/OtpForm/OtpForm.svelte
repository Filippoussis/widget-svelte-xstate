<script lang="ts">
  import { authService } from '../../libs/fsm/authMachine';
  
  const handleSubmit = () => {
     authService.send('SUBMIT');
  };
</script>

<form
  class="rooxForm"
  action="#"
  on:submit|preventDefault={handleSubmit}
>
  <h3>Введите OTP код</h3>
  <div class="rooxFormField">
    <slot name="otp_code" />
  </div>
  <div class="rooxFormField rooxFormField__button-submit">
    <slot name="submit" />
  </div>
  <div>
    <slot name="errors" />
  </div>
</form>
