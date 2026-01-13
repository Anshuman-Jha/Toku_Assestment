const asyncErrorHandler = require('../middlewares/helpers/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const itemData = require('../data/ItemsData/itemData');
const { inputValidationSchema } = require('../input_validation/page');


exports.getItemsList = asyncErrorHandler(async (req, res, next) => {
   
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const items = itemData.items.slice(startIndex, endIndex);

    res.status(200).json({
        success: true,
        count: items.length,
        totalItems: itemData.items.length,
        items,
        page,
        limit
    });
});


exports.createItem = asyncErrorHandler(async (req, res, next) => {

    const validation = inputValidationSchema.safeParse(req.body);

    if (!validation.success) {
     
        const errorMessage = validation.error.errors.map(e => e.message).join(", ");
        return next(new ErrorHandler(errorMessage, 400));
    }

    const { name, price } = req.body;

    const lastId = itemData.items.length > 0 ? itemData.items[itemData.items.length - 1].id : 0;
    const newId = lastId + 1;

    const newItem = {
        id: newId,
        name,
        price,
        createdAt: new Date()
    };

    itemData.items.push(newItem);

    res.status(201).json({
        success: true,
        item: newItem
    });
});


exports.getSingleItem = asyncErrorHandler(async (req, res, next) => {

    const id = Number(req.params.id);
    const item = itemData.items.find(i => i.id === id);

    if (!item) {
        return next(new ErrorHandler("Item Not Found", 404));
    }

    res.status(200).json({
        success: true,
        item
    });
});


exports.updateItem = asyncErrorHandler(async (req, res, next) => {

    const id = Number(req.params.id);
    const item = itemData.items.find(i => i.id === id);

    if (!item) {
        return next(new ErrorHandler("Item Not Found", 404));
    }

    
    if (req.body.name) {
  
        item.name = req.body.name;
    }
    if (req.body.price !== undefined) {
        item.price = Number(req.body.price);
    }

    res.status(200).json({
        success: true,
        item
    });
});


exports.deleteItem = asyncErrorHandler(async (req, res, next) => {

    const id = Number(req.params.id);
    const index = itemData.items.findIndex(i => i.id === id);

    if (index === -1) {
        return next(new ErrorHandler("Item Not Found", 404));
    }

   
    itemData.items.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Item Deleted Successfully"
    });
});