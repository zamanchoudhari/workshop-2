const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");


exports.createUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, roleId } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            mobileNumber,
            role: roleId
        });

        await newUser.populate({
            path: 'role',
            select: 'name description',
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: existingUser.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};


exports.getUsers = async (req, res) => {
    res.json({
        message: "Get All Users API"
    });
};


exports.getUserById = async (req, res) => {
    res.json({
        message: "Get User By ID API"
    });
};


exports.updateUser = async (req, res) => {
    res.json({
        message: "Update User API"
    });
};

// Delete User
exports.deleteUser = async (req, res) => {
    res.json({
        message: "Delete User API"
    });
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .populate({
                path: 'role',
                select: 'name description',
            });

        res.status(200).json({
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message,
        });
    }
};
exports.logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        user.version += 1;
        await user.save();
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};