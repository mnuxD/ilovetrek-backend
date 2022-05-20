import { adminServices } from "../services/index.js";

const { create, getAll, getOne } = adminServices;

//register a new admin
export const register = async (req, res) => {
  try {
    const newAdmin = await create(req.body);
    console.log(newAdmin);
    res.status(201).json(newAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

// get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await getAll();
    if (admins.length === 0) res.status(204).send();
    else res.status(200).json(admins);
    console.log("admins", admins);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
// get one user by id
export const getOneAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await getOne(id);
    if (admin) res.json(admin);
    else throw new Error();
  } catch (error) {
    res.status(500).json({ error });
  }
};
