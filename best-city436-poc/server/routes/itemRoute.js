const express = require('express');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user_actions/auth');
const { getItemsList, createItem, getSingleItem, updateItem, deleteItem } = require('../controllers/itemController');

const router = express.Router();

router.route('/items')
    .get(getItemsList)
    .post(createItem);

router.route('/items/:id')
    .get(getSingleItem)
    .put(updateItem)
    .delete(deleteItem);

module.exports = router;

// In RealWorld production Scenario => we authenticate user and verify role => Don't want anyone to acess our data
// Concept of Authentication and Authorization 

/* router.route('/items).
get(isAuthenticatedUser,authorizeRoles, getItemsList).
 post(isAuthenticateUser, authorizeRoles, createItem)  
*/
/* router.route('/items/:id').
get(isAuthenticatedUser,authorizeRoles, getSingleItem).
put(isAuthenticateUser, authorizeRoles, updateItem).
delete(isAuthenticateUser, authorizeRoles, deleteItem); */