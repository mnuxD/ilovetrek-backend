import { authServices } from "../services/index.js";

const { logIn, logInAdmin } = authServices;

// login user
export const login = async (req, res) => {
  try {
    const userData = await logIn(req.body);
    if (userData) res.status(200).json(userData);
    else throw new Error();
  } catch (error) {
    res.status(403).send();
  }
};

// login admin
export const loginAdmin = async (req, res) => {
  try {
    const adminData = await logInAdmin(req.body);
    if (adminData) res.status(200).json(adminData);
    else throw new Error();
  } catch (error) {
    res.status(403).send();
  }
};
