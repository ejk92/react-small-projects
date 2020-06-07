import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";


export const fetchProducts = () => {
    return async dispatch => {
        const response = await fetch(
            "https://rn-guide-complete.firebaseio.com/products.json"
        );

        if (!response.ok) {
            throw new Error("Something is wrong");
        }

        const resData = await response.json();
        const loadedProducts = [];
        for (const key in resData) {
            loadedProducts.push(
                new Product(
                    key, 
                    'u1',
                    resData[key].name,
                    resData[key].imageUrl, 
                    resData[key].description, 
                    resData[key].price
                )
            )
        }
        dispatch({type: SET_PRODUCTS, products: loadedProducts});
    }
}

export const deleteProduct = productId => {
    return async dispatch => {
        await fetch(`https://rn-guide-complete.firebaseio.com/${productId}/products.json`, 
        {
            method: "DELETE"
        });
        dispatch({type: DELETE_PRODUCT, productId: productId});
    }
};

export const createProduct = (name, description, imageUrl, price) => {
    return async dispatch => {
        const response = await fetch("https://rn-guide-complete.firebaseio.com/products.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, description, imageUrl, price
            })
        });

        const responseData = await response.json();
        return dispatch({ 
            type: CREATE_PRODUCT, 
            productData: {
                name,
                description,
                imageUrl,
                price
            }
        });
    }
};

export const updateProduct = (id, name, description, imageUrl) => {
    return async dispatch => {
        const response = await fetch(`https://rn-guide-complete.firebaseio.com/${id}/products.json`, 
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description,
                imageUrl
            })
        });

        return { 
            type: UPDATE_PRODUCT, 
            productId: id,
            productData: {
                name,
                description,
                imageUrl
            }
        };
    }
};
