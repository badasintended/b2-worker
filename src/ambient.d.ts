declare module '*.css' {
  const v: string
  export default v
}

declare module '*.rule' {
  const v: string
  export default v
}

declare module '*.txt' {
  const v: string
  export default v
}

declare module '*.raw.js' {
  const v: string
  export default v
}

declare module '@gerhobbelt/gitignore-parser' {
  import types from 'gitignore-parser'

  const compile = types.compile
  type Compiled = ReturnType<typeof compile>

  export { compile, Compiled }
}
