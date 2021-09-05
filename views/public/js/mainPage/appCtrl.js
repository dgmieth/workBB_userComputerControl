class AppCtrl {
    constructor(){
        this.appStates = {
            _ALLPCS: 'ALLPCS',
            _INOFFICE: 'INOFFICE',
            _OUTOFOFFICE: 'OUTOFOFFICE',
            _ALLITEMS: 'ALLITEMS',
            _MANAGEPCS: 'MANAGEPCS',
            _MANAGEITEMS: 'MANAGEITEMS',
            _GENERALVIEW: 'GENERALVIEW'
        }
        this.searchingMode = false
        this.appState = this.appStates._INOFFICE
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// FETCH INFORMATION
    fetchResults(dataCtrl,uiCtrl) {
        fetch('/fetchAllPcs')
        .then(answer => { return answer.json()})
        .then(results => {
                fetch('/fetchAllFuncis')
                .then(answer2 => { return answer2.json()})
                .then(results2 => {
                    fetch('/fecthItemTypes')
                    .then(answer3 => {
                        return answer3.json()
                    })
                    .then(response => {
                        fetch('/fetchItems')
                        .then(answer4 =>{ return answer4.json()})
                        .then(results4 => {
                            if(!results4.errors){
                                
                                dataCtrl.setOtherItems(results4.data)
                            }
                            dataCtrl.setItemtypes(response)
                            dataCtrl.setData([results, results2])
                            this.setAppState(this.returnAppStates()._ALLPCS)
                            uiCtrl.changeUIInterfacetAccordingToAppState(dataCtrl,this)
                            this.loadAppStateEventListeners(dataCtrl,uiCtrl)
                            this.loadSearchBoxEventListener(dataCtrl,uiCtrl)
                            this.loadEntregarDevolverEventListners(dataCtrl,uiCtrl)
                            uiCtrl.showHideSpinner('hide')
                            uiCtrl.addActiveClassToAppStateButton(null,this)
                        })
                    })
                })
            })
        .catch(err => console.log(err))
    }
    devolverItems(dataCtrl,uiCtrl,dataObj){
        fetch('/devolverItems', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body:JSON.stringify(dataObj)
        })
        .then(answer => { return answer.json() })
        .then(response => {
            if(response.success){
                setTimeout(() => {
                    alert(response.success)
                }, 0);
                dataCtrl.setOtherItems(response.data)
                uiCtrl.showHideSpinner('hide')    
                $('#myModal').modal('hide')
                if(this.appState === this.appStates._ALLITEMS){
                    uiCtrl.changeUIInterfacetAccordingToAppState(dataCtrl,this)
                    this.loadSearchBoxEventListener(dataCtrl,uiCtrl)
                    this.loadEntregarDevolverEventListners(dataCtrl,uiCtrl)
                }
                if(this.appState === this.appStates._MANAGEITEMS){
                    uiCtrl.changeUIInterfacetAccordingToAppState(dataCtrl,this)
                    this.loadManagedPCsSearchBoxEventListener(dataCtrl,uiCtrl)
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// APP STATE MANIPULATION
    setAppState(appState){
        this.appState = appState
    }
    getAppState(){
        return this.appState
    }
    returnAppStates(){
        return this.appStates
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// APP SEARCHING MODE
    setSearchingMode(true_False){
        this.searchingMode = true_False
    }
    getSearchingMode(){
        return this.searchingMode
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// EVENT LISTENERS
    loadAppStateEventListeners(dataCtrl,uiCtrl){
        const btns = uiCtrl.returnIDs().btns.stateBtns
        function commonFunctions(dataCtrl,uiCtrl,appCtrl,btn){
            appCtrl.setSearchingMode(false)
            uiCtrl.addActiveClassToAppStateButton(btn)
            uiCtrl.changeUIInterfacetAccordingToAppState(dataCtrl,appCtrl)
            if(appCtrl.getAppState()!== appCtrl.returnAppStates()._MANAGEPCS && appCtrl.getAppState()!== appCtrl.returnAppStates()._MANAGEITEMS  && appCtrl.getAppState()!== appCtrl.returnAppStates()._GENERALVIEW){
                appCtrl.loadSearchBoxEventListener(dataCtrl,uiCtrl)
                appCtrl.loadEntregarDevolverEventListners(dataCtrl,uiCtrl)
            }
            if(appCtrl.getAppState()===appCtrl.returnAppStates()._MANAGEPCS || appCtrl.getAppState()=== appCtrl.returnAppStates()._MANAGEITEMS){
                appCtrl.loadManagedPCsSearchBoxEventListener(dataCtrl,uiCtrl)
            }
        }
        document.getElementById(btns.allPCs).addEventListener('click',(e)=>{
            this.setAppState(this.returnAppStates()._ALLPCS)
            commonFunctions(dataCtrl,uiCtrl,this,e.target)
        })
        document.getElementById(btns.allInOffice).addEventListener('click',(e)=>{
            this.setAppState(this.returnAppStates()._INOFFICE)
            commonFunctions(dataCtrl,uiCtrl,this,e.target)
        })
        document.getElementById(btns.allOutOfOffice).addEventListener('click',(e)=>{
            this.setAppState(this.returnAppStates()._OUTOFOFFICE)
            commonFunctions(dataCtrl,uiCtrl,this,e.target)
        })
        document.getElementById(btns.allItems).addEventListener('click',(e)=>{
            this.setAppState(this.returnAppStates()._ALLITEMS)
            commonFunctions(dataCtrl,uiCtrl,this,e.target)
        })
        document.getElementById(btns.managePCs).addEventListener('click',(e)=>{
            this.setAppState(this.returnAppStates()._MANAGEPCS)
            commonFunctions(dataCtrl,uiCtrl,this,e.target)
        })
        document.getElementById(btns.generalView).addEventListener('click',(e)=>{
            this.setAppState(this.returnAppStates()._GENERALVIEW)
            commonFunctions(dataCtrl,uiCtrl,this,e.target)
        })
        document.getElementById(btns.manageItems).addEventListener('click',(e)=>{
            this.setAppState(this.returnAppStates()._MANAGEITEMS)
            commonFunctions(dataCtrl,uiCtrl,this,e.target)
        })
    }
    loadSearchBoxEventListener(dataCtrl,uiCtrl){
        document.getElementById(uiCtrl.returnIDs().inputs.nrUniversalSearchBox).addEventListener('focus',(e)=>{
            this.setSearchingMode(true)
        })
        document.getElementById(uiCtrl.returnIDs().inputs.nrUniversalSearchBox).addEventListener('input',(e)=>{
            if(e.target.value===''){
                this.setSearchingMode(false)
                e.target.value = null
                uiCtrl.changeUIInterfacetAccordingToAppState(dataCtrl,appCtrl)
                this.loadSearchBoxEventListener(dataCtrl,uiCtrl)
                return
            }
            uiCtrl.changeUIInterfacetAccordingToAppStateSearchModeOn(dataCtrl,this,e.target.value)
            this.loadEntregarDevolverEventListners(dataCtrl,uiCtrl,e.target.value)
        })
    }
    loadManagedPCsSearchBoxEventListener(dataCtrl,uiCtrl){
        document.getElementById(uiCtrl.returnIDs().manage.input).addEventListener('focus',(e)=>{
            this.setSearchingMode(true)
        })
        document.getElementById(uiCtrl.returnIDs().manage.input).addEventListener('input',(e)=>{
            uiCtrl.fillInManagedPCsOrItemsInnerTable(dataCtrl,this,e.target.value)
            this.loadEntregarDevolverEventListners(dataCtrl,uiCtrl,e.target.value)
            if(e.target.value===''){
                e.target.value = null
                uiCtrl.changeUIInterfacetAccordingToAppState(dataCtrl,appCtrl)
                if(this.getAppState()===this.returnAppStates()._MANAGEPCS || this.getAppState()===this.returnAppStates()._MANAGEITEMS){
                    this.loadManagedPCsSearchBoxEventListener(dataCtrl,uiCtrl)
                }
                return
            }
            // uiCtrl.changeUIInterfacetAccordingToAppStateSearchModeOn(dataCtrl,this,e.target.value)
            // this.loadEntregarDevolverEventListners(dataCtrl,uiCtrl,e.target.value)
        })
    }
    loadNewRegisterPCEventListener(dataCtrl,uiCtrl){
        document.getElementById(uiCtrl.returnIDs().manage.btn.registerNew).addEventListener('click',(e)=> {
            uiCtrl.createModal(dataCtrl,this)
        })
    }
    loadEntregarDevolverEventListners(dataCtrl,uiCtrl,value){
        var dataArray = []
        var filteredArray =[]
        if(this.appState === this.appStates._ALLPCS){
            dataArray = dataCtrl.returnData('allPCs').allData
            filteredArray = dataArray.filter(reg => {
                if(reg.nrUniversal.match(new RegExp(value,'ig'))){
                    return true
                }
            })
        }
        if(this.appState === this.appStates._INOFFICE){
            dataArray = dataCtrl.returnData('inOffice').inOffice
            filteredArray = dataArray.filter(reg => {
                if(reg.nrUniversal.match(new RegExp(value,'ig'))){
                    return true
                }
            })
        }
        if(this.appState === this.appStates._OUTOFOFFICE){
            dataArray = dataCtrl.returnData('outOfOffice').outOfOffice
            filteredArray = dataArray.filter(reg => {
                if(reg.nrUniversal.match(new RegExp(value,'ig'))){
                    return true
                }
            })
        } 
        if(this.appState === this.appStates._ALLITEMS||this.appState === this.appStates._MANAGEITEMS){
            dataArray = dataCtrl.returnData('otherItems')
            filteredArray = dataArray.filter(reg => {
                if(reg.searchString.match(new RegExp(value,'ig'))){
                    return true
                }
            })
            filteredArray.forEach(reg => {
                document.getElementById(reg.id).addEventListener('click',(e)=>{
                    this.devolverItems(dataCtrl, uiCtrl,{itemId: parseInt(reg.id)})
                })
            })
        }else{
            filteredArray.forEach(reg => {
                document.getElementById(reg.nrUniversal).addEventListener('click',(e)=>{
                    dataCtrl.setSelectedPC(reg.nrUniversal)
                    uiCtrl.createModal(dataCtrl,this,reg)      
                })
            })
        }
    }
    loadModalSubmitButtonEventListener(dataCtrl,uiCtrl){
        if(this.appState===this.appStates._MANAGEPCS ||
            this.appState===this.appStates._ALLPCS ||
            this.appState===this.appStates._INOFFICE ||
            this.appState===this.appStates._OUTOFOFFICE ){

            document.getElementById(uiCtrl.returnIDs().modal.btns.submit).addEventListener('click',(e)=>{
                if(dataCtrl.returnData('selectedPC')){
                    const newMatricula = document.querySelector(`input[name=${uiCtrl.returnIDs().modal.attributes.nomeFunci}]`).value === '' ? null : document.querySelector(`input[name=${uiCtrl.returnIDs().modal.attributes.nomeFunci}]`).value.split('-')[0]
                    const retirado = document.querySelector(`input[name=${uiCtrl.returnIDs().modal.attributes.pcRetirado}]`).checked ? 1 : 0
                    const selectedPCInfo = dataCtrl.returnData('selectedPCInfo')[0]
                    var nrUniversalToSend = selectedPCInfo.nrUniversal
                    var matriculaToSend
                    var retiradoToSend
                    if(newMatricula==null){
                        if(selectedPCInfo.usuario==null){
                            alert("É necessário escolher um nome da lista para salvar os dados!")
                            return 
                        }else if(selectedPCInfo.usuario!=null){
                            matriculaToSend = selectedPCInfo.usuario
                            retiradoToSend = retirado
                        }
                    }else  if(newMatricula==="Em depósito"&&(selectedPCInfo.usuario==null||selectedPCInfo.usuario!=null)){
                        if(retirado===1){
                            alert("PC em depósito não pode ser retirado da GS!")
                            return 
                        }
                        matriculaToSend = null
                        retiradoToSend = 0
                    }else {
                        matriculaToSend = newMatricula
                        retiradoToSend = retirado
                    }
                    $('#myModal').modal('hide')
                    uiCtrl.showHideSpinner('show')
                    setTimeout((e) => {
                        fetch('/postInformation', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({nrUniversalToSend:nrUniversalToSend,matriculaToSend:matriculaToSend,retiradoToSend:retiradoToSend})
                        })
                        .then(answer => { return answer.json()})
                        .then(response => {
                            if(response.success){
                                setTimeout(() => {
                                    alert(response.success)
                                }, 500);
                            }
                            this.fetchResults(dataCtrl,uiCtrl)
                        })
                        .catch(err => {
                            alert(response.err)
                        })
                    }, 0);
                }else{
                    var msg = ''
                    if(document.getElementById('newNrUniversal').value===''){
                        msg = 'Favor informar o novo nr Universal. '
                    }
                    if(document.getElementById('modal-text-input').value===''){
                        msg = `${msg} Favor informar o funcionário com quem está o computador.`
                    }
                    if(msg!==''){
                        alert(msg)
                        return
                    }
                    const dataObj = {
                        nrUniversal: document.getElementById('newNrUniversal').value,
                        nomeDaMaquina : document.getElementById('nomeMaquina').value,
                        before2019: document.getElementById('before2019').checked,
                        ano2019: document.getElementById('ano2019').checked,
                        ano2020: document.getElementById('ano2020').checked,
                        modalRadiusSim: document.getElementById('modal-radius-sim').checked,
                        funci: document.getElementById('modal-text-input').value
                    }
                    uiCtrl.showHideSpinner('show')
                    fetch('/newComputer', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(dataObj)
                    })
                    .then(answwer => { return answwer.json() })
                    .then(response => {
                        if(response.success){
                            fetch('/fetchAllPcs')
                            .then(answer => { return answer.json()})
                            .then(results => {
                                dataCtrl.setData([results])
                                setTimeout(() => {
                                    alert(response.success)
                                }, 0);
                                document.getElementById('manageInputBox').value = ''
                                uiCtrl.changeUIInterfacetAccordingToAppState(dataCtrl,this)
                                this.loadManagedPCsSearchBoxEventListener(dataCtrl,uiCtrl)
                                uiCtrl.showHideSpinner('hide')    
                                $('#myModal').modal('hide')
                            })
                        }else if(response.error){
                            alert(response.error)
                        }
                    })
                    .catch(err => {
                        $('#myModal').modal('hide')
                        alert(err)
                        console.log(err)
                    })
                }
    
    
            })
        }
        if(this.appState===this.appStates._MANAGEITEMS){
            document.getElementById(uiCtrl.returnIDs().modal.btns.submit).addEventListener('click',(e)=>{
                var objArray = []
                var validated = true
                for (let i of document.getElementsByName('itemInfoGroup')){
                    var objData = {}
                    for (let e of i.children){
                        if(e.children[0].classList.contains('item')){
                            if(e.children[0].value===''){
                                validated = false
                            }
                            objData.item = e.children[0].value
                        }
                        if(e.children[0].classList.contains('funci')){
                            if(e.children[0].value===''){
                                validated = false
                            }
                            objData.funci = e.children[0].value
                        }
                        if(e.children[0].classList.contains('obs')){
                            objData.obs = e.children[0].value
                        }
                    }
                    objArray.push(objData)
                }
                if(!validated){
                    return alert('Favor selecionar o item e o funcionário para cada registro da listagem de items!')
                }
                uiCtrl.showHideSpinner('show')
                fetch('/postItems',{
                    method: 'POST',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(objArray)
                })
                .then(answer => {return answer.json()})
                .then(response => {
                    if(response.success){
                        setTimeout(() => {
                            alert(response.success)
                        }, 0);
                        dataCtrl.setOtherItems(response.data)
                        uiCtrl.showHideSpinner('hide')    
                        $('#myModal').modal('hide')
                        uiCtrl.changeUIInterfacetAccordingToAppState(dataCtrl,this)
                        this.loadManagedPCsSearchBoxEventListener(dataCtrl,uiCtrl)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            })
        }
    }
}