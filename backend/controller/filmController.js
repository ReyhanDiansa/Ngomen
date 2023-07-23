const FilmModel = require("../models/filmRev");
const userModel = require("../models/userModel");

exports.addReview = async (request, response) => {
  const date = new Date();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const timeNow = `${currentDate}-${currentMonth}-${currentYear}`;

  try {
    let data = {
      user_id: request.body.user_id,
      rate: request.body.rate,
      comment: request.body.comment,
      movie_id: request.body.movie_id,
      time: timeNow,
    };
    const user = await userModel.findOne({
      googleId: request.body.user_id,
    });
    if (!user) {
      return response.status(200).json({
        message:
          "user tersebut tidak ada, silahkan login dahulu atau cek kembali",
        success: false,
      });
    }
    for (const [key, value] of Object.entries(data)) {
      if (!value || value === "") {
        console.log(`Error: ${key} is empty`);
        return response
          .status(200)
          .json({ message: `${key} kosong, mohon di isi`, success: false });
      }
    }
    const checkReview = await FilmModel.findOne({
      user_id: request.body.user_id,
      movie_id: request.body.movie_id,
    });

    if (checkReview !== null) {
      return response.status(200).json({
        message: "Anda sudah pernah menambahkan review",
        success: false,
      });
    }

    let createData = await FilmModel.create(data);
    return response.status(200).json({
      message: "success add film comment",
      data: createData,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({ message: error, success: false });
  }
};

exports.getMovieRev = async (request, response) => {
  try {
    const movReview = await FilmModel.find();
    if (movReview.length === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada review", success: false });
    }

    const data = [];

    for (const review of movReview) {
      const user = await userModel.findOne({
        googleId: review.user_id,
      });
      const reviewAndUser = { review: review, user: user };
      data.push(reviewAndUser);
    }

    response.status(200).json({ data, success: true });
  } catch (error) {
    response.status(400).json({ message: error, success: false });
  }
};

exports.findMovieRev = async (request, response) => {
  try {
    const { id } = request.params;
    const movReview = await FilmModel.findById(id);
    if (movReview.length === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada review", success: false });
    }
    const user = await userModel.findOne({
      googleId: movReview.user_id,
    });
    const data = { review: movReview, user: user };

    response.status(200).json({ data, success: true });
  } catch (error) {
    response.status(400).json({ message: error, success: false });
  }
};

exports.updateFilmRev = async (request, response) => {
  const date = new Date();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const timeNow = `${currentDate}-${currentMonth}-${currentYear}`;
  try {
    const { id } = request.params;
    const find = await FilmModel.findOne({ _id: id });
    if (!find) {
      return response
        .status(200)
        .json({
          message: `Cannot find any data with ID ${id}`,
          success: false,
        });
    }
    let data = {
      user_id: request.body.user_id,
      rate: request.body.rate,
      comment: request.body.comment,
      movie_id: request.body.movie_id,
      time: timeNow,
    };
    const update = await FilmModel.findByIdAndUpdate(id, data, { new: true });
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

exports.deleteMovieRev = async (request, response) => {
  try {
    const { id } = request.params;
    const deleteRev = await FilmModel.findByIdAndDelete(id);

    if (!deleteRev) {
      return response
        .status(200)
        .json({
          message: `Cannot find any movie with that id`,
          success: false,
        });
    }

    response
      .status(200)
      .json({ message: "Success delete movie review", success: true });
  } catch (error) {
    return response.status(400).json({ message: error, success: false });
  }
};

exports.checkReview = async (request, response) => {
  try {
    const user = await userModel.findOne({
      googleId: request.body.user_id,
    });
    if (!user) {
      return response.status(200).json({
        message:
          "user tersebut tidak ada, silahkan login dahulu atau cek kembali",
        success: false,
      });
    }
    const checkReview = await FilmModel.findOne({
      user_id: request.body.user_id,
      movie_id: request.body.movie_id,
    });
    if (checkReview !== null) {
      return response
        .status(200)
        .json({ add_permission: false, success: true });
    }
    return response.status(200).json({ add_permission: true, success: true });
  } catch (error) {
    return response.status(400).json({ message: error, success: false });
  }
};

exports.getMovieRevById = async (request, response) => {
  try {
    const movie_id = request.body.movie_id;
    const movReview = await FilmModel.find({ movie_id: movie_id });
    if (movReview.length === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada review", success: false });
    }
    const data = [];

    for (const review of movReview) {
      const user = await userModel.findOne({
        googleId: review.user_id,
      });
      const reviewAndUser = { review: review, user: user };
      data.push(reviewAndUser);
    }

    response
      .status(200)
      .json({ data, message: "sukses menampilkan data", success: true });
  } catch (error) {
    response.status(400).json({ message: error, success: false });
  }
};

exports.getMovieRevByIdUser = async (request, response) => {
  try {
    const user_id = request.body.user_id;
    const movReview = await FilmModel.find({ user_id: user_id });
    if (movReview.length === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada review", success: false });
    }
    const data = [];

    for (const review of movReview) {
      const user = await userModel.findOne({
        googleId: review.user_id,
      });
      const reviewAndUser = { review: review, user: user };
      data.push(reviewAndUser);
    }

    response
      .status(200)
      .json({ data, message: "sukses menampilkan data", success: true });
  } catch (error) {
    response.status(400).json({ message: error, success: false });
  }
};
