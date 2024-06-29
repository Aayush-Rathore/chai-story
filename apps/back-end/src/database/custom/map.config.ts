class userMap<K, V> {
  private map = new Map<K, V>();
  public set(key: K, value: V): void {
    this.map.set(key, value);
  }

  public get(key: K): V | void {
    return this.map.get(key);
  }

  public has(key: K): boolean {
    return this.map.has(key);
  }

  public size(): number {
    return this.map.size;
  }

  public delete(key: K): void {
    this.map.delete(key);
  }

  public clear(): void {
    this.map.clear();
  }
}

export default new userMap<string, { fileId: string; fileUrl: string }>();
