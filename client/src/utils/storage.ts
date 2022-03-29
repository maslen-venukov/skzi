const prefix = 'skzi'

const storage = {
  get<T>(key: string): T | null {
    return JSON.parse(localStorage.getItem(`${prefix}:${key}`) || 'null')
  },

  set(key: string, value: any) {
    localStorage.setItem(`${prefix}:${key}`, JSON.stringify(value))
  },

  remove(key: string) {
    localStorage.removeItem(`${prefix}:${key}`)
  }
}

export default storage