<script lang="ts">
  import { authService } from '../../libs/fsm/authMachine';
  
  const handleSubmit = () => {
     authService.send('SUBMIT');
  };
</script>

<form
  class="form"
  action="#"
  on:submit|preventDefault={handleSubmit}
>
  <h3>Введите OTP код</h3>
  <div class="formField">
    <slot name="otp_code" />
  </div>
  <div class="formField formField__button-submit">
    <slot name="submit" />
  </div>
  <div>
    <slot name="errors" />
  </div>
</form>
