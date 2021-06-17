import BaseCont from "../prototype/BaseCont";

export default class UserCont extends BaseCont {
  constructor(options) {
    super(options)
  }
}

export function InitClass({ User }) {
  return new UserCont({ model: User })
}