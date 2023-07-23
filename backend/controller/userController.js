const userModel = require("../models/userModel");

const jsonwebtoken = require("jsonwebtoken");

exports.googleLogin = async (request, response) => {
  try {
    const email = request.body.email;
    const profileId = request.body.googleId;

    if (email === "" || profileId === "") {
      response.status(200).json({
        message: "Plesae login or check your id and email",
        success: false,
      });
    }
    // Check if the user is already registered in the database
    const user = await userModel.findOne({
      email: email,
      googleId: profileId,
    });

    if (!user) {
      // If the user is not registered, create a new user record in the database
      const newUser = {
        googleId: request.body.googleId,
        name: request.body.name,
        email: request.body.email,
        profile: request.body.profile,
      };

      const createdUser = await userModel.create(newUser);

      // Generate a JWT token with the user data
      const tokenPayload = {
        googleId: createdUser.googleId,
        name: createdUser.name,
        email: createdUser.email,
        profile: createdUser.profile,
      };

      const token = jsonwebtoken.sign(tokenPayload, process.env.JWT_SECRET_KEY);

      return response.status(200).json({
        message: "Success login",
        data: {
          token,
        },
        success: true,
      });
    } else {
      // Generate a JWT token with the user data
      const tokenPayload = {
        googleId: user.googleId,
        name: user.name,
        email: user.email,
        profile: user.profile,
      };

      const token = jsonwebtoken.sign(tokenPayload, process.env.JWT_SECRET_KEY);

      return response.status(200).json({
        message: "Success login",
        data: {
          token,
        },
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ message: error, success: false });
  }
};

exports.addUser = async (request, response) => {
  try {
    const data = {
      googleId: request.body.googleId,
      name: request.body.name,
      email: request.body.email,
      profile: request.body.profile,
    };
    if (
      data.email === "" ||
      data.profile === "" ||
      data.googleId === "" ||
      data.name === ""
    ) {
      response.status(200).json({ message: "isi semua data", success: false });
    }
    const user = await userModel.findOne({
      $or: [{ email: data.email }, { googleId: data.googleId }],
    });

    if (!user) {
      const newUser = {
        googleId: request.body.googleId,
        name: request.body.name,
        email: request.body.email,
        profile: request.body.profile,
      };

      const createdUser = await userModel.create(newUser);

      return response.status(200).json({
        message: "Success login",
        data: {
          createdUser,
        },
        success: true,
      });
    } else {
      return response.status(200).json({
        message: "User sudah ada",
        success: false,
      });
    }
  } catch (error) {
    return response.status(400).json({
      message: error,
      success: false,
    });
  }
};

exports.deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return response
        .status(200)
        .json({ message: `Cannot find any user with that id`, success: false });
    }

    response
      .status(200)
      .json({ message: "Success delete user", success: true });
  } catch (error) {
    return response.status(400).json({ message: error, success: false });
  }
};

exports.getUser = async (request, response) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada user", success: false });
    }
    response.status(200).json({ data: users, success: true });
  } catch (error) {
    response.status(400).json({ message: error, success: false });
  }
};

exports.updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const find = await userModel.findOne({ _id: id });
    if (!find) {
      return response.status(200).json({
        message: `Cannot find any data with ID ${id}`,
        success: false,
      });
    }
    const data = {
      googleId: request.body.googleId,
      name: request.body.name,
      email: request.body.email,
      profile: request.body.profile,
    };
    const update = await userModel.findByIdAndUpdate(id, data, { new: true });
    return response.status(200).json({
      message: "Success update",
      data: {
        update,
      },
      success: true,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

exports.findUser = async (request, response) => {
  try {
    const { id } = request.params;
    const users = await userModel.findById(id);
    if (users.length === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada user", success: false });
    }
    response.status(200).json({ data: users, success: true });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};
