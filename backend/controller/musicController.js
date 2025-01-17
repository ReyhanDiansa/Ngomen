const MusicModel = require("../models/musicRev");
const userModel = require("../models/userModel");

exports.addReview = async (request, response) => {
  const date = new Date();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const timeNow = `${currentDate}-${currentMonth}-${currentYear}`;
  const artist = request.body.artist;
  const track = request.body.track;
  const musicID = `${artist}_${track}`;
  try {
    let data = {
      user_id: request.body.user_id,
      rate: request.body.rate,
      comment: request.body.comment,
      music_id: musicID,
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
    const checkReview = await MusicModel.findOne({
      user_id: request.body.user_id,
      music_id: musicID,
    });

    if (checkReview !== null) {
      return response.status(200).json({
        message: "Anda sudah pernah menambahkan review",
        success: false,
      });
    }
    let createData = await MusicModel.create(data);
    return response.status(200).json({
      message: "success add music review",
      data: createData,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({ message: error, success: false });
  }
};

exports.getMusicRev = async (request, response) => {
  try {
    const { page = 1, limit = 10 } = request.query;
    const skip = (page - 1) * limit;

    const musReview = await MusicModel.find()
      .skip(skip)
      .limit(limit);

    const countTotalReviews = await MusicModel.countDocuments();

    if (countTotalReviews === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada review", success: false });
    }

    const data = await Promise.all(
      musReview.map(async (review) => {
        const user = await userModel.findOne({ googleId: review.user_id });
        return { review, user };
      })
    );

    const totalPages = Math.ceil(countTotalReviews / limit);

    if (page > totalPages) {
      return response.status(400).json({
        message: "Page exceed total pages",
        success: false,
      });
    }

    const meta = {
      total_items: parseInt(countTotalReviews),
      current_page: parseInt(page),
      total_pages: parseInt(totalPages),
      per_page: parseInt(limit),
    };

    const result = {
      data,
      meta,
    };

    return response
      .status(200)
      .json({
        result,
        message: "sukses menampilkan data",
        success: true,
      });
  } catch (error) {
    return response.status(500).json({ message: error.message, success: false });
  }
};

exports.findMusicRev = async (request, response) => {
  try {
    const { id } = request.params;
    const musReview = await MusicModel.findById(id);
    if (musReview.length === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada review", success: false });
    }
    const user = await userModel.findOne({
      googleId: musReview.user_id,
    });
    const data = { review: musReview, user: user };

    return response.status(200).json({ data, success: true });
  } catch (error) {
    return response.status(400).json({ message: error.message, success: false });
  }
};

exports.updateMusicRev = async (request, response) => {
  try {
    const { id } = request.params;
    const find = await MusicModel.findOne({ _id: id });
    const artist = request.body.artist;
    const track = request.body.track;
    const musicID = `${artist}_${track}`;
    if (!find) {
      return response.status(200).json({
        message: `Cannot find any data with ID ${id}`,
        success: false,
      });
    }
    let data = {
      user_id: request.body.user_id,
      rate: request.body.rate,
      comment: request.body.comment,
      music_id: musicID,
    };
    const update = await MusicModel.findByIdAndUpdate(id, data, { new: true });
    return response.status(200).json({
      message: "Success update",
      data: {
        update,
      },
      success: true,
    });
  } catch (error) {
    return response
      .status(400)
      .json({ message: error.message, success: false });
  }
};

exports.deleteMusicRev = async (request, response) => {
  try {
    const { id } = request.params;
    const deleteRev = await MusicModel.findByIdAndDelete(id);

    if (!deleteRev) {
      return response.status(200).json({
        message: `Cannot find any movie review with that id`,
        success: false,
      });
    }

    return response
      .status(200)
      .json({ message: "Success delete movie review", success: true });
  } catch (error) {
    return response.status(400).json({ message: error.message, success: false });
  }
};

exports.checkReview = async (request, response) => {
  const artist = request.body.artist;
  const track = request.body.track;
  const musicID = `${artist}_${track}`;
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
    const checkReview = await MusicModel.findOne({
      user_id: request.body.user_id,
      music_id: musicID,
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

exports.getMusicRevById = async (request, response) => {
  try {
    const artist = request.body.artist;
    const track = request.body.track;
    const { page = 1, limit = 10 } = request.query;
    const skip = (page - 1) * limit;
    const musicID = `${artist}_${track}`;
    const musReview = await MusicModel.find({ music_id: musicID })
      .skip(skip)
      .limit(limit);

    const countMovReview = await MusicModel.countDocuments({ music_id:musicID });

    if (countMovReview === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada review", success: false });
    }

    const data = await Promise.all(
      musReview.map(async (review) => {
        const user = await userModel.findOne({ googleId: review.user_id });
        return { review, user };
      })
    );
    // Calculate average rate
    const avgRateData = await MusicModel.aggregate([
      { $match: { music_id:musicID } },
      { $group: { _id: null, averageRate: { $avg: "$rate" } } },
    ]);

    const averageRate = parseFloat(avgRateData[0]?.averageRate).toFixed(1) || 0;
    const totalPages = Math.ceil(countMovReview / limit);

    if (page > totalPages) {
      return response.status(400).json({
        message: "Page exceed total pages",
        success: false,
      });
    }

    const meta = {
      total_items: parseInt(countMovReview),
      current_page: parseInt(page),
      total_pages: parseInt(totalPages),
      per_page: parseInt(limit),
    };

    const result = {
      data,
      meta,
    };

    return response
      .status(200)
      .json({
        result,
        averageRate: parseFloat(averageRate),
        message: "sukses menampilkan data",
        success: true,
      });
  } catch (error) {
    return response.status(500).json({ message: error.message, success: false });
  }
};

exports.getMusicRevByIdUser = async (request, response) => {
  try {
    const user_id = request.body.user_id;
    const { page = 1, limit = 10 } = request.query;
    const skip = (page - 1) * limit;

    const musReview = await MusicModel.find({ user_id: user_id })
      .skip(skip)
      .limit(limit);

    const countUserReview = await MusicModel.countDocuments({ user_id: user_id });

    if (countUserReview === 0) {
      return response
        .status(200)
        .json({ message: "tidak ada review", success: false });
    }

    const data = await Promise.all(
      musReview.map(async (review) => {
        const user = await userModel.findOne({ googleId: review.user_id });
        return { review, user };
      })
    );

    const avgRateData = await MusicModel.aggregate([
      { $match: { user_id: user_id } },
      { $group: { _id: null, averageRate: { $avg: "$rate" } } },
    ]);

    const averageRate = parseFloat(avgRateData[0]?.averageRate).toFixed(1) || 0;
    const totalPages = Math.ceil(countUserReview / limit);

    if (page > totalPages) {
      return response.status(400).json({
        message: "Page exceed total pages",
        success: false,
      });
    }

    const meta = {
      total_items: parseInt(countUserReview),
      current_page: parseInt(page),
      total_pages: parseInt(totalPages),
      per_page: parseInt(limit),
    };

    const result = {
      data,
      meta,
    };

    return response
      .status(200)
      .json({
        result,
        averageRate: parseFloat(averageRate),
        message: "sukses menampilkan data",
        success: true,
      });
  } catch (error) {
    return response.status(500).json({ message: error.message, success: false });
  }
};