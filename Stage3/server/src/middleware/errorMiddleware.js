import ApiError from "../apiError/apiError";

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }
  return res.status(500).json(err.message);
};