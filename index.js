export const Providers = { CSB: 'CSB', SBOX: 'SBOX' };
export function getPreviewUrl(provider, id, port = 3000, domainOrBase) {
  if (provider === Providers.CSB) return `https://${id}-${port}.csb.app`;
  const d = domainOrBase || process.env.PINK_SBOX_DOMAIN || process.env.SBOX_DOMAIN || 'sbox.so';
  if (/^https?:\/\//.test(d)) return d;
  return `https://${id}-${port}.${d}`;
}
export class FsClient {
  constructor(opts = {}) {
    this.base = opts.base || process.env.SBOX_BASE || '';
    this.token = opts.token || process.env.PINK_FS_TOKEN || process.env.SBOX_TOKEN;
    if (!this.base && process.env.SBOX_ID && (process.env.PINK_SBOX_DOMAIN || process.env.SBOX_DOMAIN)) {
      const dd = process.env.PINK_SBOX_DOMAIN || process.env.SBOX_DOMAIN;
      this.base = `https://${process.env.SBOX_ID}-3000.${dd}`;
    }
  }
  async readText(path) {
    const url = new URL('/api/fs', this.base); url.searchParams.set('path', path);
    const res = await fetch(url, { headers: this._h() });
    if (!res.ok) throw new Error(`fs read ${res.status}: ${await res.text()}`);
    return await res.text();
  }
  async writeText(path, content) {
    const url = new URL('/api/fs', this.base);
    const res = await fetch(url, { method: 'PUT', headers: { 'content-type': 'application/json', ...this._h() }, body: JSON.stringify({ path, content }) });
    if (!res.ok) throw new Error(`fs write ${res.status}: ${await res.text()}`);
  }
  _h(){ return this.token ? { 'x-pink-fs-token': this.token } : {} }
}
