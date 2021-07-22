import BaseCont from '../../prototype/BaseCont'

export default class UserController extends BaseCont {
  constructor(options) {
    super(options)
  }
}

export function InitClass({ User }) {
  return new UserCont({ model: User })
}