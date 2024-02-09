<script lang="ts">
  import { onDestroy } from "svelte";
  import { ndk } from "../services/ndk";
  import { NDKNip07Signer, NDKUser } from "@nostr-dev-kit/ndk";
  import { Avatar, Name } from "@nostr-dev-kit/ndk-svelte-components";

  const pages = ndk.storeSubscribe(
    {
      kinds: [32616 as number],
      authors: [
        "0d6c8388dcb049b8dd4fc8d3d8c3bb93de3da90ba828e4f09c8ad0f346488a33",
      ],
    },
    { closeOnEose: false },
  );

  let user: NDKUser | undefined;
  async function loginWithExt() {
    ndk.signer = new NDKNip07Signer();
    await ndk.signer.blockUntilReady();
    await ndk.activeUser?.fetchProfile;
    user = ndk.activeUser;
  }

  onDestroy(() => {
    pages.unsubscribe();
  });
</script>

<aside>
  <nav>
    {#if user}
      <Avatar {user} style="width: 2rem; height: 2rem;" />
      <Name {user} />
    {/if}
    {#if user}
      <button>New Page</button>
    {:else}
      <button on:click={loginWithExt}>Login</button>
    {/if}
  </nav>
  <ul class="tree-view">
    {#each $pages as page}
      <li>
        <a href={`#${page.tags.find((t) => t[0] === "d")?.[1]}`}
          >{page.tags.find((t) => t[0] === "d")?.[1]}</a
        >
      </li>
    {/each}
    <!-- <li><a href="#intro">Intro</a></li>
    <li>
      <a href="#components">Components</a>
      <ul>
        <li><a href="#button">Button</a></li>
        <li><a href="#checkbox">Checkbox</a></li>
        <li><a href="#option-button">OptionButton</a></li>
        <li><a href="#tabs">Tabs</a></li>
        <li><a href="#group-box">GroupBox</a></li>
        <li><a href="#text-box">TextBox</a></li>
        <li><a href="#slider">Slider</a></li>
        <li><a href="#dropdown">Dropdown</a></li>
        <li>
          <a href="#window">Window</a>
          <ul>
            <li><a href="#title-bar">Title Bar</a></li>
            <li><a href="#window-contents">Window contents</a></li>
            <li><a href="#status-bar">Status Bar</a></li>
          </ul>
        </li>
        <li><a href="#tree-view">TreeView</a></li>
        <li><a href="#progress-bar">ProgressBar</a></li>
      </ul>
    </li>
    <li><a href="#issues-contributing-etc">Issues, Contributing, etc.</a></li> -->
  </ul>
</aside>

<style>
  aside {
    height: 100%;
  }
  ul {
    height: 100%;
  }
  nav {
    padding: 0.2rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  nav button {
    margin-left: auto;
  }
  #avatar {
    width: 2rem;
    height: 2rem;
    overflow: hidden;
  }
</style>
