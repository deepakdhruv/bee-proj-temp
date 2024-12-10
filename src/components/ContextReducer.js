import React, { useReducer, createContext, useContext } from 'react';


const CartStateContext = createContext();
const CartDispatchContext = createContext();


const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
           
            const existingItem = state.find(item => item.id === action.id);
            if (existingItem) {
              
                return state.map(item =>
                    item.id === action.id
                        ? { ...item, qty: item.qty + action.qty }
                        : item
                );
            } else {
               
                return [
                    ...state,
                    {
                        id: action.id,
                        name: action.name,
                        price: action.price,
                        qty: action.qty,
                        size: action.size,
                    }
                ];
            }
            case "DROP":
                let emparr=[]
                return emparr;
        case "REMOVE":
           
            return state.filter(item => item.id !== action.id);

        case "DECREASE_QTY":
            
            return state.map(item =>
                item.id === action.id
                    ? { ...item, qty: item.qty - 1 }
                    : item
            ).filter(item => item.qty > 0); 

        case "CLEAR":
            
            return [];

        default:
            console.error("Unknown action type in reducer:", action.type);
            return state;
    }
};


// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};


export const UseCart = () => useContext(CartStateContext); 
export const UseDispatchCart = () => useContext(CartDispatchContext);