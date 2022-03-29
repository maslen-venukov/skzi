import { Roles } from '../enums/Roles'

export interface Page {
  path: string
  label: string
  element: React.ReactNode
  icon: React.ReactNode
  roles?: Roles[]
  children?: ChildPage[]
}

export interface ChildPage extends Pick<Page, 'path' | 'element' | 'children'> {}