const { User, List } = require("../models");
const jwt = require("jsonwebtoken");

exports.getAllLists = async (req, res, next) => {
  try {
    const lists = await List.findAll({ where: { userId: req.user.id } });
    res.json({ lists });
  } catch (error) {
    next(error);
  }
};
exports.getListById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await List.findOne({ where: { id, userId: req.user.id } });
    res.json({ list });
  } catch (error) {
    next(error);
  }
};
exports.createList = async (req, res, next) => {
  try {
    const { title, status } = req.body;
    const list = await List.create({
      title,
      status,
      userId: req.user.id,
    });
    res.json({ list });
  } catch (error) {
    next(error);
  }
};
exports.updateList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    const rows = List.update(
      {
        title,
        status,
      },
      {
        where: { id, userId: req.user.id },
      }
    );
    if (rows[0] === 0)
      return res.status(400), json({ msg: "Fail ot update list" });
    res.json({ msg: "success update list" });
  } catch (error) {
    next(error);
  }
};
exports.deleteList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await List.destroy({ where: { id, userId: req.user.id } });
    if (rows === 0)
      return res.status(400), json({ msg: "Fail to delete list" });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
