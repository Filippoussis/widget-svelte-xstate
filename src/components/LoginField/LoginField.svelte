<script lang="ts">
  import { authService } from '../../libs/fsm/authMachine';

  const handleChange = (evt: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    authService.send({ type: 'INPUT_LOGIN', value: evt.currentTarget.value })
  }
</script>

<input class="formInput" type="text" placeholder="Логин" on:input={handleChange}>