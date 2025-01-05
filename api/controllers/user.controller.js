// Test user
export const test = async (req, res) => {
  res.json({ message: "API running" });
};

// Sign out
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Logged out successfully");
  } catch (error) {
    next(error);
  }
};
