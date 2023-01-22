import { BaseError } from 'make-error-cause'
class CustomBaseError extends BaseError {
  readonly code?: string
  constructor(message?: string, code?: string) {
    super(message)
    this.code = code
  }
}
export class ValidationError extends CustomBaseError {}
export class NotFoundError extends CustomBaseError {}
export class NotAuthorizedError extends CustomBaseError {}
export class InvalidDataError extends CustomBaseError {}
export class InvalidOperationError extends CustomBaseError {}
