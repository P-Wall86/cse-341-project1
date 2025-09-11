const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Contacts').find();
    result.toArray().then((Contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Contacts);
    })
}

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Contacts').find({ _id: userId });
    result.toArray().then((Contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Contacts[0]);
    })
};

const createUser = async (req, res) => {
    const Contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('Contacts').insertOne(Contact);

    if (response.acknowledged) {
        res.status(201).json({insertedId: response.insertedId});
    } else {
        res.status(500).json('Some error occurred while creating the Contact.');
    }
};

const updateUser = async (req, res) => {
    const ContactId = new ObjectId(req.params.id);
    const Contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('Contacts').replaceOne(
        { _id: ContactId },
        Contact
    );

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json('Contact not found or no changes applied.');
    }
};

const deleteUser = async (req, res) => {
    const ContactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Contacts').deleteOne({ _id: ContactId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json('Contact not found.');
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };