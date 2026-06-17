interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class InMemoryCache {
  private readonly store = new Map<string, CacheEntry<any>>();
  private readonly defaultTtlMs: number;

  constructor(defaultTtlMs = 30000) {
    this.defaultTtlMs = defaultTtlMs;
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlMs?: number): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTtlMs),
    });
  }

  invalidateAll(): void {
    this.store.clear();
  }
}
