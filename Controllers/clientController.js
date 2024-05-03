import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all clients + factures
const getClients = async (req, res, next) => {
  try {
    const count = await prisma.client.count();

    if (count === 0) {
      return res.status(404).json({ error: "Ajouter au moins un client!" });
    }
    const clients = await prisma.client.findMany({
      include: {
        facture: true,
      },
    });

    return res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

// Add new client
const addClient = async (req, res, next) => {
  try {
    const { Nom, Prenom, Adresse, Ville, NumeroTelephone, Email } = req.body;
    const client = await prisma.client.create({
      data: {
        Nom,
        Prenom,
        Adresse,
        Ville,
        NumeroTelephone,
        Email,
      },
    });
    return res
      .status(201)
      .json({ success: "Le client a été ajouté avec succes", client });
  } catch (error) {
    next(error);
  }
};

// Update existent client
const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingClient = await prisma.client.findUnique({
      where: {
        idClient: parseInt(id),
      },
    });
    if (!existingClient) {
      return res.status(404).json({ error: "Le client n'existe pas" });
    }

    const { Nom, Prenom, Adresse, Ville, NumeroTelephone, Email } = req.body;
    const updatedClient = await prisma.client.update({
      where: {
        idClient: parseInt(id),
      },
      data: {
        Nom,
        Prenom,
        Adresse,
        Ville,
        NumeroTelephone,
        Email,
      },
    });
    return res
      .status(200)
      .json({ success: "Le client a été modifié avec succes", updatedClient });
  } catch (error) {
    next(error);
  }
};

// Delete client
const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingClient = await prisma.client.findUnique({
      where: {
        idClient: parseInt(id),
      },
    });
    if (!existingClient) {
      return res
        .status(404)
        .json({ error: "Le client à supprimer n'existe pas" });
    }
    const deletedClient = await prisma.client.delete({
      where: {
        idClient: parseInt(id),
      },
    });
    return res
      .status(200)
      .json({ success: "Le client a été supprime avec succes", deletedClient });
  } catch (error) {
    next(error);
  }
};

//Get single client + factures
const getSingleClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
      where: {
        idClient: parseInt(id),
      },
      include: {
        facture: true,
      },
    });
    if (!client) {
      return res.status(404).json({ error: "Le client n'existe pas" });
    }
    return res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

export { getClients, addClient, updateClient, deleteClient, getSingleClient };
