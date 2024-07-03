
export interface Products {
    id: string,
    code: string,
    name: string,
    description: string,
    image: string,
    price: number,
    category: string,
    quantity: number,
    inventoryStatus: string,
    rating: number,
    isAddedToCart?: boolean,
    itemQuantity: number;
    isFavorite?: boolean;
    categoryAr?: ''

}

// export interface FavProducts extends Products {
//     isFavorite?: boolean;
// }

export interface CartProducts {
    product: Products;

    itemQuantity: number;
}
