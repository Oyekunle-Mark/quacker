import { User, IUser } from './user.model'

/**
 * Saves a user in the DB.
 *
 * @param {String}  firstName
 * @param {String} lastName
 * @param {String}  email
 * @param {String}  password
 * @return {Promise<{ id: string, email: string }>}
 */
export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<{ id: string; email: string }> => {
  const newUser = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
  })

  return {
    id: newUser.id,
    email: newUser.email,
  }
}

/**
 * Finds a user by email.
 *
 * @param {String} email the user's email
 * @return {Promise<IUser>}
 */
export const findUser = (email: string): Promise<IUser> => {
  return User.findOne({
    where: { email: email.toLowerCase() },
    attributes: ['id', 'email', 'password'],
    raw: true,
  })
}
