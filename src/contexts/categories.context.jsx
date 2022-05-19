import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.js";

import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    // Load SHOP_DATA as BATCH of DATA (to FireStore)
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []); 

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, []);
    
    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}

