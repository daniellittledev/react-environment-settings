
interface Loading {
  type: "Loading";
}
interface Success<T> {
  type: "Success";
  data: T;
}
interface Error {
  type: "Error";
  error: any;
}

export type State<T> = Loading | Success<T> | Error;

export function loading<T>() : State<T> {
  return {
    type: "Loading"
  }
}

export function success<T>(data: T) : State<T> {
  return {
    type: "Success",
    data: data
  }
}

export function error<T>(error: any) : State<T> {
  return {
    type: "Error",
    error: error
  }
}