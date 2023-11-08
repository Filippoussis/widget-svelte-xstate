<script lang="ts">
  export let errors: { message: string }[];
</script>

<ul class="rooxErrorMessages">
  {#each errors as error}
    <li>{error.message}</li>
  {/each}
</ul>