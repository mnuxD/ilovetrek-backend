import { authServices } from "../services/index.js";

const { logIn } = authServices;

// login user
export const login = async (req, res) => {
  try {
    const userData = await logIn(req.body);
    console.log("hola", userData);
    if (userData) res.status(200).json(userData);
    else throw new Error();
  } catch (error) {
    res.status(403).send();
  }
};
