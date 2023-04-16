const {Cars} = require("./models")

async function handleCreateCar(req, res) {
  console.log('req.body',req.body);
  const cars = await Cars.create(req.body);
  res.redirect("/");
}

async function handleListCars(req, res) {
  const cars = await Cars.findAll();
  res.render("management-layout",{cars});
  
}

async function handleUpdateCarForm(req, res) {
  const id = req.param.id;
  const cars = await Cars.findByPk(id)
  res.render("update",{cars});  
}

function handleGetCar(req, res) {
  const car = req.car;

  res.status(200).json(car);
}

async function handleUpdateCar(req, res) {
  const id =req.params.id;

  await Cars.update(req.body,{where:{id}})

  res.redirect("/");
}

function handleDeleteCar(req, res) {
  const car = req.car;

  car.delete();

  res.status(204).end();
}

module.exports = {
  handleCreateCar,
  handleListCars,
  handleGetCar,
  handleUpdateCar,
  handleUpdateCarForm,
  handleDeleteCar,
};
