import { userServices } from "../services/index.js";

const { create, getAll, getAllGuidesRequests, getOne, update1, update2 } =
  userServices;

//register a new user
export const register = async (req, res) => {
  try {
    const newUser = await create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send();
  }
};

// get all users in the platform
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAll();
    if (users.length === 0) res.status(204).send();
    else res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// get all requests to guide in the platform
export const getAllRequests = async (req, res) => {
  try {
    const users = await getAllGuidesRequests();
    if (users.length === 0) res.status(204).send();
    else res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
// get one user by id
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getOne(id);
    if (user) res.json(user);
    else throw new Error();
  } catch (error) {
    res.status(500).json({ error });
  }
};

// update user with password
export const updateUser1 = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getOne(id);
    if (!user) throw new Error();
    const userUpdated = await update1(user, req.body);
    if (!userUpdated) throw new Error();
    else res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).send(error);
  }
};

// update user without password
export const updateUser2 = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getOne(id);
    if (!user) throw new Error();
    const userUpdated = await update2(user, req.body);
    if (!userUpdated) throw new Error();
    else res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).send(error);
  }
};
