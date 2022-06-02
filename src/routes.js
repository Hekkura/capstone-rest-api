/* eslint linebreak-style: ["error", "windows"]*/
const {
  addInputHandler,
  getAllInputHandler,
  getInputByIdHandler,
  editInputByIdHandler,
  deleteInputByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/data',
    handler: addInputHandler,
  },
  {
    method: 'GET',
    path: '/data',
    handler: getAllInputHandler,
  },
  {
    method: 'GET',
    path: '/data/{id}',
    handler: getInputByIdHandler,
  },
  {
    method: 'PUT',
    path: '/data/{id}',
    handler: editInputByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/data/{id}',
    handler: deleteInputByIdHandler,
  },
];

module.exports = routes;
