'use strict';
const router = require('express').Router();
const MasterController = require('../controllers/MasterController');
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { Collection, Style, Metal, Shape, Category, ProductType } = require('../models');

const adminGuard = [verifyToken, authorizeRoles('MASTER_ADMIN')];

// ── Public: dynamic nav tree & filter options ──────────────────
router.get('/header',  MasterController.getHeader);
router.get('/filters', MasterController.getFilters);

// ── Admin CRUD: generic factory for simple master tables ────────
const makeCrud = (Model) => ({
  list:   async (req, res) => res.json(await Model.findAll({ order: [['createdAt','DESC']] })),
  create: async (req, res) => res.status(201).json(await Model.create(req.body)),
  update: async (req, res) => { await Model.update(req.body, { where: { id: req.params.id } }); res.json({ message: 'Updated' }); },
  remove: async (req, res) => { await Model.destroy({ where: { id: req.params.id } }); res.json({ message: 'Deleted' }); },
});

[
  ['collections', Collection],
  ['styles',      Style],
  ['metals',      Metal],
  ['shapes',      Shape],
  ['categories',  Category],
  ['types',       ProductType],
].forEach(([path, Model]) => {
  const ctrl = makeCrud(Model);
  router.get   (`/${path}`,      ctrl.list);
  router.post  (`/${path}`,      ...adminGuard, ctrl.create);
  router.put   (`/${path}/:id`,  ...adminGuard, ctrl.update);
  router.delete(`/${path}/:id`,  ...adminGuard, ctrl.remove);
});

module.exports = router;

