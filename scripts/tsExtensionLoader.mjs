import { existsSync } from 'node:fs'
import { dirname, resolve as resolvePath } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

function isRelativeOrAbsolute(specifier) {
  return specifier.startsWith('.') || specifier.startsWith('/') || /^[A-Za-z]:[\\/]/.test(specifier)
}

function hasExtension(specifier) {
  return /\.[cm]?[jt]sx?$/.test(specifier)
}

export async function resolve(specifier, context, defaultResolve) {
  try {
    return await defaultResolve(specifier, context, defaultResolve)
  } catch (error) {
    if (!isRelativeOrAbsolute(specifier) || hasExtension(specifier) || !context.parentURL) throw error

    const parentPath = fileURLToPath(context.parentURL)
    const basePath = resolvePath(dirname(parentPath), specifier)
    const candidates = [`${basePath}.ts`, resolvePath(basePath, 'index.ts')]
    const candidate = candidates.find(path => existsSync(path))
    if (!candidate) throw error

    return {
      shortCircuit: true,
      url: pathToFileURL(candidate).href
    }
  }
}
