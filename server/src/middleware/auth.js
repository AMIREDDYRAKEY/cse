export const authMiddleware = (req, res, next) => {
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin123";
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

    if (token !== ADMIN_TOKEN) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    next();
};
