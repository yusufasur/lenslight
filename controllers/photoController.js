import Photo from "../models/Photo.js";

const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);

    res.status(201).json({
      success: true,
      data: photo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({});

    res.status(200).render("photos", { photos, currentPage: "photos" });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

export { createPhoto, getAllPhotos };
