const db = require('./dbPool/pool')
module.exports = class Item {
    constructor(){

    }
    // ==================================================================================================
    // INSTANCE METHODS =================================================================================
    // ==================================================================================================

    // ==================================================================================================
    // CLASS METHODS ====================================================================================
    // ==================================================================================================
    static fecthItemTypes(){
        return db.query('SELECT i.* FROM controlePCsNovos.items i;')
    }
    static fetchItems() {
        return db.query (`SELECT 
                            oi.*,
                            i.item ,
                            f.nome,
                            f.nome_uor_grupo 
                        FROM controlePCsNovos.otherItems oi 
                        LEFT JOIN controlePCsNovos.items i on i.id = oi.item_id 
                        LEFT JOIN controlePCsNovos.funcisGecor f ON f.matricula = oi.matricula 
                        WHERE oi.returned = 0;`)
    }
    static insertItems(itemsArray,chave){
        return db.query(`INSERT INTO controlePCsNovos.otherItems (item_id ,returned ,\`datetime\` ,matricula ,description ,registeredBy )
                        VALUES ${itemsArray};
                        INSERT INTO controlePCsNovos.SYSTEM_log (action_id,nrUniversal_fk,usuario)
                        VALUES (4,NULL,?)`, [`${chave}`])
    }
    static devolverItem(item,chave){
        return db.query(`UPDATE controlePCsNovos.otherItems t 
                        SET t.returned  = 1
                        WHERE t.id = ?;
                        INSERT INTO controlePCsNovos.SYSTEM_log (action_id,nrUniversal_fk,usuario)
                        VALUES (5,NULL,?);`,
                        [`${item}`,`${chave}`])
    }
}