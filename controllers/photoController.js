import Photo from "../models/Photo.js";

const createPhoto = async (req, res) => {
  try {
    await Photo.create({
      name: req.body.name,
      description: req.body.description,
      user: res.locals.user._id,
    });

    res.status(201).redirect("/users/dashboard");
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

const getAPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    res.status(200).render("photo", { photo, currentPage: "photos" });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

export { createPhoto, getAllPhotos, getAPhoto };
