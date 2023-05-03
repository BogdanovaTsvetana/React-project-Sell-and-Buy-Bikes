const Item = require('../models/Item.js');    //  TODO
const User = require('../models/User.js');

async function createItem(itemData) {

    const item = new Item(itemData);   
    await item.save(); 
    return item;
}

async function getAllItems(query) {
    const items = await Item.find({}).populate('owner').lean();  
    return items;
}

async function getItemById(id) {
    const item = await Item.findById(id).populate('owner').lean();  
    return item;
}

async function editItem(id, newData){
    const item = await Item.findById(id);   
   
    if(!item) {
        throw new Error('No such ID in database')     
    }

    Object.assign(item, newData);

    await item.save();
    return item;
}

async function deleteItem(id) {
    return Item.findByIdAndDelete(id);  
}


module.exports = {
    createItem,
    getAllItems,
    getItemById,
    editItem,
    deleteItem,
}

