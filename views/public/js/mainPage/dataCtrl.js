class DataCtrl {
    constructor(){
        this.allData = []
        this.outOfOffice = []
        this.inOffice=[]
        this.funcis=[]
        this.itemTypes = []
        this.otherItems = []
        this.selectedPC = ''
        this.selectedPCInfo = ''
        this.oldPcs = 0
        this.oldPcsInOffice = 0
        this.oldPcsOutOfOffice = 0 
        this.new2019 = 0
        this.new2019InOffice = 0
        this.new2019OutOfOffice = 0
        this.new2020 = 0
        this.new2020Distributed = 0
        this.new2020NotDistributed = 0
        this.new2020InOffice = 0
        this.new2020OutOfOffice = 0
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// LOAD FETCHED DATA
    setData(dataArray){
        this.clearData()
        var tempArray = []
        this.allData = dataArray[0]
        this.totalFormatado = dataArray[0].length
        this.totalFaltaFormatar = 160 - this.totalFormatado
        dataArray[0].forEach(result => {
            var object = result
            if(object.dataInstalacaoW10!=null){
                object.dataInstalacaoW10 = object.dataInstalacaoW10.split('T')[0]
            }
            if(object.retirado===0){
                this.inOffice.push(object)
            }else if(object.retirado===1){
                this.outOfOffice.push(object)
            }
        })
        tempArray = []
        if(dataArray.length>1){
            dataArray[1].forEach(result => {
                var object = {}
                object.nome = result.nome.trim()
                object.matricula = result.matricula.trim()
                object.searchField = `${object.matricula.toLowerCase()} ${object.nome.toLowerCase()}`
                tempArray.push(object)
            })
            this.funcis = tempArray
        }
    } 
    setSelectedPC(nrUniversal){
        this.selectedPC= nrUniversal
    }
    clearData(){
        this.selectedPC = ''
        this.selectedPCInfo = ''
        this.oldPcs = 0
        this.oldPcsInOffice = 0
        this.oldPcsOutOfOffice = 0 
        this.new2019 = 0
        this.new2019InOffice = 0
        this.new2019OutOfOffice = 0
        this.new2020 = 0
        this.new2020Distributed = 0
        this.new2020NotDistributed = 0
        this.new2020InOffice = 0
        this.new2020OutOfOffice = 0
    }
    setItemtypes(types){
        this.itemTypes = types
    }
    setOtherItems(items){
        this.otherItems = items
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// GET DATA
    returnData(allPCs){
        var jud = 0
        var bens = 0
        var crd = 0
        if(allPCs==='allPCs'){
            this.clearData()
            this.allData.forEach(reg => {
                if(reg.antigos === 1 ){
                    this.oldPcs += 1
                    if(reg.retirado === 1){
                        this.oldPcsOutOfOffice += 1
                    }else {
                        this.oldPcsInOffice += 1
                    }
                }
                if(reg.novos2019 === 1 ){
                    this.new2019 += 1
                    if(reg.retirado === 1){
                        this.new2019OutOfOffice += 1
                    }else {
                        this.new2019InOffice += 1
                    }
                }
                if(reg.novos2020 === 1 ){
                    this.new2020 += 1
                    if(reg.retirado === 1){
                        this.new2020OutOfOffice += 1
                    }else {
                        this.new2020InOffice += 1
                    }
                    if(reg.usuario === null){
                        this.new2020NotDistributed += 1
                    }else {
                        this.new2020Distributed += 1 
                    }
                }
                if(reg.nome_uor_trabalho!=null){
                    if(reg.nome_uor_trabalho.match(/\/CRD\//)){
                        crd += 1
                    }else if(reg.nome_uor_trabalho.match(/\/JUD\//)){
                        jud += 1
                    }else if(reg.nome_uor_trabalho.match(/\/AEB\//)){
                        bens += 1
                    }else if(reg.nome_uor_trabalho.match(/\/AREA CREDITO-/)){
                        crd += 1
                    }else if(reg.nome_uor_trabalho.match(/\/AREA AP E BENS-/)){
                        bens += 1
                    }
                }
            })
            return {
                    allData: this.allData,
                    oldPcs: this.oldPcs,
                    oldPcsInOffice: this.oldPcsInOffice,
                    oldPcsOutOfOffice: this.oldPcsOutOfOffice,
                    oldPcs: this.new2019,
                    new2019InOffice: this.new2019InOffice,
                    new2019OutOfOffice: this.new2019OutOfOffice,
                    new2020InOffice: this.new2020InOffice,
                    new2020OutOfOffice: this.new2020OutOfOffice,
                    new2020Distributed: this.new2020Distributed,
                    olnew2020NotDistributeddPcs: this.new2020NotDistributed,
                    crd,
                    jud,
                    bens
            }
        }
        if(allPCs==='inOffice'){
            this.clearData()
            this.inOffice.forEach(reg => {
                if(reg.antigos === 1 ){
                    this.oldPcs += 1
                    this.oldPcsInOffice += 1
                }
                if(reg.novos2019 === 1 ){
                    this.new2019 += 1
                    this.new2019InOffice += 1
                }
                if(reg.novos2020 === 1 ){
                    this.new2020 += 1
                    this.new2020InOffice += 1
                    if(reg.usuario === null){
                        this.new2020NotDistributed += 1
                    }else {
                        this.new2020Distributed += 1 
                    }
                }
                if(reg.nome_uor_trabalho!=null){
                    if(reg.nome_uor_trabalho.match(/\/CRD\//)){
                        crd += 1
                    }else if(reg.nome_uor_trabalho.match(/\/JUD\//)){
                        jud += 1
                    }else if(reg.nome_uor_trabalho.match(/\/AEB\//)){
                        bens += 1
                    }else if(reg.nome_uor_trabalho.match(/\/AREA CREDITO-/)){
                        crd += 1
                    }else if(reg.nome_uor_trabalho.match(/\/AREA AP E BENS-/)){
                        bens += 1
                    }
                }

            })
            return {
                    inOffice: this.inOffice,
                    oldPcs: this.oldPcs,
                    oldPcsInOffice: this.oldPcsInOffice,
                    oldPcsOutOfOffice: this.oldPcsOutOfOffice,
                    oldPcs: this.new2019,
                    new2019InOffice: this.new2019InOffice,
                    new2019OutOfOffice: this.new2019OutOfOffice,
                    new2020InOffice: this.new2020InOffice,
                    new2020OutOfOffice: this.new2020OutOfOffice,
                    new2020Distributed: this.new2020Distributed,
                    olnew2020NotDistributeddPcs: this.new2020NotDistributed,
                    crd,
                    jud,
                    bens
            }
        }
        if(allPCs==='outOfOffice'){
            this.clearData()
            this.outOfOffice.forEach(reg => {
                if(reg.antigos === 1 ){
                    this.oldPcs += 1
                    this.oldPcsOutOfOffice += 1
                }
                if(reg.novos2019 === 1 ){
                    this.new2019 += 1
                    this.new2019OutOfOffice += 1
                }
                if(reg.novos2020 === 1 ){
                    this.new2020 += 1
                    this.new2020OutOfOffice += 1
                    if(reg.usuario === null){
                        this.new2020NotDistributed += 1
                    }else {
                        this.new2020Distributed += 1 
                    }
                }
                if(reg.nome_uor_trabalho!=null){
                    if(reg.nome_uor_trabalho.match(/\/CRD\//)){
                        crd += 1
                    }else if(reg.nome_uor_trabalho.match(/\/JUD\//)){
                        jud += 1
                    }else if(reg.nome_uor_trabalho.match(/\/AEB\//)){
                        bens += 1
                    }else if(reg.nome_uor_trabalho.match(/\/AREA CREDITO-/)){
                        crd += 1
                    }else if(reg.nome_uor_trabalho.match(/\/AREA AP E BENS-/)){
                        bens += 1
                    }
                }

            })
            return {
                    outOfOffice: this.outOfOffice,
                    oldPcs: this.oldPcs,
                    oldPcsInOffice: this.oldPcsInOffice,
                    oldPcsOutOfOffice: this.oldPcsOutOfOffice,
                    oldPcs: this.new2019,
                    new2019InOffice: this.new2019InOffice,
                    new2019OutOfOffice: this.new2019OutOfOffice,
                    new2020InOffice: this.new2020InOffice,
                    new2020OutOfOffice: this.new2020OutOfOffice,
                    new2020Distributed: this.new2020Distributed,
                    olnew2020NotDistributeddPcs: this.new2020NotDistributed,
                    crd,
                    jud,
                    bens
            }
        }
        if(allPCs==='inOffice'){
            return this.inOffice
        }
        if(allPCs==='outOfOffice'){
            return this.outOfOffice
        }
        if(allPCs==='itemTypes'){
            return this.itemTypes
        }
        if(allPCs==='otherItems'){
            var returnArray = []
            this.otherItems.forEach(reg => {
                var object = reg
                object.searchString = `${reg.description.toLowerCase()} ${reg.item.toLowerCase()} ${reg.matricula.toLowerCase()} ${reg.nome.toLowerCase()} ${reg.nome_uor_grupo.toLowerCase()}`
                returnArray.push(object)
            })
            return returnArray
        }
        if(allPCs==='funcis'){
            return this.funcis
        }
        if(allPCs==='selectedPC'){
            return this.selectedPC
        }
        if(allPCs==='allData'){
            return this.allData
        }
        if(allPCs==='selectedPC'){
            return this.selectedPC
        }
        if(allPCs==='selectedPCInfo'){
            return this.allData.filter(reg => {
                if(reg.nrUniversal===this.selectedPC){
                    return true
                }
            })
        }
        if(allPCs==='funcis'){
            return this.funcis
        }
        if(allPCs==='totals'){
            var judNew = 0
            var bensNew = 0
            var crdNew = 0
            var gsNew = 0
            var judNewIn = 0
            var bensNewIn = 0
            var crdNewIn = 0
            var gsNewIn = 0
            var judNewOut = 0
            var bensNewOut = 0
            var crdNewOut = 0
            var gsNewOut = 0
            var jud2020 = 0
            var bens2020 = 0
            var crd2020 = 0
            var gs2020 = 0
            var jud2020In = 0
            var bens2020In = 0
            var crd2020In = 0
            var gs2020In = 0
            var jud2020Out = 0
            var bens2020Out = 0
            var crd2020Out = 0
            var gs2020Out = 0
            var judOld = 0
            var bensOld = 0
            var crdOld = 0
            var gsOld = 0
            var judOldIn = 0
            var bensOldIn = 0
            var crdOldIn = 0
            var gsOldIn = 0
            var judOldOut = 0
            var bensOldOut = 0
            var crdOldOut = 0
            var gsOldOut = 0
            
            var limboNew = 0
            var limboNewIn = 0
            var limboNewOut = 0
            var limbo2020 = 0
            var limbo2020In = 0
            var limbo2020Out = 0
            var limboOld = 0
            var limboOldIn = 0
            var limboOldOut = 0

            var notDistributedNew = 0 
            var notDistributed2020 = 0 
            var notDistributedOld = 0 

            this.allData.forEach(reg => {
                if(reg.nome_uor_trabalho!=null){
                    if(reg.novos2020===1){
                        if(reg.retirado===0){
                                if(reg.nome_uor_trabalho.match(/\/CRD\//)){
                                    crdNew += 1
                                    crdNewIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/JUD\//)){
                                    judNew += 1
                                    judNewIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AEB\//)){
                                    bensNew += 1
                                    bensNewIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AREA CREDITO-/)){
                                    crdNew += 1
                                    crdNewIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AREA AP E BENS-/)){
                                    bensNew += 1
                                    bensNewIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AREA JUDICIAL-/)){
                                    judNew += 1
                                    judNewIn += 1
                                }else if(reg.nome_uor_trabalho.match(/GECOR SERVICOS/)){
                                    gsNew += 1
                                    gsNewIn += 1
                                }else{
                                    limboNew += 1
                                    limboNewIn += 1
                                }
                            return
                        }
                        if(reg.nome_uor_trabalho.match(/\/CRD\//)){
                            crdNew += 1
                            crdNewOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/JUD\//)){
                            judNew += 1
                            judNewOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AEB\//)){
                            bensNew += 1
                            bensNewOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AREA CREDITO-/)){
                            crdNew += 1
                            crdNewOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AREA AP E BENS-/)){
                            bensNew += 1
                            bensNewOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AREA JUDICIAL-/)){
                            judNew += 1
                            judNewOut += 1
                        }else if(reg.nome_uor_trabalho.match(/GECOR SERVICOS/)){
                            gsNew += 1
                            gsNewOut += 1
                        }else{
                            limboNew += 1
                            limboNewOut += 1
                        }
                    }
                    if(reg.novos2019===1){
                        if(reg.retirado===0){
                            if(reg.nome_uor_trabalho.match(/\/CRD\//)){
                                    crd2020 += 1
                                    crd2020In += 1
                                }else if(reg.nome_uor_trabalho.match(/\/JUD\//)){
                                    jud2020 += 1
                                    jud2020In += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AEB\//)){
                                    bens2020 += 1
                                    bens2020In += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AREA CREDITO-/)){
                                    crd2020 += 1
                                    crd2020In += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AREA AP E BENS-/)){
                                    bens2020 += 1
                                    bens2020In += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AREA JUDICIAL-/)){
                                    jud2020 += 1
                                    jud2020In += 1
                                }else if(reg.nome_uor_trabalho.match(/GECOR SERVICOS/)){
                                    gs2020 += 1
                                    gs2020In += 1
                                }else{
                                    limbo2020 += 1
                                    limb2020In += 1
                                }
                            return
                        }
                        if(reg.nome_uor_trabalho.match(/\/CRD\//)){
                            crd2020 += 1
                            crd2020Out += 1
                        }else if(reg.nome_uor_trabalho.match(/\/JUD\//)){
                            jud2020 += 1
                            jud2020Out += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AEB\//)){
                            bens2020 += 1
                            bens2020Out += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AREA CREDITO-/)){
                            crd2020 += 1
                            crd2020Out += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AREA AP E BENS-/)){
                            bens2020 += 1
                            bens2020Out += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AREA JUDICIAL-/)){
                            jud2020 += 1
                            jud2020Out += 1
                        }else if(reg.nome_uor_trabalho.match(/GECOR SERVICOS/)){
                            gs2020 += 1
                            gs2020Out += 1
                        }else{
                            limbo2020 += 1
                            limbo2020Out += 1
                        }
                    }
                    if(reg.antigos===1){
                        if(reg.retirado===0){
                            if(reg.nome_uor_trabalho.match(/\/CRD\//)){
                                    crdOld += 1
                                    crdOldIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/JUD\//)){
                                    judOld += 1
                                    judOldIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AEB\//)){
                                    bensOld += 1
                                    bensOldIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AREA CREDITO-/)){
                                    crdOld += 1
                                    crdOldIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AREA AP E BENS-/)){
                                    bensOld += 1
                                    bensOldIn += 1
                                }else if(reg.nome_uor_trabalho.match(/\/AREA JUDICIAL-/)){
                                    judOld += 1
                                    judOldIn += 1
                                }else if(reg.nome_uor_trabalho.match(/GECOR SERVICOS/)){
                                    gsOld += 1
                                    gsOldIn += 1
                                }else{
                                    limboOld += 1
                                    limbOldIn += 1
                                }
                            return
                        }
                        if(reg.nome_uor_trabalho.match(/\/CRD\//)){
                            crdOld += 1
                            crdOldOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/JUD\//)){
                            judOld += 1
                            judOldOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AEB\//)){
                            bensOld += 1
                            bensOldOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AREA CREDITO-/)){
                            crdOld += 1
                            crdOldOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AREA AP E BENS-/)){
                            bensOld += 1
                            bensOldOut += 1
                        }else if(reg.nome_uor_trabalho.match(/\/AREA JUDICIAL-/)){
                            judOld += 1
                            judOldOut += 1
                        }else if(reg.nome_uor_trabalho.match(/GECOR SERVICOS/)){
                            gsOld += 1
                            gsOldOut += 1
                        }else{
                            limboOld += 1
                            limboOldOut += 1
                        }
                    }
                }else{
                    if(reg.novos2020){
                        notDistributedNew += 1
                    }
                    if(reg.novos2019){
                        notDistributed2020 += 1
                    }
                    if(reg.antigos){
                        notDistributedOld += 1
                    }
                }
            })

            return {
                judNew : judNew,
                bensNew : bensNew,
                crdNew : crdNew,
                gsNew : gsNew,
                judNewIn : judNewIn,
                bensNewIn : bensNewIn,
                crdNewIn : crdNewIn,
                gsNewIn : gsNewIn,
                judNewOut : judNewOut,
                bensNewOut : bensNewOut,
                crdNewOut : crdNewOut,
                gsNewOut : gsNewOut,
                jud2020 : jud2020,
                bens2020 : bens2020,
                crd2020 : crd2020,
                gs2020 : gs2020,
                jud2020In : jud2020In,
                bens2020In : bens2020In,
                crd2020In : crd2020In,
                gs2020In : gs2020In,
                jud2020Out : jud2020Out,
                bens2020Out : bens2020Out,
                crd2020Out : crd2020Out,
                gs2020Out : gs2020Out,
                judOld : judOld,
                bensOld : bensOld,
                crdOld : crdOld,
                gsOld : gsOld,
                judOldIn : judOldIn,
                bensOldIn : bensOldIn,
                crdOldIn : crdOldIn,
                gsOldIn : gsOldIn,
                judOldOut : judOldOut,
                bensOldOut : bensOldOut,
                crdOldOut : crdOldOut,
                gsOldOut : gsOldOut,

                limboNew : limboNew,
                limboNewIn : limboNewIn,
                limboNewOut : limboNewOut,
                limbo2020 : limbo2020,
                limbo2020In : limbo2020In,
                limbo2020Out : limbo2020Out,
                limboOld : limboOld,
                limboOldIn : limboOldIn,
                limboOldOut : limboOldOut,

                notDistributedNew  : notDistributedNew ,
                notDistributed2020  : notDistributed2020 ,
                notDistributedOld : notDistributedOld,

            }
        }
    }
}