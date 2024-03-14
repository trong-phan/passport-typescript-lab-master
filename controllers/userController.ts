import { userModel } from '../models/userModel';

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  try {
    let user = userModel.findOne(email);
    if (user) {
      if (isUserValid(user, password)) {
        return user;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};
const getUserById = (id: any) => {
  try {
    let user = userModel.findById(id);
    if (user) {
      return user;
    }
    return null;
  } catch {
    return null;
  }
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

const addNewUser = (user: Express.User) => {
  if (getUserById(user.id)) {
    throw new Error(`User with ID ${user.id} is existing`);
  }
  userModel.add(user);
};

export { getUserByEmailIdAndPassword, getUserById, addNewUser };
