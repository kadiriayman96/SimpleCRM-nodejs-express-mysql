import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all fournisseur + commandes
const getFournisseur = async (req, res, next) => {
  try {
    const count = await prisma.fournisseur.count();

    if (count === 0) {
      return res
        .status(404)
        .json({ error: "Ajouter au moins un fournisseur!" });
    }
    const fournisseur = await prisma.fournisseur.findMany({
      include: {
        commande: true,
      },
    });

    return res.status(200).json(fournisseur);
  } catch (error) {
    next(error);
  }
};

// Add new fournisseur
const addFournisseur = async (req, res, next) => {
  try {
    const { Nom, Adresse, Ville, NumeroTelephone, Email } = req.body;
    const fournisseur = await prisma.fournisseur.create({
      data: {
        Nom,
        Adresse,
        Ville,
        NumeroTelephone,
        Email,
      },
    });
    return res.status(201).json({
      success: "Le fournisseur a été ajouté avec succes",
      fournisseur,
    });
  } catch (error) {
    next(error);
  }
};

// Update existent fournisseur
const updateFournisseur = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Nom, Adresse, Ville, NumeroTelephone, Email } = req.body;
    const existingFournisseur = await prisma.fournisseur.findUnique({
      where: {
        idFournisseur: parseInt(id),
      },
    });
    if (!existingFournisseur) {
      return res.status(404).json({ error: "Le fournisseur n'existe pas" });
    }
    const updatedFournisseur = await prisma.fournisseur.update({
      where: {
        idFournisseur: parseInt(id),
      },
      data: {
        Nom,
        Adresse,
        Ville,
        NumeroTelephone,
        Email,
      },
    });
    return res.status(200).json({
      success: "Le fournisseur a été modifié avec succes",
      updatedFournisseur,
    });
  } catch (error) {
    next(error);
  }
};

// Delete fournisseur
const deleteFournisseur = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingFournisseur = await prisma.fournisseur.findUnique({
      where: {
        idFournisseur: parseInt(id),
      },
    });
    if (!existingFournisseur) {
      return res
        .status(404)
        .json({ error: "Le fournisseur à supprimer n'existe pas" });
    }
    const deletedFournisseur = await prisma.fournisseur.delete({
      where: {
        idFournisseur: parseInt(id),
      },
    });
    return res.status(200).json({
      success: "Le fournisseur a été supprime avec succes",
      deletedFournisseur,
    });
  } catch (error) {
    next(error);
  }
};

//Get single fournisseur + commandes
const getSingleFournisseur = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fournisseur = await prisma.fournisseur.findUnique({
      where: {
        idFournisseur: parseInt(id),
      },
      include: {
        commande: true,
      },
    });
    if (!fournisseur) {
      return res.status(404).json({ error: "Le fournisseur n'existe pas" });
    }
    return res.status(200).json(fournisseur);
  } catch (error) {
    next(error);
  }
};

export {
  getFournisseur,
  addFournisseur,
  updateFournisseur,
  deleteFournisseur,
  getSingleFournisseur,
};
