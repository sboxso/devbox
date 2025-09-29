export declare const Providers: { CSB: 'CSB'; SBOX: 'SBOX' };
export declare function getPreviewUrl(provider: 'CSB'|'SBOX', id: string, port?: number, domainOrBase?: string): string;
export interface FsClientOptions { base?: string; token?: string }
export declare class FsClient {
  constructor(opts?: FsClientOptions)
  readText(path: string): Promise<string>
  writeText(path: string, content: string): Promise<void>
}
