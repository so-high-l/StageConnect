import jwt from "jsonwebtoken";

export const isCompany = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ error: "Access Denied" });
    }

    const tokenValue = token.replace("Bearer ", "");

    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);

    if (decodedToken.role !== "company") {
      return res
        .status(403)
        .json({ error: "Access Denied: Only companies are allowed" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const isStudent = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ error: "Access Denied" });
    }

    const tokenValue = token.replace("Bearer ", "");

    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);

    if (decodedToken.role !== "student") {
      return res
        .status(403)
        .json({ error: "Access Denied: Only students are allowed" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
