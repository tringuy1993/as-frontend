export default function handler(req, res) {
  res.status(403).json({ message: "Forced 403 error" });
}
