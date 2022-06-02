/* eslint-disable space-before-blocks */
/* eslint-disable padded-blocks */
/* eslint linebreak-style: ["error", "windows"]*/
const {nanoid} = require('nanoid');
const inputs = require('./inputs');

// Add New Data Handler =================================================
const addInputHandler = (request, h) => {
  const {
    // data variables here EXCEPT id, createdAt, updatedAt
  } = request.payload;

  const id = nanoid(21);
  const createdAt = newDate().toISOString();
  const updatedAt = createdAt;

  const newInput = {
    id, createdAt, updatedAt, // Other Variables here!
  };

  inputs.push(newInput);

  const isSuccess = inputs.filter((input) => input.id === id).length>0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Input successfully added',
      data: {
        inputId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Input failed',
  });
  response.code(500);
  return response;
}; // End of Handler

// View/Read all data Handler ==================================================
const getAllInputHandler = () => ({
  status: 'success',
  data: {
    inputs,
  },
}); // End of Handler

const getInputByIdHandler = (request, h) => {
  const {id} = request.params;
  const input = inputs.filter((n) => n.id === id)[0];

  if (input !== undefined){
    return {
      status: 'success',
      data: {
        input,
      },
    };
  }

  const response = h.response({
    status: 'error',
    message: 'Edit Failed. Data not found',
  });
  response.code(404);
  return response;
}; // End of Handler

// Edit Data by Id  ==================================================
const editInputByIdHandler = (request, h) => {
  const {id} = request.params;
  const {
    // data variables here EXCEPT id, createdAt, updatedAt
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = inputs.findIndex((input) => input.id === id);

  if (index !== -1) {
    inputs[index] = {
      ...inputs[index],
      updatedAt,
      // Other Variables Here!
    };
    const response = h.response({
      status: 'success',
      message: 'Input successfully edited',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Edit failed. ID not found',
  });
  response.code(404);
  return response;
}; // End of Handler

// Delete Data by Id =================================================
const deleteInputByIdHandler = (request, h) => {
  const {id} = request.params;
  const index = inputs.findIndex((input) => input.id === id);

  if (index !== -1) {
    inputs.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Data successfully deleted',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Failed to delete Data, ID not found',
  });
  response.code(404);
  return response;
}; // End of Handler

module.exports = {
  addInputHandler,
  getAllInputHandler,
  getInputByIdHandler,
  editInputByIdHandler,
  deleteInputByIdHandler,
};
