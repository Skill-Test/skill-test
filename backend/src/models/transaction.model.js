/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const winston = require('../utils/logger.utils');

class TransactionModel {
    tableName = 'transaction';

    find = async (params = {}) => {
        //Change: add try/catch
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
            winston.error(`[TransactionModel - find] Error: ${error.message}`);
            return []
        }
    }
    
    findMore = async (params = {}) => { 
        try {
            let sql = `SELECT * FROM ${this.tableName}`;
            let columnSet = Object.keys(params)
            let values = Object.values(params)
            if (columnSet[columnSet.length-1] === "network") {
                sql += ` WHERE ((${columnSet[0]}="${values[0]}" `
                for (let i=1; i< columnSet.length-1; i++) {
                    sql += `or ${columnSet[i]}="${values[i]}"`;
                }
                sql += `) and ${columnSet[columnSet.length-1]}="${values[columnSet.length-1]}")`
            }
            return await query(sql, [...values]);
        } catch(error) {
            // Handle error and register in Winston
            winston.error(`[TransactionModel - findMore] Error: ${error.message}`);
            return []
        }
    }

    findOne = async (params) => {
        //Change: add try/catch
        try {  
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT * FROM ${this.tableName}
            WHERE ${columnSet}`;
            const result = await query(sql, [...values]);
            
            return result[0];
        } catch(error) {
            // Handle error and register in Winston
            winston.error(`[TransactionModel - findOne] Error: ${error.message}`);
            return []
        }
    }

    create = async ({ user_id, hash, from_id, to_id, token, amount, network, to_admin}) => {
        //Change: add try/catch
        try {
            const sql = `INSERT INTO ${this.tableName}
            ( user_id, hash, from_id, to_id, token, amount, network, to_admin) VALUES (?,?,?,?,?,?,?,?)`;
    
            const result = await query(sql, [ user_id, hash, from_id, to_id, token, amount, network, to_admin]);
            const affectedRows = result ? result.affectedRows : 0;
    
            return affectedRows;
        } catch(error) {
            // Handle error and register in Winston
            winston.error(`[TransactionModel - create] Error: ${error.message}`);
            return []
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
            winston.error(`[TransactionModel - update] Error: ${error.message}`);
            throw new HttpException(error);
        }
    }
    
    deleteOne = async (key) => {
        //Change: add try/catch
        try {
            const sql = `DELETE FROM ${this.tableName}
            WHERE key = ?`;
            const result = await query(sql, [key]);
            const affectedRows = result ? result.affectedRows : 0;
    
            return affectedRows;
        } catch(error) {
            // Handle error and register in Winston
            winston.error(`[TransactionModel - deleteOne] Error: ${error.message}`);
            return []
        }
    }

    delete = async (params = {}) => {
         try {
            let sql = `DELETE * FROM ${this.tableName}`;
    
            if (!Object.keys(params).length) {
                return await query(sql);
            }
    
            const { columnSet, values } = multipleColumnSet(params)
            sql += ` WHERE ${columnSet}`;
    
            return await query(sql, [...values]);
        } catch(error) {
            // Handle error and register in Winston
            winston.error(`[TransactionModel - delete] Error: ${error.message}`);
            return []
        }
    }
}

module.exports = new TransactionModel;
