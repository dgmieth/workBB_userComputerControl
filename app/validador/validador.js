//criando as variáveis
const axios = require('axios')
const https = require('https')

const urlInfo = require('./urlInfo')

const BasePC = require('../../model/BasePC')
//const registraLog = require('../functions/registraLog')
//criado código para validação do usuário e inserindo informações do intranet.bb.com.br no req
module.exports = {
    async validaToken(req,res,next) {
        var header = req.headers
        var objetoHeader = header
        
        objetoDados = []
        delete objetoHeader["content-length"]
        objetoHeader.host = urlInfo.host;
        objetoHeader["user-agent"] = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:60.0) Gecko/20100101 Firefox/60.0"
        return await axios({
            method: 'GET',
            url: urlInfo.endereco,
            headers: objetoHeader,
            strctSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).then(async response => {
            if(response.status > 300) {
                res.charset = 'UTF-8',
                res.status(401).send({error: 'Efetue login na intranet novamente'})
            } else {
                const usuario = response.data.attributes
                
                for await (objeto of usuario) {
                    if (objeto.name == "cd-cmss-usu") {
                        req.session.comissao = parseInt(objeto.values)
                    }
                    if (objeto.name == "displayname") {
                        req.session.nome = objeto.values
                    }
                    if (objeto.name == "chaveFuncionario") {
                        req.session.chave = objeto.values + ""
                    }
                    if (objeto.name == "cd-pref-depe") {
                        req.session.prefixo = parseInt(objeto.values)
                    }
                    if (objeto.name == "cd-eqp") {
                        req.session.eqp = objeto.values
                    }
                } 
                if (req.session.prefixo === 4935) {
                    if(!req.session.logged){
                        req.session.logged = true
                            BasePC.registerLog(req.session.chave,null,1)
                            .then(([data,metadata])=>{
                                next()
                            })
                            .catch(err => {
                                console.log(err)
                                next()
                            })
                    }else{
                        next()
                    }
                } else {
                    res.send({message: 'Funcionário não pertence ao prefixo 4935!',link:false})  
                    
                }
            }
        }).catch(err =>{
            res.redirect('https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://gs4935.intranet.bb.com.br:4024')  
            
        })
    }
}
