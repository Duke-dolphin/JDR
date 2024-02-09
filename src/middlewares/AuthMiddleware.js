import jwt from "jsonwebtoken";
import { UserService } from "../services/UserService";

const userVerification = async (req, res) => {
  console.log("inside middleware");
  const token = req.cookies.token;
  if (!token) return res.json({ status: false });
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) return res.json({ status: false });
    else {
      const user = await UserService.getUser(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};

export default userVerification;
