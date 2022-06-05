import { useState, createContext, useEffect, useReducer } from 'react' ;
import CartItem from '../components/cart-item/cart-item';

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id;
    });
    // if found, increment quantity
    if(existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }
    // return new array with modified cartitems/ new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find item to remove
    const itemToRemove = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    // check if quantity is equal to 1, if YES remove item from cart
    if(itemToRemove.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    // return back cart items with matching cart item reduced quantity
    return cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

const CART_ACTION_ITEMS = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

//  Set Cart Initial State
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

// Define Cart Reducer
const cartReducer = (state, action) => {

    const { type, payload } = action;
    switch(type) {
        case CART_ACTION_ITEMS.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_ITEMS.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}


// Create Initial State
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemsFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

// Create Provider
export const CartProvider = ({children}) => {
    // Initialize Cart Provider
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    // setup reducer 
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const { cartItems, cartTotal, cartCount, isCartOpen } = state;

    const updateCartItemsReducer = (newCartItems) => {
        // Generate newCartCount
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        // Generate newCartTotal
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 
            0
        );

        dispatch({ 
            type: CART_ACTION_ITEMS.SET_CART_ITEMS,
            payload: { 
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            }
        });
        /*
            generate newCartTotal

            generate newCartCount

            dispatch new action with payload = {
                newCartItems,
                newCartTotal,
                newCartCount
            }

        */
    }

    const addItemToCart = (productToAdd) => {
        // setCartItems(addCartItem(cartItems, productToAdd));
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        // setCartItems(removeCartItem(cartItems, productToRemove));
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemsFromCart = (productToRemove) => {
        // setCartItems(clearCartItem(cartItems, productToRemove));
        const newCartItems = clearCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch({ type: CART_ACTION_ITEMS.SET_IS_CART_OPEN, payload: bool });
    }

    const value = {
        isCartOpen,
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemFromCart, 
        clearItemsFromCart, 
        cartTotal 
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 


/*

Product:
    {
        id,
        name,
        price,
        imageUrl
    }

Cart Item:
    {
        id,
        name,
        price,
        imageUrl,
        quantity
    }

*/