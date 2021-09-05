//db module
const db = require('./dbPool/pool')
module.exports = class BasePC {
    constructor(usuario,nrUniversal,nomeMaquina,retirado,novos2019,novos2020,antigos,registeredBy) {
        this.usuario = usuario,
        this.nrUniversal = nrUniversal,
        this.nomeMaquina = nomeMaquina,
        this.retirado = retirado,
        this.novos2019 = novos2019,
        this.novos2020 = novos2020,
        this.antigos = antigos,
        this.registeredBy = registeredBy
    }
    // ==================================================================================================
    // INSTANCE METHODS =================================================================================
    // ==================================================================================================
    save() {
        return db.query(`INSERT INTO controlePCsNovos.basesPCs (usuario, nrUniversal, nomeComputador, retirado, 
                                                                novos2019, novos2020 , antigos , registeredBy )
                        VALUES (${this.usuario===null ? 'NULL' : `'${this.usuario}'`},?,?,?,?,?,?,?);
                        INSERT INTO controlePCsNovos.SYSTEM_log (action_id,nrUniversal_fk,usuario)
                        VALUES (6,?,?);`, [`${this.nrUniversal}`,`${this.nomeMaquina}`,`${this.retirado}`,
                                                    `${this.novos2019}`,`${this.novos2020}`,`${this.antigos}`,`${this.registeredBy}`,
                                                    `${this.nrUniversal}`,`${this.registeredBy}`])
    }
    // ==================================================================================================
    // CLASS METHODS ====================================================================================
    // ==================================================================================================
    static fetchAllPcs(){
        return db.query('SELECT t.*, t1.nome, t1.email, t1.nome_uor_trabalho, t1.cod_uor_trabalho FROM controlePCsNovos.basesPCs t LEFT JOIN controlePCsNovos.funcisGecor t1 ON t1.matricula = t.usuario;')
    }
    static fetchAllInOfficeRegisters(){
        return db.query('SELECT t.*, t1.nome, t1.email, t1.nome_uor_trabalho, t1.cod_uor_trabalho FROM controlePCsNovos.basesPCs t LEFT JOIN controlePCsNovos.funcisGecor t1 ON t1.matricula = t.usuario WHERE t.retirado = 0 ;')
    }
    static fetchAllOutOfOfficeRegisters(){
        return db.query('SELECT t.*, t1.nome, t1.email, t1.nome_uor_trabalho, t1.cod_uor_trabalho FROM controlePCsNovos.basesPCs t LEFT JOIN controlePCsNovos.funcisGecor t1 ON t1.matricula = t.usuario WHERE t.retirado = 1 ;')
    }
    static fetchAllFuncis(){
        return db.query('SELECT fg.matricula, fg.nome FROM controlePCsNovos.funcisGecor fg;')
    }
    static checkIfExists(nrUniversal){
        return db.query('SELECT t.nrUniversal FROM controlePCsNovos.basesPCs t WHERE t.nrUniversal = ?', [`${nrUniversal}`])
    }
    static updateMatriculaAndRetirado(matricula,retirado,nrUniversal,chave){
        console.log(nrUniversal)
        const valorMatricula = matricula===null ? 'NULL' : `'${matricula}'`
        console.log(`UPDATE controlePCsNovos.basesPCs SET usuario = ${valorMatricula}, retirado = ${retirado} WHERE nrUniversal = '${nrUniversal}';`)
        db.query(`INSERT INTO controlePCsNovos.SYSTEM_log (usuario ,nrUniversal_fk ,action_Id ) VALUES ('${chave}','${nrUniversal}',${valorMatricula === null ? 3 : retirado===0 ? 3 : 2})`)
        return db.query(`UPDATE controlePCsNovos.basesPCs SET usuario = ${valorMatricula}, retirado = ${retirado} WHERE nrUniversal = '${nrUniversal}';`)
    }
    static udpdateRetirado(retirado,nrUniversal){
        return db.query(`UPDATE controlePCsNovos.basesPCs SET retirado = ${retirado} WHERE nrUniversal = '${nrUniversal}';`)
    }
    static registerLog(matricula,nrUniversal,actionID){
        const valorUniversal = nrUniversal===null ? 'NULL' : `'${nrUniversal}'`
        return db.query(`INSERT INTO controlePCsNovos.SYSTEM_log (usuario ,nrUniversal_fk ,action_Id )  VALUES ('${matricula}',${valorUniversal},${actionID});`)
    }
}