export interface Org {
  id: number
  inn: string
  name: string
  isWorks: boolean
}

export interface OrgsState {
  isLoading: boolean
  orgs: Org[]
}

export interface GetOrgsResponse {
  orgs: Org[]
}