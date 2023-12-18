
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const HttpException = require('../utils/HttpException.utils');
const winston = require('../utils/logger.utils');

class UserModel {
    tableName = 'user';

    find = async (params = {}) => {
        try {
            let sql = `SELECT * FROM ${this.tableName}`;

            if (!Object.keys(params).length) {
                return await query(sql);
            }

            const { columnSet, values } = multipleColumnSet(params)
            sql += ` WHERE ${columnSet}`;
            return await query(sql, [...values]);
        } catch(error) {
            // Handle error and register in Winston
            winston.error(`[UserModel - find] Error: ${error.message}`);
            return {error:error.sqlMessage};
        }
    }

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT * FROM ${this.tableName}
            WHERE ${columnSet}`;
            const result = await query(sql, [...values]);

            // return back the first row (user)
            return result[0];
        } catch(error) {
            // Handle error and register in Winston
            winston.error(`[UserModel - findOne] Error: ${error.message}`);
            return {error:error.sqlMessage};
        }
    }

    create = async ({ email, password, country, invite_code, role = Role.General, get_bnb = false}) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
            (email, password, country, invite_code, role, get_bnb) VALUES (?,?,?,?,?,?)`;

            const result = await query(sql, [email, password, country, invite_code, role, get_bnb]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            // Handle error and register in Winston
            winston.error(`[UserModel - create] Error: ${error.message}`);
            return {error:error.sqlMessage};
        }
    }

    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch(error) {
            // Handle error and register in Winston
            winston.error(`[UserModel - update] Error: ${error.message}`);
            return {error:error.sqlMessage};
        }
    }

    delete = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `DELETE FROM ${this.tableName}
            WHERE ${columnSet}`;

            const result = await query(sql, [...values]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            // Handle error and register in Winston
            winston.error(`[UserModel - delete] Error: ${error.message}`);
            return {error:error.sqlMessage};
        }
    }
}

module.exports = new UserModel;
