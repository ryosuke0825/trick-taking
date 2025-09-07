import { status } from '@grpc/grpc-js';

export function invalidArgument(message: string) {
  return Object.assign(new Error(message), { code: status.INVALID_ARGUMENT });
}
export function notFound(message: string) {
  return Object.assign(new Error(message), { code: status.NOT_FOUND });
}
export function internal(message: string) {
  return Object.assign(new Error(message), { code: status.INTERNAL });
}
