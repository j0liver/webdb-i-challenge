const knex = require("../data/dbConfig"); // <<< renamed to knex from db

const getAccount = (id) => {
    if(id){
        console.log(id)
        return knex
        .select('*')
        .from('accounts')
        .where({ id: id})
        .first()
    } else{
        console.log(id)
        return knex
        .select('*')
        .from('accounts')
    }
}

const updateAccount = (id, changes) => {
    return knex('accounts')
    .where({ id: id })
    .update(changes)
}

const newAccount = (account) => {
    return knex('accounts')
    .insert(account)
}

const deleteAccount = (id) => {
    return knex('accounts')
    .where({ id: id })
    .delete(id)
}



module.exports = {
    getAccount,
    updateAccount,
    newAccount,
    deleteAccount
}