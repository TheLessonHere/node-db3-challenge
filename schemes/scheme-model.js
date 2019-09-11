const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
    .where({ id })
    .first();
}

function findSteps(scheme_id) {
    return db('steps as st')
    .join('schemes as sc', 'sc.id', 'st.scheme_id')
    .select('st.id', 'st.step_number', 'st.instructions', 'sc.scheme_name as schemeName')
    .where('st.scheme_id', scheme_id)
}

function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then(id => {
        return findById(id[0]);
    });
}

function update(changes, id) {
    return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
    return db('schemes')
      .where('id', id)
      .del();
  }