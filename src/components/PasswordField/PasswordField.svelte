<script lang="ts">
  import { authService } from '../../libs/fsm/authMachine';

  const handleChange = (evt: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    authService.send({ type: 'INPUT_PASSWORD', value: evt.currentTarget.value })
  }
</script>

<input class="rooxFormInput" type="password" placeholder="Пароль" on:input={handleChange}>