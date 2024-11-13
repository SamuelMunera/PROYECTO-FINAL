import Business from "../models/Business.js";
import User from "../models/User.js";

async function getAll(req, res) {
  try {

    const query = req.query.category ? {category: req.query.category} : {} 

    const business = await Business.find({ ...query, deletedAt: null })
    .populate("userBusiness", ["-password"])
    .populate("services");
    return res.json(business);
  } catch (error) {
    console.log(error);
    return res.status(404).json("negocio no encontrado");
  }}

  async function getById(req, res) {
    try {
      const business = await Business.findById(req.params.id).populate("services");
      return res.json(business);
    } catch (error) {
      console.log(error);
      return res.status(404).json("Negocio no encontrado");
    }
  }
  
  async function create(req, res) {

    const user = await User.findById(req.auth.id);

    const typeUser = user.typeUser;

    if (typeUser == "66e2360cc4e29e2f6762e241") {

      try {
        const newBusiness = await Business.create({
          name: req.body.name,
          slogan: req.body.slogan,
          address: req.body.address,
          category: req.body.category,
          phone: req.body.phone,
          email: req.body.email,
          businessLogo: req.file.filename,
  
          userBusiness: req.auth.id
        });
    
        return res.status(201).json(newBusiness);
      } catch (error) {
        console.log(error.message || error);
        return res.status(501).json("Error en el servidor");
      }

    }

    return res.json("No tienes permiso para crear un negocio");
  }
  
  async function update(req, res) {

    const user = await User.findById(req.auth.id);

    const typeUser = user.typeUser;

    if (typeUser == "66e2360cc4e29e2f6762e241") {

      const businessToUpdate = await Business.findById(req.params.id);
  
      if (businessToUpdate !== null) {
        const { name, adress, phone, email, category, slogan } = req.body;
        const businessLogo = req.file.filename;
    
       businessToUpdate.name = name || businessToUpdate.name;
       businessToUpdate.slogan = slogan || businessToUpdate.slogan;
        businessToUpdate.address = adress || businessToUpdate.address;
        businessToUpdate.category = category || businessToUpdate.category;
        businessToUpdate.phone = phone || businessToUpdate.phone;
        businessToUpdate.email = email || businessToUpdate.email;
        businessToUpdate.businessLogo = businessLogo || businessToUpdate.businessLogo;
        
        await businessToUpdate.save();
    
        return res.json("El negocio se actualizo");
      } else {
        return res.json("No existe negocio con este id");
      }

    }

    return res.json("No tienes permiso para editar un negocio");

  }
  
  async function destroy(req, res) {

    const user = await User.findById(req.auth.id);

    const typeUser = user.typeUser;

    if (typeUser == "66e2360cc4e29e2f6762e241") {
      try {
        const businessToDelete = await Business.findById(req.params.id);
    
        if (businessToDelete) {
          businessToDelete.deletedAt = Date.now();
          businessToDelete.save();
    
          return res.json("El negocio fue eliminado con exito");
        } 
        
      } catch (err) {
        console.log(err);
        return res.status(404).json("Ups, hubo un error al eliminar el negocio que indicaste, puede que el negocio con el ID indicado no exista en los registros");
      }
    }

    return res.json("No tienes permiso para eliminar un negocio");

  }
  
  export default {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    destroy: destroy,
  };
  