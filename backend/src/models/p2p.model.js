/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const winston = require('../utils/logger.js');
const HttpException = require('../utils/HttpException.utils');

class P2PModel {
    tableName = 'p2p';

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
            winston.error(`[P2PModel - find] Error: ${error.message}`);
            return {error:error.sqlMessage}
        }
    }

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;
            const result = await query(sql, [...values]);

            return result[0];
        } catch(error) {
            winston.error(`[P2PModel - findOne] Error: ${error.message}`);
            return {error:error.sqlMessage}
        }
    }

    create = async ({seller_name,completed_orders,currency,amount_usdt,amount_mgl,payment_method,price_usdt,price_mgl,terms_conditions,facebook_link,telegram_link,skype_link,profile_pic}) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
            (seller_name,completed_orders,currency,amount_usdt,amount_mgl,payment_method,price_usdt,price_mgl,terms_conditions,facebook_link,telegram_link,skype_link,profile_pic) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            const result = await query(sql, [seller_name,completed_orders,currency,amount_usdt,amount_mgl,payment_method,price_usdt,price_mgl,terms_conditions,facebook_link,telegram_link,skype_link,profile_pic]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            winston.error(`[P2PModel - create] Error: ${error.message}`);
            return {error:error.sqlMessage}
        }
    }
    
    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch(error) {
            winston.error(`[P2PModel - update] Error: ${error.message}`);
            return {error:error.sqlMessage}
        }
    }

    delete = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `DELETE FROM ${this.tableName} WHERE ${columnSet}`;
            const result = await query(sql, [...values]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            winston.error(`[P2PModel - delete] Error: ${error.message}`);
            return {error:error.sqlMessage}
        }
    }
}

module.exports = new P2PModel;
