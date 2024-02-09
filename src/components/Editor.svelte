<script lang="ts">
  import type { NDKEvent } from "@nostr-dev-kit/ndk";
  import { basicSetup } from "codemirror";
  import { html } from "@codemirror/lang-html";
  import CodeMirror from "svelte-codemirror-editor";
  import { onDestroy, onMount } from "svelte";
  import { ndk } from "../services/ndk";

  let event: NDKEvent | null = null;
  async function listener() {
    const identifier = location.hash.replace(/^#/, "");
    console.log("Loading", identifier);

    event = await ndk.fetchEvent({
      kinds: [32616 as number],
      "#d": [identifier],
    });

    if (event) value = event.content;
  }

  let value = `<template>
</template>
`;

  onMount(() => {
    window.addEventListener("hashchange", listener);
  });
  onDestroy(() => {
    window.removeEventListener("hashchange", listener);
  });
</script>

<div id="container">
  {#if event}
    <CodeMirror
      bind:value
      lang={html()}
      extensions={[basicSetup]}
      useTab={false}
      styles={{
        "&": {
          width: "100%",
          height: "100%",
        },
      }}
    />
  {:else}
    <div id="empty">Select HyperNote</div>
  {/if}
</div>

<style>
  #container {
    display: flex;
    width: 100%;
    overflow-y: auto;
    overflow-x: auto;
    padding-right: 1rem;
  }

  #empty {
    display: flex;
    font-size: 2rem;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
