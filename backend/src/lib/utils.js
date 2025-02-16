import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, //prevents client side js from accessing the cookie
    secure: process.env.NODE_ENV !== "development", //only send the cookie in https
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict", //prevents csrf attacks
  });
  return token;
};
