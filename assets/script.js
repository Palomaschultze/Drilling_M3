//ID gen
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

//Variable
let presupuesto;
let arrayObjetos = []; //Guarda los objetos(gastos)

//Botón ingresar presupuesto
$('#botonCalcular').click(function (event) {
    event.preventDefault()
    presupuesto = capturar()
})

//Botón añadir gastos
$('#añadirGasto').click(function (event) {
    event.preventDefault()
    let conjuntoCapturarGastos = capturarGasto()//guarda lo que retorn capturarGasto (guarda el arreglo)
    insertarDatos(conjuntoCapturarGastos)
    sumarGastos(presupuesto)
})

//Botón eliminar
$('#tbody').on("click", "#basurero", function () {
    $(this).parent().remove();
    eliminar($(this).prev().text());
})

//Función constructora de objeto

class Gastos {
    constructor(nombre, monto, id) {
        this.nombre = nombre
        this.monto = monto
        this.id = id
    }
}

//Funcion capturar presupuesto 
const capturar = () => {
    let presupuesto = parseFloat($("#ingresaPresupuesto").val());
    $('#presupuesto').text(presupuesto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }));
    $('#saldo').text(presupuesto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }));
    return presupuesto;
}

//Función capturar gasto y valor
const capturarGasto = () => {
    let ids = uuidv4().slice(0, 6);
    let nombreGasto = $('#nombreGasto').val();
    let cantidadGasto = $('#cantidadGasto').val();
    let objeto = new Gastos(nombreGasto, cantidadGasto, ids);
    arrayObjetos.push(objeto);
    return (objeto)
}

//Función insertar en la tabla
const insertarDatos = (gasto) => {
    $('#tbody').append(
        `<tr>
            <td>${gasto.nombre}</td>
            <td>${parseInt(gasto.monto).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
            <td class="d-none">${gasto.id}</td>
            <td id="basurero"><img src="./assets/img/Basurero.png" width="15px"></td>
        </tr>`
    )
}

//funcion sumar gastos
const sumarGastos = (presupuesto) => { //la declaramos en btn añadir gastos
    let totalGastos = [];
    let total;
    arrayObjetos.forEach(item => {
        totalGastos.push(item.monto)
        total = totalGastos.reduce((a, b) => {
            return parseInt(a) + parseInt(b);
        })
    })
    $("#gastos").text(total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }));
    if (total <= parseInt(presupuesto)) {
        $("#saldo").text((presupuesto - total).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }));
    } else {
        alert("El total de gastos no puede ser mayor al presupuesto");
    }
}

//Función borrar elemento
const eliminar = (producto) => {
    arrayObjetos = arrayObjetos.filter(item => {
        if (item.id != producto) {
            return item
        }
    })

    let total;
    let totalGastos = [];

    arrayObjetos.forEach(item => {
        totalGastos.push(item.monto)
        total = totalGastos.reduce((a, b) => {
            return parseInt(a) + parseInt(b);
        })
    })
    $('#gastos').text((parseInt(total)).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }))
    if (total >= 0) {
        $('#saldo').text((parseInt(presupuesto) - total).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }))
    } else {
        $("#gastos").text(0)
        $("#saldo").text($("#presupuesto").text())
    }
}