class UICtrl {
    constructor(){

        this.btns = {
            stateBtns: {
                allPCs: 'allPCs',
                allInOffice: 'allInOffice',
                allOutOfOffice: 'allOutOfOffice',
                allItems: 'allItems',
                managePCs: 'managePCs',
                manageItems: 'manageItems',
                generalView: 'generalView'
            }
        }
        this.columns = {
            appState: 'appState',
            appContent: 'appContent'
        }
        this.manage = {
            input: 'manageInputBox',
            btn: {
                registerNew: 'computerNewRegister'
            }
        }
        this.items = {
            list: {
                div: 'itemsListContainer',
                items: 'itemRow'
            },
            btn: {
                add: 'addItem'
            }
        }
        this.inputs = {
            nrUniversalSearchBox: 'nr-universal-serach-box'
        }
        
        this.modal = {
            content: 'modal-content',
            radius: {
                sim: 'modal-radius-sim',
                nao: 'modal-radius-nao',
                before2019 : 'before2019',
                ano2019: 'ano2019',
                ano2020: 'ano2020'
            },
            input: 'modal-text-input',
            input2: 'modal-text-input2',
            input3: 'modal-text-input3',
            form: 'modal-form',
            btns: {
                submit: 'modal-btn-submit'
            },
            attributes: {
                pcRetirado: 'pcRetirado',
                nomeFunci: 'nomeFunci',
                nrUniversal: 'newNrUniversal',
                nomeMaquina: 'nomeMaquina',
                tipoItem: 'tipoItem',
                itemObservacao: 'itemObservacao'
            }
        }
        this.table = 'results-table'
        this.tbody = 'table-body'
        this.mainContent = 'main-content'
        this.spinner = `spinner`
        this.main = 'main'
        this.footer = 'footer-information-flex-wrapper'
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// CHANGE UI INTERFACE ACCORDING TO APP STATE
    changeUIInterfacetAccordingToAppState(dataCtrl,appCtrl){
        if(appCtrl.returnAppStates()._ALLPCS === appCtrl.getAppState()){
            const tempArray= dataCtrl.returnData('allPCs')
            var innerTable = ''
            tempArray.allData.forEach(reg => {
                innerTable = `${innerTable}
                <tr>
                    <td  style="width:12%">${reg.nrUniversal}</td>
                    <td  style="width:10%">${reg.retirado === 1 ? 'Sim' : 'Não'}</td>
                    <td  style="width:15%">${reg.usuario==null ? '' : reg.usuario}</td>
                    <td  style="width:20%">${reg.nome==null ? '' : reg.nome}</td>
                    <td  style="width:12%">${reg.nome_uor_trabalho==null ? '' : reg.nome_uor_trabalho}</td>
                    <th style="width:7%">${reg.novos2020===1 ? 'S' : ''}</th>
                    <th style="width:7%">${reg.novos2019===1 ? 'S' : ''}</th>
                    <th style="width:7%">${reg.antigos===1 ? 'S' : ''}</th>
                    <td  style="width:10%"><button id="${reg.nrUniversal}" type="button" class="btn btn-secondary" data-toggle="modal" data-target=".bd-example-modal-lg">Alterar</button></td>
                </tr>
                `
            })
            document.getElementById(this.columns.appContent).innerHTML = `
            <style>
                tfoot tr:nth-child(4) td {
                    position: sticky; bottom: 0; 
                    background-color: #dee2e6;
                }
                tfoot tr:nth-child(3) td {
                    position: sticky; bottom: 30px; 
                    background-color: #dee2e6;
                }
                tfoot tr:nth-child(2) td {
                    position: sticky; bottom: 60px; 
                    background-color: #dee2e6;
                }
                tfoot tr:nth-child(1) td {
                    position: sticky; bottom: 90px; 
                    background-color: #dee2e6;
                }
            </style>
            <div class=".container-fluid h-100 w-100 mx-auto my-auto" style="overflow-y:auto;overflow-x:clip">
                <table id="${this.table}" class="table table-light table-striped table-hover table-sm w-100" style="margin:3px">
                <thead class="">
                    <tr>
                        <th style="width:12%"><input type="text" id="${this.inputs.nrUniversalSearchBox}" placeholder="Nr universal"></th>
                        <th style="width:10%">Retirado</th>
                        <th style="width:15%">Matrícula</th>
                        <th style="width:20%">Nome</th>
                        <th style="width:12%">Equipe</th>
                        <th style="width:7%">21</th>
                        <th style="width:7%">20</th>
                        <th style="width:7%">Old</th>
                        <th style="width:10%"></th>
                    </tr>
                </thead>
                <tbody id="${this.tbody}">
                    ${innerTable}
                </tbody>
            </table>
            </div>
            `
        }
        if(appCtrl.returnAppStates()._INOFFICE === appCtrl.getAppState()){
            const tempArray= dataCtrl.returnData('inOffice')
            var innerTable = ''
            tempArray.inOffice.forEach(reg => {
                innerTable = `${innerTable}
                <tr>
                    <td  style="width:12%">${reg.nrUniversal}</td>
                    <td  style="width:10%">${reg.retirado === 1 ? 'Sim' : 'Não'}</td>
                    <td  style="width:15%">${reg.usuario==null ? '' : reg.usuario}</td>
                    <td  style="width:20%">${reg.nome==null ? '' : reg.nome}</td>
                    <td  style="width:12%">${reg.nome_uor_trabalho==null ? '' : reg.nome_uor_trabalho}</td>
                    <th style="width:7%">${reg.novos2020===1 ? 'S' : ''}</th>
                    <th style="width:7%">${reg.novos2019===1 ? 'S' : ''}</th>
                    <th style="width:7%">${reg.antigos===1 ? 'S' : ''}</th>
                    <td  style="width:10%"><button id="${reg.nrUniversal}" type="button" class="btn btn-secondary" data-toggle="modal" data-target=".bd-example-modal-lg">Alterar</button></td>
                </tr>
                `
            })
            document.getElementById(this.columns.appContent).innerHTML = `
            <style>
                tfoot tr:nth-child(2) td {
                    position: sticky; bottom: 0px; 
                    background-color: #dee2e6;
                }
                tfoot tr:nth-child(1) td {
                    position: sticky; bottom: 30px; 
                    background-color: #dee2e6;
                }
            </style>
            <div class=".container-fluid h-100 w-100 mx-auto my-auto" style="overflow-y:auto;overflow-x:clip">
                <table id="${this.table}" class="table table-light table-striped table-hover table-sm w-100" style="margin:3px">
                <thead class="">
                    <tr>
                        <th style="width:12%"><input type="text" id="${this.inputs.nrUniversalSearchBox}" placeholder="Nr universal"></th>
                        <th style="width:10%">Retirado</th>
                        <th style="width:15%">Matrícula</th>
                        <th style="width:20%">Nome</th>
                        <th style="width:12%">Equipe</th>
                        <th style="width:7%">21</th>
                        <th style="width:7%">20</th>
                        <th style="width:7%">Old</th>
                        <th style="width:10%"></th>
                    </tr>
                </thead>
                <tbody id="${this.tbody}">
                    ${innerTable}
                </tbody>
            </table>
            </div>
            `
        }
        if(appCtrl.returnAppStates()._OUTOFOFFICE === appCtrl.getAppState()){
            const tempArray= dataCtrl.returnData('outOfOffice')
            var innerTable = ''
            tempArray.outOfOffice.forEach(reg => {
                innerTable = `${innerTable}
                <tr>
                    <td  style="width:12%">${reg.nrUniversal}</td>
                    <td  style="width:10%">${reg.retirado === 1 ? 'Sim' : 'Não'}</td>
                    <td  style="width:15%">${reg.usuario==null ? '' : reg.usuario}</td>
                    <td  style="width:20%">${reg.nome==null ? '' : reg.nome}</td>
                    <td  style="width:12%">${reg.nome_uor_trabalho==null ? '' : reg.nome_uor_trabalho}</td>
                    <th style="width:7%">${reg.novos2020===1 ? 'S' : ''}</th>
                    <th style="width:7%">${reg.novos2019===1 ? 'S' : ''}</th>
                    <th style="width:7%">${reg.antigos===1 ? 'S' : ''}</th>
                    <td  style="width:10%"><button id="${reg.nrUniversal}" type="button" class="btn btn-secondary" data-toggle="modal" data-target=".bd-example-modal-lg">Alterar</button></td>
                </tr>
                `
            })
            document.getElementById(this.columns.appContent).innerHTML = `
            <style>
                tfoot tr:nth-child(2) td {
                    position: sticky; bottom: 0px; 
                    background-color: #dee2e6;
                }
                tfoot tr:nth-child(1) td {
                    position: sticky; bottom: 30px; 
                    background-color: #dee2e6;
                }
            </style>
            <div class=".container-fluid h-100 w-100 mx-auto my-auto" style="overflow-y:auto;overflow-x:clip">
                <table id="${this.table}" class="table table-light table-striped table-hover table-sm w-100" style="margin:3px">
                <thead class="">
                    <tr>
                        <th style="width:12%"><input type="text" id="${this.inputs.nrUniversalSearchBox}" placeholder="Nr universal"></th>
                        <th style="width:10%">Retirado</th>
                        <th style="width:15%">Matrícula</th>
                        <th style="width:20%">Nome</th>
                        <th style="width:12%">Equipe</th>
                        <th style="width:7%">21</th>
                        <th style="width:7%">20</th>
                        <th style="width:7%">Old</th>
                        <th style="width:10%"></th>
                    </tr>
                </thead>
                <tbody id="${this.tbody}">
                    ${innerTable}
                </tbody>
            </table>
            </div>
            `
        }
        if(appCtrl.returnAppStates()._MANAGEPCS === appCtrl.getAppState()){
            document.getElementById(this.columns.appContent).innerHTML = `
            <div class=".container-fluid h-100 w-100 mx-auto my-auto" style="padding:5px;overflow-y:auto;">
                <div class="d-flex" style="height:8%!important">
                    <div class="p-2">
                    <label for="${this.manage.input}">Busque por nro universal </label>
                        <input type="text" id="${this.manage.input}" placeholder="Nr universal">
                    </div>
                </div>
                <div class=".container-fluid w-100 mx-auto my-auto" style="overflow-y:auto;overflow-x:clip" style="height:92%!important">
                    <table id="${this.table}" class="table table-light table-striped table-hover table-sm w-100" style="margin:3px">
                        <thead class="">
                            <tr>
                                <th style="width:12%">Nr universal</th>
                                <th style="width:10%">Retirado</th>
                                <th style="width:15%">Matrícula</th>
                                <th style="width:20%">Nome</th>
                                <th style="width:12%">Equipe</th>
                                <th style="width:7%">21</th>
                                <th style="width:7%">20</th>
                                <th style="width:7%">Old</th>
                                <th style="width:10%"></th>
                            </tr>
                        </thead>
                        <tbody id="${this.tbody}">
                            <tr>
                                <td colspan="9">Busque por número único</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            `
        }
        if(appCtrl.returnAppStates()._MANAGEITEMS === appCtrl.getAppState()){
            const funcis = dataCtrl.returnData('funcis')
            var options = ' <option value="Em depósito-">'
            funcis.forEach(funci => {
                options= `${options}
                    <option value="${funci.matricula}- ${funci.nome}"> 
                `
            })
            const itemsTypes = dataCtrl.returnData('itemTypes')
            var options2 = ''
            itemsTypes.forEach(t => {
                options2 = `${options2}
                    <option value="${t.id}- ${t.item}"> 
                `
            })
            const items = dataCtrl.returnData('itemTypes')
            var options3 = ''
            itemsTypes.forEach(i => {
                options3 = `${options2}
                    <option value="${i.id}- ${i.item}"> 
                `
            })
            document.getElementById(this.columns.appContent).innerHTML = `
            <div class=".container-fluid h-100 w-100 mx-auto my-auto" style="padding:5px;overflow-y:auto;">
                <div class="d-flex" style="height:8%!important">
                    <div class="p-2">
                    <label for="${this.manage.input}">Busque por matrícula de funcionário </label>
                        <input type="text" id="${this.manage.input}" placeholder="Matrícula, item, nome, equipe..." style="width:350px">
                    </div>
                </div>
                <div class=".container-fluid w-100 mx-auto my-auto" style="overflow-y:auto;overflow-x:clip" style="height:92%!important">
                    <table id="${this.table}" class="table table-light table-striped table-hover table-sm w-100" style="margin:3px">
                        <thead class="">
                            <tr>
                            <th style="width:12%">Item</th>
                            <th style="width:12%">Observação</th>
                            <th style="width:10%">Funcionário</th>
                            <th style="width:15%">Equipe</th>
                            <th style="width:7%">Data retirada</th>
                            <th style="width:10%"></th>
                            </tr>
                        </thead>
                        <tbody id="${this.tbody}">
                            <tr>
                                <td colspan="9">Busque por matrícula de funcionário</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            `
        }
        if(appCtrl.returnAppStates()._GENERALVIEW === appCtrl.getAppState()){
            const totals = dataCtrl.returnData('totals')
            document.getElementById(this.columns.appContent).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100 h-100" style="overflow-y:auto">
            
                <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 200px!important;">
                    <div class="h1">Apoio e Bens</div>
                    <div class=".container-fluid mx-auto my-auto text-center w-100 h-75" style="overflow-y: auto;">
                        <div class="row mx-auto my-auto w-100">
                            <div class="col-4">
                                <div class="h4">Novos 2021</div>
                                    <div class="row mx-auto my-auto w-100">
                                        <div class="col-5 text-left"><strong>Total:</strong></div>
                                        <div class="col-7">${totals.bensNew}</div>
                                        <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                        <div class="col-7">${totals.bensNewIn}</div>
                                        <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                        <div class="col-7">${totals.bensNewOut}</div>
                                    </div>
                            </div>
                            <div class="col-4">
                                <div class="h4">Novos 2020</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.bens2020}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.bens2020In}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.bens2020Out}</div>
                                </div>
                                
                            </div>
                            <div class="col-4">
                                <div class="h4">Antigos</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.bensOld}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.bensOldIn}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.bensOldOut}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>   
                </div>
                <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 200px!important;">
                    <div class="h1">Crédito</div>
                    <div class=".container-fluid mx-auto my-auto text-center w-100 h-75" style="overflow-y: auto;">
                        <div class="row mx-auto my-auto w-100">
                            <div class="col-4">
                                <div class="h4">Novos 2021</div>
                                    <div class="row mx-auto my-auto w-100">
                                        <div class="col-5 text-left"><strong>Total:</strong></div>
                                        <div class="col-7">${totals.crdNew}</div>
                                        <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                        <div class="col-7">${totals.crdNewIn}</div>
                                        <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                        <div class="col-7">${totals.crdNewOut}</div>
                                    </div>
                            </div>
                            <div class="col-4">
                                <div class="h4">Novos 2020</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.crd2020}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.crd2020In}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.crd2020Out}</div>
                                </div>
                                
                            </div>
                            <div class="col-4">
                                <div class="h4">Antigos</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.crdOld}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.crdOldIn}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.crdOldOut}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>   
                </div>

                <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 200px!important;">
                    <div class="h1">Judicial</div>
                    <div class=".container-fluid mx-auto my-auto text-center w-100 h-75" style="overflow-y: auto;">
                        <div class="row mx-auto my-auto w-100">
                            <div class="col-4">
                                <div class="h4">Novos 2021</div>
                                    <div class="row mx-auto my-auto w-100">
                                        <div class="col-5 text-left"><strong>Total:</strong></div>
                                        <div class="col-7">${totals.judNew}</div>
                                        <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                        <div class="col-7">${totals.judNewIn}</div>
                                        <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                        <div class="col-7">${totals.judNewOut}</div>
                                    </div>
                            </div>
                            <div class="col-4">
                                <div class="h4">Novos 2020</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.jud2020}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.jud2020In}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.jud2020Out}</div>
                                </div>
                                
                            </div>
                            <div class="col-4">
                                <div class="h4">Antigos</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.judOld}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.judOldIn}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.judOldOut}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>   
                </div>

                <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 200px!important;">
                    <div class="h1">Gecor Serviços</div>
                    <div class=".container-fluid mx-auto my-auto text-center w-100 h-75" style="overflow-y: auto;">
                        <div class="row mx-auto my-auto w-100">
                            <div class="col-4">
                                <div class="h4">Novos 2021</div>
                                    <div class="row mx-auto my-auto w-100">
                                        <div class="col-5 text-left"><strong>Total:</strong></div>
                                        <div class="col-7">${totals.gsNew}</div>
                                        <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                        <div class="col-7">${totals.gsNewIn}</div>
                                        <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                        <div class="col-7">${totals.gsNewOut}</div>
                                    </div>
                            </div>
                            <div class="col-4">
                                <div class="h4">Novos 2020</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.gs2020}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.gs2020In}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.gs2020Out}</div>
                                </div>
                                
                            </div>
                            <div class="col-4">
                                <div class="h4">Antigos</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.gsOld}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.gsOldIn}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.gsOldOut}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>   
                </div>

                <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 200px!important;">
                    <div class="h1">Limbo</div>
                    <div class=".container-fluid mx-auto my-auto text-center w-100 h-75" style="overflow-y: auto;">
                        <div class="row mx-auto my-auto w-100">
                            <div class="col-4">
                                <div class="h4">Novos 2021</div>
                                    <div class="row mx-auto my-auto w-100">
                                        <div class="col-5 text-left"><strong>Total:</strong></div>
                                        <div class="col-7">${totals.limboNew}</div>
                                        <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                        <div class="col-7">${totals.limboNewIn}</div>
                                        <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                        <div class="col-7">${totals.limboNewOut}</div>
                                    </div>
                            </div>
                            <div class="col-4">
                                <div class="h4">Novos 2020</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.limbo2020}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.limbo2020In}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.limbo2020Out}</div>
                                </div>
                                
                            </div>
                            <div class="col-4">
                                <div class="h4">Antigos</div>
                                <div class="row mx-auto my-auto w-100">
                                    <div class="col-5 text-left"><strong>Total:</strong></div>
                                    <div class="col-7">${totals.limboOld}</div>
                                    <div class="col-5 text-left"><strong>Na GS:</strong></div>
                                    <div class="col-7">${totals.limboOldIn}</div>
                                    <div class="col-5 text-left"><strong>Fora GS:</strong></div>
                                    <div class="col-7">${totals.limboOldOut}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            `
        }
        if(appCtrl.returnAppStates()._ALLITEMS === appCtrl.getAppState()){
            const tempArray= dataCtrl.returnData('otherItems')
            var innerTable = ''
            tempArray.forEach(reg => {
                innerTable = `${innerTable}
                <tr>
                    <td  style="width:12%">${reg.item}</td>
                    <td  style="width:10%">${reg.description}</td>
                    <td  style="width:15%">${reg.nome}</td>
                    <td  style="width:20%">${reg.nome_uor_grupo}</td>
                    <td  style="width:12%">${reg.datetime==null ? '' : reg.datetime.split('T')[0]}</td>
                    <td  style="width:10%"><button id="${reg.id}" type="button" class="btn btn-secondary">Devoler</button></td>
                </tr>
                `
            })
            document.getElementById(this.columns.appContent).innerHTML = `
            <style>
                tfoot tr:nth-child(4) td {
                    position: sticky; bottom: 0; 
                    background-color: #dee2e6;
                }
                tfoot tr:nth-child(3) td {
                    position: sticky; bottom: 30px; 
                    background-color: #dee2e6;
                }
                tfoot tr:nth-child(2) td {
                    position: sticky; bottom: 60px; 
                    background-color: #dee2e6;
                }
                tfoot tr:nth-child(1) td {
                    position: sticky; bottom: 90px; 
                    background-color: #dee2e6;
                }
            </style>
            <div class=".container-fluid h-100 w-100 mx-auto my-auto" style="overflow-y:auto;overflow-x:clip">
                <table id="${this.table}" class="table table-light table-striped table-hover table-sm w-100" style="margin:3px">
                <thead class="">
                    <tr>
                        <th style="width:12%"><input type="text" id="${this.inputs.nrUniversalSearchBox}" placeholder="Funci, item, equipe"></th>
                        <th style="width:12%">Observação</th>
                        <th style="width:10%">Funcionário</th>
                        <th style="width:15%">Equipe</th>
                        <th style="width:7%">Data retirada</th>
                        <th style="width:10%"></th>
                    </tr>
                </thead>
                <tbody id="${this.tbody}">
                    ${innerTable}
                </tbody>
            </table>
            </div>
            `
        }
        
    }
    fillInManagedPCsOrItemsInnerTable(dataCtrl,appCtrl,value){
        var innerTable = ''
        var tempArray = []
        var tempResult = []
        function commonFunctions(appCtrl, uiCtrl, arrayLengthGreaterThanZero){
            if(arrayLengthGreaterThanZero){
                document.getElementById(uiCtrl.tbody).innerHTML = innerTable
                return
            }
            document.getElementById(uiCtrl.tbody).innerHTML = innerTable
            appCtrl.loadNewRegisterPCEventListener(dataCtrl,uiCtrl)
        }
        if(appCtrl.returnAppStates()._MANAGEPCS === appCtrl.getAppState()){
            tempArray = dataCtrl.returnData('allPCs')
            tempResult = tempArray.allData.filter(reg => {
                if(reg.nrUniversal.match(new RegExp(value,'ig'))){
                    return true
                }
            })
            if(tempResult.length > 0 ){
                tempResult.forEach(reg => {
                    innerTable = `${innerTable}
                    <tr>
                        <td  style="width:12%">${reg.nrUniversal}</td>
                        <td  style="width:10%">${reg.retirado === 1 ? 'Sim' : 'Não'}</td>
                        <td  style="width:15%">${reg.usuario==null ? '' : reg.usuario}</td>
                        <td  style="width:20%">${reg.nome==null ? '' : reg.nome}</td>
                        <td  style="width:12%">${reg.nome_uor_trabalho==null ? '' : reg.nome_uor_trabalho}</td>
                        <th style="width:7%">${reg.novos2020===1 ? 'S' : ''}</th>
                        <th style="width:7%">${reg.novos2019===1 ? 'S' : ''}</th>
                        <th style="width:7%">${reg.antigos===1 ? 'S' : ''}</th>
                        <td  style="width:10%"><button id="${reg.nrUniversal}" type="button" class="btn btn-secondary" data-toggle="modal" data-target=".bd-example-modal-lg">Alterar</button></td>
                    </tr>
                    `
                    commonFunctions(appCtrl,this,true)
                })
            }else{
                innerTable = `
                <tr>
                    <td colspan="9">Nenhum computador localizado</td>
                </tr>
                <tr >
                    <td colspan="9"><button id="${this.manage.btn.registerNew}" type="button" class="btn btn-info" data-toggle="modal" data-target=".bd-example-modal-lg">Cadastrar pc </button></td>
                </tr>
                `
                commonFunctions(appCtrl,this,false)
            }
        }
        if(appCtrl.returnAppStates()._MANAGEITEMS === appCtrl.getAppState()){
            tempArray = dataCtrl.returnData('otherItems')
            tempResult = tempArray.filter(reg => {
                if(reg.searchString.match(new RegExp(value,'ig'))){
                    return true
                }
            })
            if(tempResult.length > 0 ){
                tempResult.forEach(reg => {
                    innerTable = `${innerTable}
                    <tr>
                        <td  style="width:12%">${reg.item}</td>
                        <td  style="width:10%">${reg.description}</td>
                        <td  style="width:15%">${reg.nome}</td>
                        <td  style="width:20%">${reg.nome_uor_grupo}</td>
                        <td  style="width:12%">${reg.datetime==null ? '' : reg.datetime.split('T')[0]}</td>
                        <td  style="width:10%"><button id="${reg.id}" type="button" class="btn btn-secondary">Devoler</button></td>
                    </tr>
                    `
                    commonFunctions(appCtrl,this,true)
                })
            }else{
                innerTable = `
                <tr>
                    <td colspan="9">Nenhum item localizado</td>
                </tr>
                <tr >
                    <td colspan="9"><button id="${this.manage.btn.registerNew}" type="button" class="btn btn-info" data-toggle="modal" data-target=".bd-example-modal-lg">Registrar items </button></td>
                </tr>
                `
                commonFunctions(appCtrl,this,false)
            }
        }
    }
    changeUIInterfacetAccordingToAppStateSearchModeOn(dataCtrl,appCtrl,value){
        var tempArray = ''
        var searchArray  = ''
        const state = appCtrl.getAppState()
        switch (state) {
            case appCtrl.returnAppStates()._ALLPCS:
                tempArray = dataCtrl.returnData('allPCs').allData
                break;
            case appCtrl.returnAppStates()._INOFFICE:
                tempArray = dataCtrl.returnData('inOffice').inOffice
                break;
            case appCtrl.returnAppStates()._OUTOFOFFICE:
                tempArray = dataCtrl.returnData('outOfOffice').outOfOffice
                break;
            case appCtrl.returnAppStates()._ALLITEMS:
                tempArray = dataCtrl.returnData('otherItems')
                break;
            default:
                break;
        }
        var innerTable = ''
        if(state===appCtrl.returnAppStates()._ALLITEMS){
            tempArray.forEach(reg => {
                if(reg.searchString.match(new RegExp(value,'ig'))){
                    innerTable = `${innerTable}
                    <tr>
                        <td  style="width:12%">${reg.item}</td>
                        <td  style="width:10%">${reg.description}</td>
                        <td  style="width:15%">${reg.nome}</td>
                        <td  style="width:20%">${reg.nome_uor_grupo}</td>
                        <td  style="width:12%">${reg.datetime==null ? '' : reg.datetime.split('T')[0]}</td>
                        <td  style="width:10%"><button id="${reg.id}" type="button" class="btn btn-secondary">Devoler</button></td>
                    </tr>
                    `
                }
            })
        }else{
            tempArray.forEach(reg => {
                if(reg.nrUniversal.match(new RegExp(value,'ig'))){
                    innerTable = `${innerTable}
                    <tr>
                        <td  style="width:12%">${reg.nrUniversal}</td>
                        <td  style="width:10%">${reg.retirado === 1 ? 'Sim' : 'Não'}</td>
                        <td  style="width:15%">${reg.usuario==null ? '' : reg.usuario}</td>
                        <td  style="width:20%">${reg.nome==null ? '' : reg.nome}</td>
                        <td  style="width:12%">${reg.nome_uor_trabalho==null ? '' : reg.nome_uor_trabalho}</td>
                        <th style="width:7%">${reg.novos2020===1 ? 'S' : ''}</th>
                        <th style="width:7%">${reg.novos2019===1 ? 'S' : ''}</th>
                        <th style="width:7%">${reg.antigos===1 ? 'S' : ''}</th>
                        <td  style="width:10%"><button id="${reg.nrUniversal}" type="button" class="btn btn-secondary" data-toggle="modal" data-target=".bd-example-modal-lg">Alterar</button></td>
                    </tr>
                    `
                }
            })
        }
        document.getElementById(this.tbody).innerHTML = innerTable
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// RETURN IDS
    returnIDs(){
        return this
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// CONTROLE BUTTON CLASSES
    addActiveClassToAppStateButton(btn,appCtrl){
        for (const btnID in this.btns.stateBtns) {
            const btn = document.getElementById(this.btns.stateBtns[btnID])
            if(btn.classList.contains('active')){
                btn.classList.remove('active')
            }
        }
        if(btn===null){
            document.getElementById(this.btns.stateBtns.allPCs).classList.add('active')
        }else{
            btn.classList.add('active')
        }
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// CREATE MODAL
    createModal(dataCtrl,appCtrl,selectedRegister){
        const funcis = dataCtrl.returnData('funcis')
        var options = ' <option value="Em depósito-">'
        funcis.forEach(funci => {
            options= `${options}
                <option value="${funci.matricula}- ${funci.nome}"> 
            `
        })
        console.log(options)
        if(appCtrl.getAppState() !== appCtrl.returnAppStates()._MANAGEITEMS ||
        appCtrl.getAppState() !== appCtrl.returnAppStates()._ALLPCS ||
        appCtrl.getAppState() !== appCtrl.returnAppStates()._INOFFICE ||
        appCtrl.getAppState() !== appCtrl.returnAppStates()._OUTOFOFFICE){
            if(dataCtrl.returnData('selectedPC')){
                document.getElementById(this.modal.content).innerHTML = `
                <div class="modal-header">
                    <h4 class="modal-title">
                        Informações sobre o computador nr ${selectedRegister.nrUniversal}
                    </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-lable="Fechar"><span aria-hidden="true">x</span></button>
                </div>
        
                <div class="modal-body">
                    <div id="${this.modal.form}" class="form">
                        <div class="container text-center mx-auto my-auto">
                            <p class="h4">Computador foi retirado da GS?</p>
                            <div class="container text-center mx-auto my-auto">
                                <div class="row">
                                    <div class="col-12">
                                        <input type="radio" id="${this.modal.radius.sim}" name="${this.modal.attributes.pcRetirado}" value="sim" ${selectedRegister.retirado===1 ? 'checked' : ''}>
                                        <label for="${this.modal.radius.sim}">Sim</label>
                                    </div>
                                    <div class="col-12">
                                        <input type="radio" id="${this.modal.radius.nao}" name="${this.modal.attributes.pcRetirado}" value="nao" ${selectedRegister.retirado===1 ? '' : 'checked'}>
                                        <label for="${this.modal.radius.nao}">Não</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container text-center mx-auto my-auto">
                            <p class="h4">Com quem está o computador?</p>
                            <div class="container text-center mx-auto my-auto" style="height:5px!important"></div>
                            <div class="container text-center mx-auto my-auto" style="height:5px!important;margin-bottom:20px!important">
                                <p class="h6">${selectedRegister.nome == null ? '<i>Não distribuído</i>' : selectedRegister.nome}</p>
                            </div>
                            <div class="container text-center mx-auto my-auto" style="height:5px!important"></div>
                            <p class="h5">Para alterar escolha um nome da lista abaixo"<p>
                            <div class="container text-center mx-auto my-auto">
                                <input id="${this.modal.input}" type="text" class="w-75" name="${this.modal.attributes.nomeFunci}" list="funciList" placeholder="Digite o nome...">
                                <datalist id="funciList">
                                    ${options}
                                </datalist>
                            </div>
                        </div>
                        <div class=".container-fuild mx-auto my-auto text-center w-100" style="margin-top:5px!important">
                            <button id="${this.modal.btns.submit}" type="none" class="btn btn-primary">Salvar</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" aria-lable="Fechar">Cancelar</button> 
                        </div>
                    </div>
                </div>
                `
            }else{
                document.getElementById(this.modal.content).innerHTML = `
                <div class="modal-header">
                    <h4 class="modal-title">
                        Informe o tipo de item e por quem foi retirado. Aperte no botão mais para adicionar mais items nesta mesma tela.
                    </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-lable="Fechar"><span aria-hidden="true">x</span></button>
                </div>
                <div class="modal-body">
                    <div id="${this.modal.form}" class="form">
                        <div class="container text-center mx-auto my-auto">
                            <p class="h4">Número universal</p>
                            <div class="container text-center mx-auto my-auto">
                                <label for="${this.modal.attributes.nrUniversal}">Digite o Nr. Universal do computador: </label>
                                <input id="${this.modal.attributes.nrUniversal}"  type="text" name="${this.modal.attributes.nrUniversal}">
                            </div>
                            <p class="h4">Nome da máquina</p>
                            <div class="container text-center mx-auto my-auto">
                                <label for="${this.modal.attributes.nomeMaquina}">Digite o nome da máquina: </label>
                                <input id="${this.modal.attributes.nomeMaquina}"  type="text" name="${this.modal.attributes.nomeMaquina}">
                            </div>
                        </div>
                        <div class="container text-center mx-auto my-auto">
                            <p class="h4">Qual o ano de compra do computador?</p>
                            <div class="container text-center mx-auto my-auto">
                                <div class="row">
                                    <div class="col-12">
                                        <input type="radio" id="${this.modal.radius.before2019}" name="${this.modal.attributes.before2019}" value="2013" checked>
                                        <label for="${this.modal.radius.before2019}">Antes de 2019</label>
                                    </div>
                                    <div class="col-12">
                                        <input type="radio" id="${this.modal.radius.ano2019}" name="${this.modal.attributes.ano2019}" value="2019">
                                        <label for="${this.modal.radius.ano2019}">2019</label>
                                    </div>
                                    <div class="col-12">
                                        <input type="radio" id="${this.modal.radius.ano2020}" name="${this.modal.attributes.ano2020}" value="2020">
                                        <label for="${this.modal.radius.ano2020}">2020</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container text-center mx-auto my-auto">
                            <p class="h4">Computador foi retirado da GS?</p>
                            <div class="container text-center mx-auto my-auto">
                                <div class="row">
                                    <div class="col-12">
                                        <input type="radio" id="${this.modal.radius.sim}" name="${this.modal.attributes.pcRetirado}" value="sim" checked>
                                        <label for="${this.modal.radius.sim}">Sim</label>
                                    </div>
                                    <div class="col-12">
                                        <input type="radio" id="${this.modal.radius.nao}" name="${this.modal.attributes.pcRetirado}" value="nao">
                                        <label for="${this.modal.radius.nao}">Não</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container text-center mx-auto my-auto">
                            <p class="h4">Com quem está o computador?</p>
                            
                            <p class="h5">Para alterar escolha um nome da lista abaixo"<p>
                            <div class="container text-center mx-auto my-auto">
                                <input id="${this.modal.input}" type="text" class="w-75" name="${this.modal.attributes.nomeFunci}" list="funciList" placeholder="Digite o nome...">
                                <datalist id="funciList">
                                    ${options}
                                </datalist>
                            </div>
                        </div>
                        <div class=".container-fuild mx-auto my-auto text-center w-100" style="margin-top:5px!important">
                            <button id="${this.modal.btns.submit}" type="none" class="btn btn-primary">Salvar</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" aria-lable="Fechar">Cancelar</button> 
                        </div>
    
                    </div>
                </div>
                `
            }
        }
        if(appCtrl.returnAppStates()._MANAGEITEMS === appCtrl.getAppState()){
            const types = dataCtrl.returnData('itemTypes')
            var itemTypes = ' <option value="Em depósito-">'
            types.forEach(type => {
                itemTypes= `${itemTypes}
                    <option value="${type.id}- ${type.item}"> 
                `
            })
            console.log(itemTypes)
            document.getElementById(this.modal.content).innerHTML = `
            <div class="modal-header">
                    <h4 class="modal-title">
                        Informe o tipo de item e por quem foi retirado. Aperte no botão mais para adicionar mais items nesta mesma tela.
                    </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-lable="Fechar"><span aria-hidden="true">x</span></button>
                </div>
                <div class="modal-body">
                    <div id="${this.modal.form}" class="form">
                        <div class="container text-center mx-auto my-auto">
                            </br>
                            <p class="h4">Listagem de items</p>
                            <p class="h6">Cada linha é 1 item. Logo, se levou dois cabos de rede, inserir dois items do tipo Cabo de rede</p>
                            <div id="itemContainer" class="container text-center mx-auto my-auto" style="overflow-y:auto;height:250px!important">
                                <div name="item-elements" class="container text-center mx-auto my-auto" style="height:35px!important;border:black 1px solid">
                                    <div class="row w-100 h-100" name="itemInfoGroup">
                                        <div class="col-4">
                                            <input type="text" class="w-75 item" name="${this.modal.attributes.itemObservacao}" list="itemList" placeholder="Item">
                                            <datalist id="itemList">
                                                ${itemTypes}
                                            </datalist>
                                        </div>    
                                        <div class="col-3">
                                            <input type="text" class="w-75 funci" name="${this.modal.attributes.itemObservacao}" list="funciList" placeholder="Funcionario">
                                            <datalist id="funciList">
                                                ${options}
                                            </datalist>
                                        </div>
                                        <div class="col-4">
                                            <input type="text" class="w-75 obs" name="${this.modal.attributes.itemObservacao}" placeholder="Observacoes">
                                        </div>
                                        <div class="col-1 text-center my-auto">
                                            <button class="btn btn-danger" style="height:30px!important;text-aligh:center;padding-top:0;display:none"><strong>X</strong></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </br>
                        </div>
                        <div class=".container-fuild mx-auto my-auto text-center w-100" style="margin-top:5px!important">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button> 
                            <button id="${this.modal.btns.submit}" type="button" class="btn btn-primary">Salvar</button>
                            <button type="button" class="btn btn-success" onclick="addElement()">Adicionar item</button> 
                        </div>
                        
                    </div>
                </div>
            </div>
            `
        }
        appCtrl.loadModalSubmitButtonEventListener(dataCtrl,this)
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// UPDATE FOOTER INFORMATION
    updateFooterInformation(dataCtrl){
       
    }
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
// SHOW HIDE SPINNER
    showHideSpinner(show_hide){
        if(show_hide==='hide'){
            document.getElementById(this.spinner).style.display = 'none'
            document.getElementById(this.main).style.display = 'block'
        }else if(show_hide==='show'){
            document.getElementById(this.spinner).style.display = 'block'
            document.getElementById(this.main).style.display = 'none'
        }
    }
}
function addElement(){
    var idIndex = document.getElementsByName('item-elements').length
    var ele = document.getElementsByName('item-elements')[document.getElementsByName('item-elements').length-1]
    var innerHTML = ele.innerHTML
    var div = document.createElement('div')
    div.classList.add('container','text-center','mx-auto','my-auto')
    div.setAttribute("name","item-elements")
    div.style.height = '35px!important'
    div.style.border= 'black 1px solid'
    div.innerHTML = innerHTML
    div.childNodes[1].childNodes[1].children[0].setAttribute('list',`itemList${idIndex}`)
    div.childNodes[1].childNodes[1].children[1].id = `itemList${idIndex}`
    div.childNodes[1].childNodes[3].children[0].setAttribute('list',`funciList${idIndex}`)
    div.childNodes[1].childNodes[3].children[1].id = `funciList${idIndex}`
    ele.parentElement.insertBefore(div,ele.nextElementSibling)
    div.childNodes[1].childNodes[7].firstElementChild.style.display = 'block'
    div.childNodes[1].childNodes[7].firstElementChild.onclick = function(event) {
        this.parentElement.parentElement.parentElement.remove()
    }
}