export const CRUD_QUERY_TEMPLATES = {
    SELECT_ALL: 'SELECT * FROM ??',
    SELECT_BY_ID: 'SELECT * FROM ?? WHERE id = ?',
    INSERT: 'INSERT INTO ?? SET ?',
    UPDATE: 'UPDATE ?? SET ? WHERE id = ?',
    DELETE: 'DELETE FROM ?? WHERE id = ?',
};
