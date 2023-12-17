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
            winston.error(`[IEOModel - findOne] Error: ${error.message}`);
            // Throw an exception with a descriptive message on error
            throw new HttpException(500, 'Error fetching data from the database', error);
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
            // Throw an exception with a descriptive message on error
            throw new HttpException(500, 'Error creating a new record', error);
        }
    }

    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params);

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch (error) {
            // Throw an exception with a descriptive message on error
            winston.error(`[IEOModel - create] Error: ${error.message}`);
            // Throw an exception with a descriptive message on error
            throw new HttpException(500, 'Error updating the record', error);
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
            // Throw an exception with a descriptive message on error
            winston.error(`[IEOModel - delete] Error: ${error.message}`);
            // Throw an exception with a descriptive message on error
            throw new HttpException(500, 'Error deleting the record', error);
        }
    }
}

module.exports = new EmailVerifyModel();
