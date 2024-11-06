const getIndexPage = (req, res) => {
  res.render("index", { currentPage: "index" });
};

const getAboutPage = (req, res) => {
  res.render("about", { currentPage: "about" });
};

const getRegisterPage = (req, res) => {
  res.render("register", { currentPage: "register" });
};

export { getIndexPage, getAboutPage, getRegisterPage };
