export type Ok<T> = {
  ok: true
  res: T
}

export type Err<E> = {
  ok: false
  res: E
}

export type Result<T, E> = Ok<T> | Err<E>

export function ok<T>(res: T): Ok<T> {
  return { ok: true, res }
}

export function err<E>(res: E): Err<E> {
  return { ok: false, res }
}
