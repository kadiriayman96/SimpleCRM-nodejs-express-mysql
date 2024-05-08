import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all commandes avec fournisseur + lignecommande information
const getCommandes = async (req, res, next) => {
  try {
    const commandes = await prisma.commande.findMany({
      include: {
        fournisseur: true,
      },
    });

    if (commandes.length === 0) {
      return res.status(404).json({ error: "Aucune commande trouvée!" });
    }

    return res.status(200).json(commandes);
  } catch (error) {
    next(error);
  }
};

// Add new commande
const addCommande = async (req, res, next) => {
  try {
    const { NumeroCommande, DateCommande, idFournisseur } = req.body;
    const commande = await prisma.commande.create({
      data: {
        NumeroCommande,
        DateCommande: new Date(DateCommande),
        fournisseur: {
          connect: {
            idFournisseur: idFournisseur,
          },
        },
      },
    });
    return res
      .status(201)
      .json({ success: "La commande a été ajoutée avec succès", commande });
  } catch (error) {
    next(error);
  }
};

// Update existent commande
const updateCommande = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existCommande = await prisma.commande.findUnique({
      where: {
        idCommande: parseInt(id),
      },
    });
    if (!existCommande) {
      return res
        .status(404)
        .json({ error: "La commande à modifier n'existe pas" });
    }

    const { NumeroCommande, DateCommande, idFournisseur } = req.body;
    const updatedCommande = await prisma.commande.update({
      where: {
        idCommande: parseInt(id),
      },
      data: {
        NumeroCommande,
        DateCommande: new Date(DateCommande),
        fournisseur: {
          connect: {
            idFournisseur: idFournisseur,
          },
        },
      },
    });

    return res.status(200).json({
      success: "La commande a été modifiée avec succès",
      updatedCommande,
    });
  } catch (error) {
    next(error);
  }
};

// Delete existent commande
const deleteCommande = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existCommande = await prisma.commande.findUnique({
      where: {
        idCommande: parseInt(id),
      },
    });
    if (!existCommande) {
      return res
        .status(404)
        .json({ error: "La commande à supprimer n'existe pas" });
    }
    const deletedCommande = await prisma.commande.delete({
      where: {
        idCommande: parseInt(id),
      },
    });
    return res.status(200).json({
      success: "La commande a été supprimée avec succès",
      deletedCommande,
    });
  } catch (error) {
    next(error);
  }
};

// Get single commande
const getSingleCommande = async (req, res, next) => {
  try {
    const { id } = req.params;

    const commande = await prisma.commande.findUnique({
      where: {
        idCommande: parseInt(id),
      },
      include: {
        fournisseur: true,
      },
    });

    if (!commande) {
      return res.status(404).json({ error: "Aucune commande trouvée!" });
    }

    return res.status(200).json(commande);
  } catch (error) {
    next(error);
  }
};

// nombre de commande d'un fournisseur fournit par req.parms

const getCommandesparFournisseur = async (req, res, next) => {
  try {
    const { id } = req.params;
    const commande = await prisma.commande.aggregate({
      where: {
        idFournisseur: parseInt(id),
      },
      _count: true,
    });
    return res.status(200).json(commande);
  } catch (error) {
    next(error);
  }
};

export {
  getCommandes,
  addCommande,
  updateCommande,
  deleteCommande,
  getSingleCommande,
  getCommandesparFournisseur,
};
