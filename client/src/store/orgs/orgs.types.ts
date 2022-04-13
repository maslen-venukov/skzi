export interface Org {
  id: number
  inn: string
  name: string
  isWorks: boolean
}

export interface CreateOrgData {
  name: string
  inn: string
}

export interface UpdateOrgData extends Partial<CreateOrgData> {
  isWorks?: boolean
}