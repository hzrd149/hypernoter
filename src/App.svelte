<script lang="ts">
  import Editor from "./components/Editor.svelte";
  import Files from "./components/Files.svelte";
  import Loading from "./components/Loading.svelte";

  let loading = true;
</script>

{#if loading}
  <Loading on:done={() => (loading = false)} />
{:else}
  <main>
    <Files />
    <Editor />
  </main>
{/if}

<style>
  main {
    display: grid;
    gap: "0.5rem";
    width: 100%;
    height: 100%;
    grid-template-columns: 15rem 1fr;
    grid-template-rows: 1fr;
  }
</style>
