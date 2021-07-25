const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const secret = process.env.SECRET;
const resetSecret = process.env.RESET_SECRET;
const activateSecret = process.env.ACTIVATE_SECRET;

//Password encryption
const hashing = async (value) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(value, salt);
    return hashed;
  } catch (error) {
    return error;
  }
};

//Password comparison for login
const hashCompare = async (password, hashValue) => {
  try {
    return await bcrypt.compare(password, hashValue);
  } catch (error) {
    return error;
  }
};

//Token creation for account activation
const createJWTForActivation = async ({ name, email, password }) => {
  return await JWT.sign(
    {
      name,
      email,
      password,
    },
    activateSecret,
    {
      expiresIn: "20m",
    }
  );
};

//Token verification for account activation
const verifyTokenForActivation = async (req, res, next) => {
  const activationLink = req.body.activationLink;

  if (activationLink) {
    JWT.verify(activationLink, activateSecret, (err, decode) => {
      if (decode !== undefined) {
        req.body.auth = decode;
        next();
      } else {
        return res.json({ error: "Incorrect token or token is expired" });
      }
    });
  } else {
    return res.json({ error: "Authentication error" });
  }
};

//Token creation for login
const createJWT = async ({ email, id }) => {
  return await JWT.sign(
    {
      email,
      id,
    },
    secret,
    {
      expiresIn: "24h",
    }
  );
};

//Token creation for reset password
const createJWTForReset = async ({ id }) => {
  return await JWT.sign(
    {
      id,
    },
    resetSecret,
    {
      expiresIn: "20m",
    }
  );
};

//Token verification for reset password
const verifyTokenForReset = async (req, res, next) => {
  const resetLink = req.body.resetLink;

  if (resetLink) {
    JWT.verify(resetLink, resetSecret, (err, decode) => {
      if (decode !== undefined) {
        next();
      } else {
        return res.json({ error: "Incorrect token or token is expired" });
      }
    });
  } else {
    return res.json({ error: "Authentication error" });
  }
};

module.exports = {
  hashing,
  hashCompare,
  createJWT,
  createJWTForActivation,
  verifyTokenForActivation,
  createJWTForReset,
  verifyTokenForReset,
};
