const getIndexPage = (req, res) => {
  res.render("index", { currentPage: "index" });
};

const getAboutPage = (req, res) => {
  res.render("about", { currentPage: "about" });
};

export { getIndexPage, getAboutPage };
