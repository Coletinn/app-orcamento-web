class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if (this[i] == null || this[i] == undefined || this[i] == '') {
                return false
            }
        }
        return true
    }
}

class BD {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(despesa) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(despesa))

        localStorage.setItem('id', id)
    }
}

let bd = new BD()

function cadastrarDespesa() {
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

    if (despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modalTitulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modalTituloDiv').className = 'modal-header text-success'
        document.getElementById('modalConteudo').innerHTML = 'Despesa cadastrada com sucesso'
        document.getElementById('modalBotao').innerHTML = 'Voltar'
        document.getElementById('modalBotao').className = 'btn btn-success'

        $('#modalRegistrarDespesa').modal('show')
    } else {
        document.getElementById('modalTitulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modalTituloDiv').className = 'modal-header text-danger'
        document.getElementById('modalConteudo').innerHTML = 'Erro na gravação. Verifique se todos os campos foram preenchidos corretamente.'
        document.getElementById('modalBotao').innerHTML = 'Voltar e corrigir'
        document.getElementById('modalBotao').className = 'btn btn-danger'

        $('#modalRegistrarDespesa').modal('show')
    }

}

