module.exports = function paginate(model) {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1; // ?page=1
      const limit = parseInt(req.query.limit) || 10; // ?limit=10
      const skip = (page - 1) * limit;

      const [results, total] = await Promise.all([
        model.find().skip(skip).limit(limit), // fetch data
        model.countDocuments(), // total count
      ]);

      const totalPages = Math.ceil(total / limit);

      // attach to response, to use in controller/route
      res.pagination = {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      };

      res.paginatedResults = results;

      next();
    } catch (err) {
      next(err);
    }
  };
};
