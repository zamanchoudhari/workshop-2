const Role = require("../models/role");

exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({
                message: "Role with this name already exists"
            });
        }

        const newRole = await Role.create({ name, description });

        res.status(201).json({
            message: "Role created successfully",
            role: newRole
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json({
            message: "Roles fetched successfully",
            roles
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching roles",
            error: error.message
        });
    }
};