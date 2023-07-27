var formulario = document.querySelector("#Salario")
var salarioBruto = document.querySelector("#salario-bruto")
var dependentes = document.querySelector("#dependentes")
var resultado = document.querySelector(".resultado")
var tabelaSalarioBruto = document.querySelector(".valor-salario-bruto")
var tabelaINSS = document.querySelector(".valor-inss")
var tabelaIRRF = document.querySelector(".valor-irrf")
var tabelaValeTransporte = document.querySelector(".valor-transporte")
var tabelaSalarioLiquido = document.querySelector(".valor-salario-liquido")
var Enviar = document.querySelector(".botao")
var Vale = document.querySelector("#checkbox")
var input = document.querySelectorAll(".input-dado")
// var label = document.querySelector(".labelf")
// onBlur é quando clica fora do elemento focado

function campo(n) {
    var area = input[n]
    var label = area.parentElement.lastElementChild
    if (area.value != "") {
        label.style.color = "#47a447"
        label.style.fontSize = "0.95em"
        label.style.top = "-20px"
    } else {
        label.style.color = "#ffffff"
        label.style.fontSize = "20px" 
        label.style.top = "-5px"
    }                                       
}

formulario.addEventListener("submit", (e)=> {
    e.preventDefault()
    // adicionar condicoes de preenchimento dos campos
    if (salarioBruto.value == "" || dependentes.value == "") {
        window.alert("Existem campos vazios, por favor, preencha corretamente!")
    } else if (!dependentes.value.match(/^\s*[0-9]{1,2}\s*$/) || !salarioBruto.value.match(/^\s*[0-9]{3,10}(,|.)[0-9]{0,2}\s*$/)){
        window.alert("Exitem campos que não foram preenchidos corretamente")
    } else {
        calcular()
    }
})

function calcular() {
    var salarioBrutoValue = String(salarioBruto.value)
    salarioBrutoValue = salarioBrutoValue.replace(",",".")
    salarioBrutoValue = Number(salarioBrutoValue)
    var dependentesValue = Number(dependentes.value)

    switch (true) {
        case salarioBrutoValue <= 1302.00:
            var INSS = salarioBrutoValue*0.075
            break
        case salarioBrutoValue >= 1302.01 && salarioBrutoValue <= 2571.29:
            var INSS = salarioBrutoValue*0.09
            break
        case salarioBrutoValue >= 2571.30 && salarioBrutoValue <= 3856.94:
            var INSS = salarioBrutoValue*0.12
            break
        case salarioBrutoValue >= 3856.95 && salarioBrutoValue <= 7507.49:
            var INSS = salarioBrutoValue*0.14
            break
        case salarioBrutoValue >= 7507.50:
            var INSS = 7507.50*0.14
            break
        default:
            window.alert("error")
    }

    switch (true) {
        case salarioBrutoValue <= 1903.98:
            var IRRF = 0
            break
        case salarioBrutoValue >= 1903.99 && salarioBrutoValue <= 2826.65:
            var IRRF = (salarioBrutoValue*0.075)-(dependentesValue * 189.59)
            break
        case salarioBrutoValue >= 2826.66 && salarioBrutoValue <= 3751.04:
            var IRRF = (salarioBrutoValue*0.15)-(dependentesValue * 189.59)
            break
        case salarioBrutoValue >= 3751.06 && salarioBrutoValue <= 4664.68:
            var IRRF = (salarioBrutoValue*0.225)-(dependentesValue * 189.59)
            break
        case salarioBrutoValue > 4664.68:
            var IRRF = (salarioBrutoValue*0.275)-(dependentesValue * 189.59)
            break
        default:
            window.alert("error")
    }

    INSS = Number(INSS).toFixed(2)
    
    if (IRRF<=0){ 
        IRRF = 0.00
    } else {
        IRRF = Number(IRRF).toFixed(2)
    }


    if (Vale.checked){
        var valeTransporte = Number(salarioBrutoValue*0.06).toFixed(2)
        tabelaValeTransporte.textContent = `R$ ${valeTransporte}`
    }
    else {
        var valeTransporte = 0
        tabelaValeTransporte.textContent = `R$ 0,00`
    }

    
    salarioLiquido = (salarioBrutoValue - valeTransporte - INSS - IRRF).toFixed(2)

    tabelaSalarioBruto.textContent = `R$ ${salarioBrutoValue}`
    tabelaINSS.textContent = `R$ ${INSS}`
    tabelaIRRF.textContent = `R$ ${IRRF}`
    tabelaSalarioLiquido.textContent = `R$ ${salarioLiquido}`
    resultado.classList.add("activate")
}