import { CodeError } from '../../lib/routerError'

export class UserError extends CodeError {
  constructor(message, code = 30000) {
    super(message)
    this.code = code
  }
}