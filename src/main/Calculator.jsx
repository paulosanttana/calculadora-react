import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'


// Estado inicial da calculadora. Função clearMemory() será chamada para zerar as configurações.
const initialState = {
    displayValue: '0',  // valor exibido no display
    clearDisplay: false,    // limpa o display
    operation: null,    //Variavel que armazena operação '+, -, *, /'
    values: [0, 0], // array com valor 1, e valor 2 para armazenar os números digitados.
    current: 0  //identifica qual posição do array está sendo usado.
}

class Calculator extends Component {

    state = {...initialState} //Cria um clone do objeto 'initialState' e atribui a variavel 'state'

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({...initialState}) // Zera as configurações chamando 'initialState'.
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) //faz o calculo
            } catch(e) {
                values[0] = this.state.values[0] 
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        // validação: Se usuário digitou ponto '.' não deixa adicionar outro ponto.
        if (n === '.' && this.state.displayValue.includes('.')) {
            return 
        }

        // validação: Quando o display for zero '0'
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        // Se for diferente de número 'n' e ponto '.'
        if (n !=='.') {
            const i = this.state.current //armazena o indice em 'i'
            const newValue = parseFloat(displayValue) // converte o valor em float
            const values = [...this.state.values] //clona o array e passa para 'values'
            values[i] = newValue // adicionar valor no indice que estiver mexendo.
            this.setState({ values }) // adicionar array no estado do objeto.
            console.log(values)
        }
    }


    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}

export default Calculator;
