class CaseTransform {
  camelToSnakeCase(str: string) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }

  camelArrayToSnakeCaseObject<T>(arr: string[]) {
    return arr.reduce<T>((acc, el) => ({
      ...acc,
      [el]: this.camelToSnakeCase(el)
    }), {} as T)
  }
}

export const caseTransform = new CaseTransform()