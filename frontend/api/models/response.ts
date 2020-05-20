export default interface Response<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}
