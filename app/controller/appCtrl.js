//npm modules

//infoAsText
const bbInfo = require('./bbInfo/bbInfo')
//model class
const BasePC = require('../../model/BasePC')
const Item = require('../../model/Item')
//db
const pool = require('../../model/dbPool/pool')
//==================================================================================
//PAGE RENDERING
//==================================================================================
exports.getRoot = (req,res,next) =>{
    res.render('rootPage', {info: bbInfo})
}
exports.getTeste = (req,res,next) =>{
    res.render('testePage', {info: bbInfo})
}
//==================================================================================
//DATA SERVICES
//==================================================================================
exports.fetchAllPcs = (req,res,next) => {
    BasePC.fetchAllPcs()
    .then(([data,meta]) => {
        res.send(data)
    })
    .catch(err => console.log(err))
}
exports.fetchAllInOfficeRegisters = (req,res,next)=> {
    BasePC.fetchAllInOfficeRegisters()
    .then(([data,meta])=>{
        res.send(data)
    })
    .catch(err => console.log(err))
}
exports.fetchAllOutOfOfficeRegisters = (req,res,next) => {
    BasePC.fetchAllOutOfOfficeRegisters()
    .then(([data,meta])=>{
        res.send(data)
    })
    .catch(err => console.log(err))
}
exports.fetchAllFuncis = (req,res,next)=>{
    BasePC.fetchAllFuncis()
    .then(([data,meta])=>{
        res.send(data)
    })
    .catch(err => console.log(err))
}
exports.postInformation = (req,res,next) => {
    console.log(req.body)
    BasePC.updateMatriculaAndRetirado(req.body.matriculaToSend,req.body.retiradoToSend,req.body.nrUniversalToSend,req.session.chave)
    .then(([data,meta])=>{
        console.log(data)
        if(data.affectedRows>0){
            console.log(1)
            res.send({success:`Informações do computador ${req.body.nrUniversalToSend} atualizadas com sucesso`})
        }
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}
exports.newComputer = (req,res,next) => {
    console.log(req.body)
    if(req.body.nrUniversal === ''||req.body.funci===''){
        const validationObject = {
            hasErros: true,
            errorMsg: 'You must inform a value for nrUniversal and/or employee'
        }
    }
    var funci
    if(req.body.funci==='Em depósito-'){
        funci = null
    }else {
        funci = req.body.funci.split('- ')[0]
    }
    const antigos = req.body.before2019 === true ? 1 : 0
    const novos2019 = req.body.ano2019 === true ? 1 : 0
    const novos2020 = req.body.ano2020 === true ? 1 : 0
    const retirado = req.body.modalRadiusSim === true ? 1 : 0
    const nomeMaquina = req.body.nomeDaMaquina === '' ? null : req.body.nomeDaMaquina
    const pc = new BasePC(funci,req.body.nrUniversal,nomeMaquina,retirado,novos2019,novos2020,antigos,req.session.chave)
    pc.save()
    .then(([data0,meta0])=>{
        if(data0){
            res.json({
                success: `New computer information was saved to database`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.json({
            error: `It wasn't possible to save the information`
        })
    })
}
exports.fecthItemTypes = (req,res,next)=>{
    Item.fecthItemTypes()
    .then(([data,meta])=>{
        res.json(data)
    })
    .catch(err => {
        console.log(err)
    })
}
exports.fetchItems = (req,res,next) =>{
    const returnObj = {
        hasErrors: true,
        msg: null,
        data: null
    }
    Item.fetchItems()
    .then(([data,meta])=>{
        returnObj.hasErrors = false
        returnObj.data = data
        res.json(returnObj)
    })
    .catch(err => {
        console.log(err)
        returnObj.msg = err
        res.json(returnObj)
    })
}
exports.postItems = (req,res,next) => {
    var outerArray = []
    const currentDate = new Date()
    var date= `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
    req.body.forEach(reg => {
        var innerArray = [`(${reg.item.split('-')[0]},0,'${date}','${reg.funci.split('-')[0]}', '${reg.obs}','${req.session.chave}')`]
        outerArray.push(innerArray)
    })
    Item.insertItems(outerArray,req.session.chave)
    .then(([data,meta])=> {
        Item.fetchItems()
        .then(([data1,meta])=>{
            if(data1){
                res.send({success:`${data[0].affectedRows} items cadastrados!`, data: data1})
            }else{
                res.json({
                    error: `It wasn't possible to save the information`
                })
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.json({
            error: `It wasn't possible to save the information`
        })
    })
}
//devolverItems
exports.devolverItems = (req,res,next) => {
    console.log(req.body)
    Item.devolverItem(req.body.itemId, req.session.chave)
    .then(([data,meta])=> {
        Item.fetchItems()
        .then(([data1,meta])=>{
            if(data1){
                res.send({success:`Item ${req.body.itemId} devolvido!`, data: data1})
            }else{
                res.json({
                    error: `It wasn't possible to save the information`
                })
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.json({
            error: `It wasn't possible to save the information`
        })
    })
}