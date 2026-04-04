'use server'

import config from '@payload-config'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionHandler } from 'payload'
import { importMap } from './importMap'

export const serverFunction: ServerFunctionHandler = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}
