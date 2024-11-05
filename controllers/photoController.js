import Photo from "../models/Photo.js";

const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    
    res.status(201).json({
      success: true,
      data: photo,
    });
  } catch (err) {
    console.log(err);
  }
};

export { createPhoto };
