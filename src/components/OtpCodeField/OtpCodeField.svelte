<script lang="ts">
  import { authService } from '../../libs/fsm/authMachine';

  const handleChange = (evt: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    authService.send({ type: 'INPUT_OTP_CODE', value: evt.currentTarget.value })
  }
</script>

<input class="formInput" type="text" on:input={handleChange}>