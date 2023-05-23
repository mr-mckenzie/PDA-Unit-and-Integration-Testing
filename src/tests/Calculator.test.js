import React from 'react';
import Calculator from '../containers/Calculator';
import {render, fireEvent} from '@testing-library/react';

describe('Calculator', () => {
  let container
  let button1
  let button2
  let button3
  let button4
  let button5
  let button7
  let addButton
  let subtractButton
  let multiplyButton
  let divideButton
  let equalsButton
  let runningTotal

  beforeEach(() => {
    container = render(<Calculator/>)
    button1 = container.getByTestId('number1')
    button2 = container.getByTestId('number2') 
    button3 = container.getByTestId('number3') 
    button4 = container.getByTestId('number4')
    button5 = container.getByTestId('number5')
    button7 = container.getByTestId('number7')
    addButton = container.getByTestId('operator-add')
    subtractButton = container.getByTestId('operator-subtract')
    multiplyButton = container.getByTestId('operator-multiply')
    divideButton = container.getByTestId('operator-divide')
    equalsButton = container.getByTestId('operator-equals')
    runningTotal = container.getByTestId('running-total')
  })

  it('should change running total on number enter', () => {
    fireEvent.click(button4);
    expect(runningTotal.textContent).toEqual('4');
  })

  it('should add 1 to 4 and get 5', () => {
    fireEvent.click(button1)
    fireEvent.click(addButton)
    fireEvent.click(button4)
    fireEvent.click(equalsButton)
    expect(runningTotal.textContent).toEqual('5')
  })

  it('should subtract 4 from 7 and get 3', () => {
    fireEvent.click(button7)
    fireEvent.click(subtractButton)
    fireEvent.click(button4)
    fireEvent.click(equalsButton)
    expect(runningTotal.textContent).toEqual('3')
  })

  it('should multiply 3 by 5 and get 15', () => {
    fireEvent.click(button3)
    fireEvent.click(multiplyButton)
    fireEvent.click(button5)
    fireEvent.click(equalsButton)
    expect(runningTotal.textContent).toEqual('15')
  })

  it('should divide 21 by 7 and get 3', () => {
    fireEvent.click(button2)
    fireEvent.click(button1)
    fireEvent.click(divideButton)
    fireEvent.click(button7)
    fireEvent.click(equalsButton)
    expect(runningTotal.textContent).toEqual('3')
  })

  it('should concatenate multiple number button clicks', () => {
    fireEvent.click(button1)
    fireEvent.click(button3)
    fireEvent.click(button4)
    fireEvent.click(button7)
    fireEvent.click(button1)
    expect(runningTotal.textContent).toEqual('13471')
  })

  it('should chain multiple operations together', () => {
    fireEvent.click(button2)
    fireEvent.click(addButton)
    fireEvent.click(button4)
    fireEvent.click(divideButton)
    fireEvent.click(button3)
    fireEvent.click(multiplyButton)
    fireEvent.click(button1)
    fireEvent.click(equalsButton)
    expect(runningTotal.textContent).toEqual('2')
  })

  it('should clear the running total without affecting the calculation', () => {
  const clearButton = container.getByTestId('clear')
  fireEvent.click(button5)
  fireEvent.click(multiplyButton)
  fireEvent.click(button5)
  fireEvent.click(equalsButton)
  fireEvent.click(addButton)
  fireEvent.click(button5)
  fireEvent.click(clearButton)
  fireEvent.click(button1)
  fireEvent.click(equalsButton)
  expect(runningTotal.textContent).toEqual('26')
  })


})

