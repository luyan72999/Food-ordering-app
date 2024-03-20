import expressAsyncHandler from 'express-async-handler';

// get all items
export const getAllItems = expressAsyncHandler(async (req, res) => {
  const result = await prisma.foodItem.findMany({});
  res.json(result);
});

// get an item by id
export const getOneItem = expressAsyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await prisma.foodItem.findUnique({
    where: {
        id: id
    },
  });
  if (!result) {
    throw new Error("Item is not found.");
  }
  res.json(result);
});

// create an item
export const createItem = expressAsyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !price) {
      throw new Error("The required fields must be specified.")
  }
  const result = await prisma.foodItem.create({
    data: {
      name,
      description,
      price
    },
  });
  res.json(result);
});

// update an item
export const updateOneItem = expressAsyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description, price } = req.body;
  const result = await prisma.foodItem.update({
    where: {
      id: id
    },
    data: {
      name: name,
      description: description,
      price: price
    },
  });
  if (!result) {
    throw new Error("Item is not found.");
  }
  res.json(result);
});

// delete an item
export const deleteItem = expressAsyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await prisma.foodItem.delete({
    where: {
      id: id
    },
  });
  if (!result) {
    throw new Error("Item is not found.");
  }
  res.json(result);
});


// Prisma Commands
// npx prisma init : to create prisma folder and initialize prisma
// npx prisma studio: to open prisma studio and visualize the database
// npx prisma db push: to push the schema to the database or any changes to the schema
