//node modules

//npm modules
const express = require('express')

//router criation
const appRouter = express.Router()
//application controller
const AppCtrl = require('../controller/appCtrl.js')
// =====================================================================================================================
//                                                 PAGE ROUTES
// =====================================================================================================================
//pageRouter.get('', AppCtrl.getRootPage)
appRouter.get('/', AppCtrl.getRoot)
// =====================================================================================================================
//                                                 SERVICE ROUTES
// =====================================================================================================================
appRouter.get('/fetchAllInOfficeRegisters', AppCtrl.fetchAllInOfficeRegisters)
appRouter.get('/fetchAllOutOfOfficeRegisters', AppCtrl.fetchAllOutOfOfficeRegisters)
appRouter.get('/fetchAllFuncis',  AppCtrl.fetchAllFuncis)
appRouter.get('/fetchAllPcs', AppCtrl.fetchAllPcs)
appRouter.post('/postInformation',AppCtrl.postInformation)
appRouter.post('/newComputer', AppCtrl.newComputer)
appRouter.get('/fecthItemTypes', AppCtrl.fecthItemTypes)
appRouter.get('/fetchItems', AppCtrl.fetchItems)
appRouter.post('/postItems', AppCtrl.postItems)
appRouter.post('/devolverItems', AppCtrl.devolverItems)



module.exports = appRouter