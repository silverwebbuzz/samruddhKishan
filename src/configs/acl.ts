import { AbilityBuilder, Ability } from '@casl/ability'
import { useState } from 'react'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)
  const filteredRoles = []
  const roles = localStorage.getItem('role')

  // if (roles?.includes('admin')) {
  //   can('manage', 'all')
  // } else if (roles?.includes('client')) {
  //   can(['read'], 'acl-page')
  // }
  // if (roles?.includes('supervisor')) {
  //   can(['read', 'create', 'update', 'delete'], subject)
  // } else {
  //   can(['read', 'create', 'update', 'delete'], subject)
  // }
  if (role === 'admin') {
    can('manage', 'all')
  } else if (role === 'client') {
    can(['read'], 'acl-page')
  }
  if (role === 'supervisor') {
    can(['read', 'create', 'update', 'delete'], subject)
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor