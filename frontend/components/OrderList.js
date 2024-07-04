import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleSizeFilter } from '../state/ordersSlice'
import { useGetOrdersQuery } from '../state/ordersApi'

export default function OrderList() {
  const dispatch = useDispatch()
  const { data: orders = [] } = useGetOrdersQuery()

  const size = useSelector(st => st.ordersState.size)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map((od) => {
            {if (od.size === size || size === 'All') {
              return (
                <li key={od.id}>
                  <div>
                  {`${od.customer} ordered a size ${od.size} with ${od.toppings && od.toppings.length > 0 ? od.toppings.length : "no"} toppings`}
                  </div>
                </li>
              )
            }}
            
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(sz => {
            const className = `button-filter${sz === size ? ' active' : ''}`
            return <button
              onClick={() => dispatch(toggleSizeFilter(sz))}
              data-testid={`filterBtn${sz}`}
              className={className}
              key={sz}> {sz} </button>
          })
        }
      </div>
    </div>
  )
}