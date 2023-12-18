const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const HttpException = require('../utils/HttpException.utils');
const winston = require('../utils/logger.js');

class EmailVerifyModel {
    tableName = 'email_verify';

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params);

            const sql = `SELECT * FROM ${this.tableName}
                         WHERE ${columnSet}`;

            const result = await query(sql, [...values]);

            if (result.length === 0) {
                // Handle the case of an empty result if needed
                console.log('No results found.');
            }

            return result[0];
        } catch (error) {
            // Handle error and register in Winston
            winston.error(`[emailVerifymodel - findOne] Error: ${error.message}`);
            return {error:error.sqlMessage}
        }
    }

    create = async ({ email, verify_code }) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
                         (email, verify_code) VALUES (?,?)`;

            const result = await query(sql, [email, verify_code]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            winston.error(`[emailVerifymodel - create] Error: ${error.message}`);
            return {error:error.sqlMessage}
        }
    }

    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params);

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch (error) {
            // Handle error and register in Winston
            winston.error(`[emailVerifymodel - update] Error: ${error.message}`);
            return {error:error.sqlMessage}
        }
    }

    delete = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params);

            // Fix: Corrected the DELETE statement
            const sql = `DELETE FROM ${this.tableName}
                         WHERE ${columnSet}`;

            const result = await query(sql, [...values]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            // Handle error and register in Winston
            winston.error(`[emailVerifymodel - delete] Error: ${error.message}`);
            return {error:error.sqlMessage}
        }
    }
}

module.exports = new EmailVerifyModel();
