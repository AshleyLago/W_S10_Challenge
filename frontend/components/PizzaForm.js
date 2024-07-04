import React, { useReducer } from 'react'

import { useCreateOrderMutation } from '../state/ordersApi'
import { initialState } from '../state/ordersSlice'

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'
const TOGGLE_TOPPING = 'TOGGLE_TOPPING'

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case TOGGLE_TOPPING: {
      const { name } = action.payload;
      const toppings = state.toppings.includes(name)
        ? state.toppings.filter(topping => topping !== name)
        : [...state.toppings, name];
      return { ...state, toppings };
    }
    case RESET_FORM: {
      return initialState
    }
    default: return state
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [createOrder, {error: creationError, isLoading: creatingOrder}] = useCreateOrderMutation()

  const onChange = ({ target: { name, type, value } }) => {
    if (type === 'checkbox') {
      dispatch({ type: TOGGLE_TOPPING, payload: { name } });
    } else {
      dispatch({ type: CHANGE_INPUT, payload: { name, value } })
    }
  }
  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }
  const onNewOrder = evt => {
    evt.preventDefault()
    const { fullName, size, toppings } = state
    createOrder({ fullName, size, toppings })
    .unwrap()
    .then(res => {
      console.log(res)
      resetForm()
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>{"Order in progress..."}</div>}
      {creationError && <div className='failure'>{"Order failed: "+creationError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onChange}
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onChange} value={state.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={onChange} checked={state.toppings.includes('1')}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onChange} checked={state.toppings.includes('2')}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onChange} checked={state.toppings.includes('3')}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onChange} checked={state.toppings.includes('4')}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onChange} checked={state.toppings.includes('5')}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
