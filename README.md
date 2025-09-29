# @sbox/devbox

Minimal Sbox Devbox wrapper: CSB-compatible preview URL builder and FS client for sbox.so microVM sandboxes.

## Install

```bash
bun add @sbox/devbox
# or local dev before publish:
bun add file:/home/et/devbox
```

## Usage

```ts
import { Providers, getPreviewUrl, FsClient } from '@sbox/devbox';
const provider = process.env.DEVBOX_PROVIDER === 'SBOX' ? Providers.SBOX : Providers.CSB;
const id = 'abc123';
const preview = getPreviewUrl(provider, id, 3000, process.env.PINK_SBOX_DOMAIN || 'sbox.so');
const fs = new FsClient({ base: preview, token: process.env.PINK_FS_TOKEN });
await fs.writeText('app/page.tsx', 'export default function Home(){return (<main><h1>Sbox</h1></main>)}');
```
