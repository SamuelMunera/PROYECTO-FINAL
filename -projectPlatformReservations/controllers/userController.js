import User from "../models/User.js";
import TypeUser from "../models/TypeUser.js";

async function getAll(req, res) {
  try {
    const users = await User.find({ deletedAt: null })
    .populate("typeUser", ["type"]);
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Usuario no encontrado");
  }
};

async function getById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Usuario no encontrado");
  }
};

async function create(req, res) {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      password: req.body.password,
      phone: req.body.phone,

      typeUser: req.body.typeUser,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.errors.name.properties.message);
    return res.status(501).json("Error en el servidor");
  }
};

async function update(req, res) {
  const userToUpdate = await User.findById(req.params.id);

  try {
    if (userToUpdate !== null) {
      const { name, email, address ,password, phone, typeUser } = req.body;
  
      userToUpdate.name = name || userToUpdate.name;
      userToUpdate.email = email || userToUpdate.email;
      userToUpdate.address = address || userToUpdate.address;
      userToUpdate.password = password || userToUpdate.password;
      userToUpdate.phone = phone || userToUpdate.phone;

      userToUpdate.typeUser = typeUser || userToUpdate.typeUser;
  
      await userToUpdate.save();
  
      return res.json("El usuario se actualizo");
    } else {
      return res.json("El usuario no exite con este id");
    }
  } catch (err) {
    console.log(err);
    return res.json("Ups, hubo un error al intentar actualizar el usuario");
  }
};

async function destroy(req, res) {
  try {
    const userToDelete = await User.findById(req.params.id);

    if (userToDelete) {
      userToDelete.deletedAt = Date.now();
      userToDelete.save();

      return res.json("Usuario eliminado con exito");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json(
        "Ups, hubo un error al eliminar el usuario que indicaste, puede que el usuario con el ID indicado no exista en los registros"
      );
  }
};

export default {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  destroy: destroy,
};
