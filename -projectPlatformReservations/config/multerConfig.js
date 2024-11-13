import multer from "multer";
import path from "path";

// Configuración de almacenamiento de multer -> Donde se van a guardar las imagenes
// (En este caso almacenarlas en el almacenamiento del disco)
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Si este callback viene como ´null´, significa que no hay errores y que se puede continuar con el codigo
        callback(null, path.join(import.meta.dirname, '../public/uploads'));
        // path.join -> Nos ayuda a crear rutas combinadas y evitar errores futuros con las rutas
    },
    filename: (req, file, callback) => {
        // Nombre de la imagen -> fecha en la que se subio la imagen y el nombre original de la imagen  
        callback(null, `${Date.now()}-${file.originalname}`);
    }
}); 

// Filtro de archivos  
const fileFilter = (req, file, callback) => {
    // Validación de si el archivo que se esta subiendo es una imagen 

    // Si la imagen que se subio empieza por -> image/ -> Ya que todos los archivos file o de tipo imagen por si Mame Type empiezan por -> image/
    if (file.mimetype.startsWith('image/')) {
        callback(null, true);
    } else {
        callback(new Error('No es un archivo de imagen'), false);
    }
};

// Configuración de Multer 
// Instanciar multer con las caracteristicas que se dieron
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;