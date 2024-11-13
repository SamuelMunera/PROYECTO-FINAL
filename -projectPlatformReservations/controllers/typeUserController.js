import TypeUser from "../models/TypeUser.js";

async function getAll(req, res) {
  try {
    const typeUsers = await TypeUser.find({ deletedAt: null });
    return res.json(typeUsers);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Tpo de Usuario no encontrado");
  }
}

async function getById(req, res) {
  try {
    const typeUser = await TypeUser.findById(req.params.id);
    return res.json(typeUser);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Tipo de Usuario no encontrado");
  }
}

async function create(req, res) {
  try {
    const newTypeUser = await TypeUser.create({
      type: req.body.type,
      
    });

    return res.status(201).json(newTypeUser);
  } catch (error) {
    console.log(error.errors.type.properties.message);
    return res.status(501).json("Error en el servidor");
  }
}

async function update(req, res) {
  const typeUserToUpdate = await TypeUser.findById(req.params.id);

  if (typeUserToUpdate !== null) {
    const { type} = req.body;

    typeUserToUpdate.type = type || typeUserUpdate.type;
  

    await typeUserToUpdate.save();

    return res.json("El tipo de usuario se actualizo");
  } else {
    return res.json("El tipo de usuario no exite con este id");
  }
}

async function destroy(req, res) {
  try {
    const typeUserToDelete = await TypeUser.findById(req.params.id);

    if (typeUserToDelete) {
      typeUserToDelete.deletedAt = Date.now();
      typeUserToDelete.save();

      return res.json("Tipo de Usuario eliminado");
    }
    
  } catch (err) {
    console.log(err);
    return res.status(404).json("Ups, hubo un error al eliminar el rol que indicaste, puede que el rol con el ID indicado no exista en los registros");
  }
  
}

export default {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  destroy: destroy,
};