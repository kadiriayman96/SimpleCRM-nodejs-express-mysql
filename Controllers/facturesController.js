import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all factures with client information
const getFactures = async (req, res, next) => {
  try {
    const factures = await prisma.facture.findMany({
      include: {
        client: true,
      },
    });

    if (factures.length === 0) {
      return res.status(404).json({ error: "Aucune facture trouvée!" });
    }

    return res.status(200).json(factures);
  } catch (error) {
    next(error);
  }
};

// Add new facture
const addFacture = async (req, res, next) => {
  try {
    const { NumeroFacture, DateFacturation, idClient } = req.body;
    const facture = await prisma.facture.create({
      data: {
        NumeroFacture,
        DateFacturation: new Date(DateFacturation),
        client: {
          connect: {
            idClient: idClient,
          },
        },
      },
    });
    return res
      .status(201)
      .json({ success: "La facture a été ajoutée avec succès", facture });
  } catch (error) {
    next(error);
  }
};

// Update existent facture
const updateFacture = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existFacture = await prisma.facture.findUnique({
      where: {
        idFacture: parseInt(id),
      },
    });
    if (!existFacture) {
      return res
        .status(404)
        .json({ error: "La facture à modifier n'existe pas" });
    }

    const { NumeroFacture, DateFacturation, idClient } = req.body;
    const updatedFacture = await prisma.facture.update({
      where: {
        idFacture: parseInt(id),
      },
      data: {
        NumeroFacture,
        DateFacturation: new Date(DateFacturation),
        client: {
          connect: {
            idClient: idClient,
          },
        },
      },
    });

    return res.status(200).json({
      success: "La facture a été modifiée avec succès",
      updatedFacture,
    });
  } catch (error) {
    next(error);
  }
};

// Delete existent facture
const deleteFacture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existFacture = await prisma.facture.findUnique({
      where: {
        idFacture: parseInt(id),
      },
    });
    if (!existFacture) {
      return res
        .status(404)
        .json({ error: "La facture à supprimer n'existe pas" });
    }
    const deletedFacture = await prisma.facture.delete({
      where: {
        idFacture: parseInt(id),
      },
    });
    return res.status(200).json({
      success: "La facture a été supprimée avec succès",
      deletedFacture,
    });
  } catch (error) {
    next(error);
  }
};

// Get single facture
const getSingleFacture = async (req, res, next) => {
  try {
    const { id } = req.params;

    const facture = await prisma.facture.findUnique({
      where: {
        idFacture: parseInt(id),
      },
      include: {
        client: true,
      },
    });

    if (!facture) {
      return res.status(404).json({ error: "Aucune facture trouvée!" });
    }

    return res.status(200).json(facture);
  } catch (error) {
    next(error);
  }
};

export {
  getFactures,
  addFacture,
  updateFacture,
  deleteFacture,
  getSingleFacture,
};
