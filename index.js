// index.js
const btonComenzar = document.getElementById("btonComenzar");
const btonObtener = document.getElementById("btonObtener");
const MATRIZ = document.getElementById('matriz');
const aleatoria = document.getElementById("matrizAleatoria");
const GRAFO=document.getElementById('grafo')
const grafito=document.getElementById('grafito')

let raiz;
let nodosEncontrados;
let matriz1;

class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.hijos = [];
    }

    agregarHijo(valor) {
        const nuevoNodo = new Nodo(valor);
        this.hijos.push(nuevoNodo);
        return nuevoNodo;
    }
}

function pedirValorBooleano(fila, columna) {
    let valor;
    do {
        //Aqui  cambiamos
        valor = prompt(`Ingrese 0 o 1 en la posición Fila: ${fila} Columna: ${columna}`);
        if (valor === null) {
            return null;
        }
        if (isNaN(valor)) {
            alert("Entrada no válida. Por favor, ingrese un número (0 o 1).");
        } else if (valor !== "0" && valor !== "1") {
            alert("Valor inválido. Por favor, ingrese 0 o 1.");
        }

    } while (isNaN(valor) || (valor !== "0" && valor !== "1"));

    // Convertir el valor ingresado a número y devolverlo
    return Number(valor);
}

function crearMatriz(n, esAleatoria = false) {
    grafito.innerHTML = '';
    GRAFO.innerHTML = ''; 
    MATRIZ.innerHTML = '';
    let matriz = [];

    for (let i = 0; i < n; i++) {
        if (!esAleatoria) {
            alert(`Creando la matriz en la fila ${i}`);
        }
        
        matriz[i] = [];
        for (let j = 0; j < n; j++) {
            if (esAleatoria) {
                matriz[i][j] = Math.round(Math.random());
            } else {
                let valor = pedirValorBooleano(i, j);
                
                // Verificar si se ha cancelado la entrada
                if (valor === null) {
                    // Cancelar la creación de la matriz
                    alert("La creación de la matriz ha sido cancelada.");
                    return null;
                }

                matriz[i][j] = valor;
            }
        }
    }
    matriz1 = matriz;
    return matriz;
}
function procesarMatriz(n, esAleatoria) {
    const matriz = crearMatriz(n, esAleatoria);
    raiz = new Nodo('raiz');
    matriz.forEach(fila => raiz.agregarHijo(fila));
}

aleatoria.addEventListener("click", () => {
    const n = prompt("Ingresa el número de filas y columnas de la matriz");
    if (n) {
        procesarMatriz(n, true);
    }
});

btonComenzar.addEventListener("click", () => {
    alert("Ten en cuenta que las filas de una matriz van horizontalmente")
    const n = Number(prompt("Ingresa el tamano de la matriz"))
    alert(`Tu matriz será de ${n} filas y ${n} columnas:${n}x${n}`)
    if (n) {
        procesarMatriz(n, false);
    }
});

btonObtener.addEventListener("click", () => {
    if (!raiz) {
        alert('No se ha creado la matriz');
    } else {
        MATRIZ.innerHTML = ''; // Limpiar la matriz anterior

        raiz.hijos.forEach(fila => {
            let filaElemento = document.createElement('div');
            filaElemento.className = 'fila';
            MATRIZ.appendChild(filaElemento);

            fila.valor.forEach(numero => {
                let numeroElemento = document.createElement('div');
                numeroElemento.className = 'numero';
                numeroElemento.textContent = numero;
                filaElemento.appendChild(numeroElemento);
            });
        });


        let esReflexiva = reflexividad(raiz)
        let esIrreflexiva = irreflexividad(raiz)
        let esSimetrica = simetrica(raiz)
        let esAsimetrica = asimetrica(raiz)
        let esAntisimetrica = antisimetrica(raiz)
        let esTransitiva = transitiva(raiz)
        let esOrdenTotal=totalidad(raiz)


        if(esReflexiva && esAntisimetrica && esTransitiva && esOrdenTotal){
            let ordenTotal = document.createElement('div');
                ordenTotal.style.marginTop='10px '
                ordenTotal.style.marginBottom=' 10px'
                ordenTotal.innerText = 'MATRIZ ORDEN TOTAL';
                ordenTotal.id = 'mensaje';
                ordenTotal.style.backgroundColor = 'palevioletred';
                ordenTotal.style.color = 'white';
                ordenTotal.style.padding = '3%';
                ordenTotal.className='ordenTotal'
                alert('Wow,es una matriz de Orden Total')
    
                if (MATRIZ.firstChild) {
                    MATRIZ.insertBefore(ordenTotal, MATRIZ.firstChild);
                } else {
                    MATRIZ.appendChild(ordenTotal);
                }
        }
    
        if (esReflexiva && esSimetrica && esTransitiva) {
            let equivalencia = document.createElement('div');
            equivalencia.style.marginTop='10px '
            equivalencia.style.marginBottom=' 10px'
            equivalencia.innerText = 'MATRIZ EQUIVALENTE';
            equivalencia.id = 'mensaje';
            equivalencia.style.backgroundColor = 'darkmagenta';
            equivalencia.style.color = 'white';
            equivalencia.style.padding = '3%';

            if (MATRIZ.firstChild) {
                MATRIZ.insertBefore(equivalencia, MATRIZ.firstChild);
            } else {
                MATRIZ.appendChild(equivalencia);
            }
        }

        if (esAntisimetrica && esIrreflexiva && esTransitiva) {
            let ordenEsticto = document.createElement('div');
            ordenEsticto.style.marginTop='10px '
            ordenEsticto.style.marginBottom=' 10px'
            ordenEsticto.innerText = 'MATRIZ ORDEN ESTRICTO';
            ordenEsticto.id = 'mensaje';
            ordenEsticto.style.backgroundColor = 'goldenrod';
            ordenEsticto.style.color = 'white';
            ordenEsticto.style.padding = '3%';

            if (MATRIZ.firstChild) {
                MATRIZ.insertBefore(ordenEsticto, MATRIZ.firstChild);
            } else {
                MATRIZ.appendChild(ordenEsticto);
            }
        
    }
    if(esReflexiva && esAntisimetrica && esTransitiva){
        let ordenParcial = document.createElement('div');
            ordenParcial.style.marginTop='10px '
            ordenParcial.style.marginBottom=' 10px'
            ordenParcial.innerText = 'MATRIZ ORDEN PARCIAL';
            ordenParcial.id = 'mensaje';
            ordenParcial.style.backgroundColor = 'palevioletred';
            ordenParcial.style.color = 'white';
            ordenParcial.style.padding = '3%';

            if (MATRIZ.firstChild) {
                MATRIZ.insertBefore(ordenParcial, MATRIZ.firstChild);
            } else {
                MATRIZ.appendChild(ordenParcial);
            }

        }
    }

    GRAFO.innerHTML = ''; // Limpiar la matriz anterior
    grafito.innerHTML='';
    nodosEncontrados = encontrarNodos(raiz.hijos.map(fila => fila.valor));
    for(el of nodosEncontrados){
        let relacion=document.createElement('div')
        relacion.innerText=el
        relacion.className='relacion'
        setTimeout(function () {
            grafito.appendChild(relacion);
        }, 3000); // 2000 milisegundos equivalen a 2 segundos
    
        }

        crearGrafoDesdeMatriz(matriz1);
        
});

function reflexividad(x) {
    let esReflexiva = true;
    for (let i = 0; i < x.hijos.length; i++) {
        if (x.hijos[i].valor[i] !== 1) {
            esReflexiva = false;
            break;
        }
    }

    let mensaje = document.createElement('div');
    mensaje.id = 'mensaje';

    if (esReflexiva) {
        mensaje.innerText = 'LA MATRIZ ES REFLEXIVA';
        mensaje.style.padding = '3%';
        mensaje.style.backgroundColor = 'lightblue';
    }
    setTimeout(function () {
        MATRIZ.appendChild(mensaje);
    }, 2000); // 2000 milisegundos equivalen a 2 segundos

    return (esReflexiva) ? true : false

}

function irreflexividad(x) {
    let esIrreflexiva = true;
    for (let i = 0; i < x.hijos.length; i++) {
        if (x.hijos[i].valor[i] !== 0) {
            esIrreflexiva = false;
            break;
        }
    }

    let mensaje = document.createElement('div');
    mensaje.id = 'mensaje';

    if (esIrreflexiva) {
        mensaje.innerText = 'LA MATRIZ ES IRREFLEXIVA';
        mensaje.style.padding = '3%';
        mensaje.style.backgroundColor = 'lightcoral';

    }
    setTimeout(function () {
        MATRIZ.appendChild(mensaje);
    }, 2000); // 2000 milisegundos equivalen a 2 segundos

    return (esIrreflexiva) ? true : false
}

function simetrica(x) {
    let mensaje = document.createElement('div');
    let esSimetrica = true;

    // Crear la matriz transpuesta
    let transpuesta = [];
    for (let i = 0; i < x.hijos.length; i++) {
        transpuesta[i] = [];
        for (let j = 0; j < x.hijos[i].valor.length; j++) {
            transpuesta[i][j] = x.hijos[j].valor[i];
        }
    }
    for (let i = 0; i < x.hijos.length; i++) {
        for (let j = 0; j < x.hijos[i].valor.length; j++) {
            if (x.hijos[i].valor[j] !== transpuesta[i][j]) {
                esSimetrica = false;
                break;
            }
        }
        if (!esSimetrica) {
            break;
        }

    }

    if (esSimetrica) {
        mensaje.innerText = 'LA MATRIZ ES SIMETRICA';
        mensaje.style.backgroundColor = 'green';
        mensaje.style.padding = '3%'
    }

    mensaje.id = 'mensaje';

    setTimeout(function () {
        MATRIZ.appendChild(mensaje);
    }, 2000);

    return (esSimetrica) ? true : false
}

function asimetrica(x) {
    let mensaje = document.createElement('div');
    let esAsimetrica = true;
    let diagonalEsCero = true;
    let n = x.hijos.length;

    // Verificar que la diagonal principal es cero
    for (let i = 0; i < n; i++) {
        if (x.hijos[i].valor[i] !== 0) {
            diagonalEsCero = false;
            break;
        }
    }

    // Verificar que la matriz no es simétrica
    if (diagonalEsCero) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j && x.hijos[i].valor[j] !== x.hijos[j].valor[i]) {
                    esAsimetrica = true;
                    break;
                } else if (i !== j && x.hijos[i].valor[j] === x.hijos[j].valor[i]) {
                    esAsimetrica = false;
                }
            }
            if (!esAsimetrica) break;
        }
    } else {
        esAsimetrica = false;
    }

    if (diagonalEsCero && esAsimetrica) {
        mensaje.innerText = 'LA MATRIZ ES ASIMÉTRICA';
        mensaje.style.backgroundColor = 'blue';
        mensaje.style.padding = '3%'
    }
    mensaje.id = 'mensaje';
    setTimeout(function () {
        MATRIZ.appendChild(mensaje);
    }, 2000);
    return (esAsimetrica) ? true : false
}

function antisimetrica(x) {
    let mensaje = document.createElement('div');
    let esAntisimetrica = true;
    let n = x.hijos.length;

    // Verificar si A_{ij} = 1 implica que A_{ji} = 0 para i != j
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (x.hijos[i].valor[j] === 1 && x.hijos[j].valor[i] === 1) {
                esAntisimetrica = false;
                break;
            }
        }
        if (!esAntisimetrica) {
            break;
        }
    }

    if (esAntisimetrica) {
        mensaje.innerText = 'LA MATRIZ ES ANTISIMÉTRICA';
        mensaje.style.backgroundColor = 'purple';
        mensaje.style.padding = '3%'
    }
    mensaje.id = 'mensaje';

    setTimeout(function () {
        MATRIZ.appendChild(mensaje);
    }, 2000);

    return (esAntisimetrica) ? true : false
}


function transitiva(x) {
    let mensaje = document.createElement('div');
    let esTransitiva = true;
    let n = x.hijos.length;

    // Crear un contenedor para todas las evaluaciones
    let evaluaciones = document.createElement('div');
    evaluaciones.className='evaluaciones'
    evaluaciones.innerHTML = '<h3>Evaluaciones de Transitividad</h3>';

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (x.hijos[i].valor[j] === 1) {
                for (let k = 0; k < n; k++) {
                    if (x.hijos[j].valor[k] === 1) {
                        let evaluacion = document.createElement('div');
                        evaluacion.className = 'evaluacion';
                        evaluacion.textContent = `Evaluando: (${i}, ${j}), (${j}, ${k}) -> (${i}, ${k})`;

                        if (x.hijos[i].valor[k] !== 1) {
                            esTransitiva = false;
                            evaluacion.textContent += ` - Falla: (${i}, ${k}) no es 1`;
                            evaluacion.style.backgroundColor = 'lightcoral';
                        } else {
                            evaluacion.textContent += ` - Cumple`;

                        }

                        evaluaciones.appendChild(evaluacion);
                    }
                }
            }
            if (!esTransitiva) break;
        }
        if (!esTransitiva) break;
    }

    if (esTransitiva) {
        mensaje.innerText = 'LA MATRIZ ES TRANSITIVA';
        mensaje.style.backgroundColor = 'orange';
        mensaje.style.padding = '3%'
    }
    mensaje.id = 'mensaje';

    setTimeout(function () {
        MATRIZ.appendChild(mensaje);
        MATRIZ.appendChild(evaluaciones);
    }, 2000);

    return (esTransitiva) ? true : false
}

function totalidad(x) {
    let esOrdenTotal = true;
    const n = x.hijos.length;

    // Verificar si cada elemento es comparable con todos los demás elementos
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Si el elemento i es igual al elemento j, no es comparable consigo mismo
            if (i !== j) {
                // Verificar si el elemento i es menor o mayor que el elemento j
                if (x.hijos[i].valor[j] !== 0 && x.hijos[i].valor[j] !== 1) {
                    esOrdenTotal = false;
                    break;
                }
            }
        }
        if (!esOrdenTotal) break;
    }

    return esOrdenTotal;
}

function encontrarNodos(matriz) {
    const nodos = [];
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] === 1) {
                nodos.push([i,j])
            }
        }
    }
    return nodos
    
}

function crearGrafoDesdeMatriz(matriz) {
    const svg = d3.select("#grafo");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const numVertices = matriz.length;

    const nodos = d3.range(numVertices).map(i => ({ id: i }));

    const aristas = [];
    for (let i = 0; i < numVertices; i++) {
        for (let j = 0; j < numVertices; j++) {
            if (matriz[i][j] === 1) {
                aristas.push({ source: i, target: j });
            }
        }
    }

    const simulacion = d3.forceSimulation(nodos)
        .force("link", d3.forceLink(aristas).distance(150)) // Aumentamos la distancia de los enlaces
        .force("charge", d3.forceManyBody().strength(-300)) // Ajustamos la fuerza de repulsión
        .force("center", d3.forceCenter(width / 2, height / 2));

    const lineas = svg.selectAll("line")
        .data(aristas.filter(d => d.source !== d.target))
        .enter().append("line")
        .attr("stroke", "black");

    const loops = svg.selectAll("path")
        .data(aristas.filter(d => d.source === d.target))
        .enter().append("path")
        .attr("d", d => {
            const x = d.source.x;
            const y = d.source.y;
            return `M${x},${y} C${x + 30},${y - 30} ${x + 60},${y + 30} ${x},${y}`;
        })
        .attr("stroke", "black");

    const circulos = svg.selectAll("circle")
        .data(nodos)
        .enter().append("circle")
        .attr("r", 30) // Aumentamos el radio de los círculos
        .attr("fill", "#ccc")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5);

    const textos = svg.selectAll("text")
        .data(nodos)
        .enter().append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .text(d => d.id);

    simulacion.on("tick", () => {
        lineas
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        loops
            .attr("d", d => {
                const x = d.source.x;
                const y = d.source.y;
                return `M${x},${y} C${x + 30},${y - 120} ${x + 90},${y + 60} ${x},${y}`;
            });

        circulos
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        textos
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
}
document.querySelector('.loader').style.display = 'block';

// Función para ocultar el loader cuando se realiza alguna acción en la página
function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}

// Ejemplo: Ocultar el loader cuando se hace clic en algún lugar de la página
document.addEventListener('click', function() {
  hideLoader();
});





















