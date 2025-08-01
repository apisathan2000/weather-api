const notFound = function (req, res, next) {
  return res.status(404).json({ msg: `Route not found` });
};


export default notFound;