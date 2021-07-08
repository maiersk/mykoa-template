export default function UsersRouter (Router, { UserCont }) {
  const users = new Router()
  users.prefix('/users')

  users.get('/', UserCont.getAll)

  users.get('/:id', UserCont.get)

  users.post('/', UserCont.create)

  users.put('/:id', UserCont.update)

  users.delete('/:id', UserCont.delete)

  return users
}