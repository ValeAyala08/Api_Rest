import React, {Component} from 'react';

class MiComponente extends Component{

render(){
    //para definir variables 'let'
    let receta = {
        nombre: 'Empanada',
        ingredientes: ['Harina, carne, guiso']
     };
    return(
        //para poder poner dos etiquetas de html
        <React.Fragment>
        <h1>HOLA</h1>
        <h2>Soy Valentina</h2>

        <h3>{'receta: ' + receta.nombre}</h3>
        </React.Fragment>
        
    );
}

}
 
export default MiComponente;