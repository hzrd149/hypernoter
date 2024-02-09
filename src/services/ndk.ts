import NDKSvelte from "@nostr-dev-kit/ndk-svelte";
import NDKCacheAdapterDexie from "@nostr-dev-kit/ndk-cache-dexie";

const cacheAdapter = new NDKCacheAdapterDexie({ dbName: "ndk-cache" });

export const ndk = new NDKSvelte({
  explicitRelayUrls: [
    "wss://relay.damus.io/",
    "wss://nostr.wine/",
    "wss://nos.lol/",
    "wss://nostr-pub.wellorder.net/",
  ],
  cacheAdapter,
});

await ndk.connect();

if (import.meta.env.DEV) {
  //@ts-ignore
  window.ndk = ndk;
}
