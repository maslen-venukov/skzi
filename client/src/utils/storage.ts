const storage = {
  prefix: 'skzi',

  get<T>(key: string): T | null {
    return JSON.parse(localStorage.getItem(`${this.prefix}:${key}`) || 'null')
  },

  set(key: string, value: any) {
    return localStorage.setItem(`${this.prefix}:${key}`, JSON.stringify(value))
  },

  remove(key: string) {
    localStorage.removeItem(`${this.prefix}:${key}`)
  }
}

export default storage