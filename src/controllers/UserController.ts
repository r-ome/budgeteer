import User from '../models/User';

export const getAll = async (): Promise<[]> => {
  try {
    return await User.all();
  } catch (e) {
    console.error(e);
  }
};

export const create = async (username: string): Promise<boolean> => {
  try {
    const user = new User({ user_id: null, username });
    return user.create();
  } catch (e) {
    console.error({ controller: e });
  }
};

export const get = async (userId: number): Promise<unknown> => {
  try {
    return await User.find(userId);
  } catch (e) {
    console.error({ controller: e });
    throw e;
  }
};

export const update = async (userId: number, username: string): Promise<any> => {
  try {
    const user = await User.find(userId);
    user.attributes.username = username;
    return await user.save();
  } catch (e) {
    console.error({ controller: e });
    throw e;
  }
};