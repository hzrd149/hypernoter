<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  let progress = 0;
  const dispatch = createEventDispatcher();

  onMount(() => {
    const i = setInterval(() => {
      progress += 2;
    }, 100);
    setTimeout(() => {
      progress = 40;
    }, 1000);

    setTimeout(() => {
      progress = 100;
      setTimeout(() => {
        clearInterval(i);
        dispatch("done");
      }, 800);
    }, 1000 * 2);
  });
</script>

<main {...$$props}>
  <h1 id="title">HyperNoter<span id="date">2024</span></h1>
  <progress max="100" value={progress}></progress>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  h1 {
    position: relative;
  }
  #date {
    position: absolute;
    right: -2rem;
    top: -1rem;
    font-size: 2rem;
  }
</style>
