const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Mongoose invalid ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];

        return res.status(409).json({
            success: false,
            message: `${field} already exists`
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
};

module.exports = errorHandler;