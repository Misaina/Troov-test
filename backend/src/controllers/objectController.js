const Object = require('../models/Object');
const { handleServerError, sendSuccessResponse, sendErrorResponse } = require('../utils/serverMessage');

/**
 * @param {Object} req 
 * @param {Object} res
 */
const createObject = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newObject = new Object({
            name,
            description,
            user: req.user.id
        });

        const savedObject = await newObject.save();
        sendSuccessResponse(res, 'Create success!' , savedObject );
    } catch (error) {
        handleServerError(res, error);
    }
};

/**
 * @param {Object} req 
 * @param {Object} res
 */
const getObjects = async (req, res) => {
    try {
        const objects = await Object.find({ user: req.user.id });
        sendSuccessResponse(res, 'Find all success!', objects);
    } catch (error) {
        handleServerError(res, error);
    }
};

/**
 * @param {Object} req 
 * @param {Object} res
 */
const updateObject = async (req, res) => {
    const { name, description } = req.body;

    try {
        let object = await Object.findById(req.params.id);

        if (!object) {
            return sendErrorResponse(res, 404, 'Object not found');
        }

        if (object.user.toString() !== req.user.id) {
            return sendErrorResponse(res, 401, 'User not authorized');
        }

        object = await Object.findByIdAndUpdate(req.params.id, { name, description }, { new: true });

        sendSuccessResponse(res, 'Update success!', object);
    } catch (error) {
        handleServerError(res, error);
    }
};

/**
 * @param {Object} req 
 * @param {Object} res
 */
const deleteObject = async (req, res) => {
    try {
        const object = await Object.findById(req.params.id);

        if (!object) {
            return sendErrorResponse(res, 404, 'Object not found');
        }

        if (object.user.toString() !== req.user.id) {
            return sendErrorResponse(res, 401, 'User not authorized');
        }

        await Object.findByIdAndDelete(req.params.id);
        sendSuccessResponse(res, 'Object removed');
    } catch (error) {
        handleServerError(res, error);
    }
};

module.exports = {
    createObject,
    getObjects,
    updateObject,
    deleteObject
};
