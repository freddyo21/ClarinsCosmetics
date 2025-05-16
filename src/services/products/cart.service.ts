import { Cookies } from "react-cookie";
import { IProduct } from "../../data/Product";
import { jwtDecode } from "jwt-decode";
import { ICart } from "../../data/Cart";


export function addToCart(item: IProduct, items?: ICart[]) {
    const token = new Cookies().get("user-token");

    if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;



        // Add userId to each item in the cart

    } else {
        // If no token, add the item to local storage
        const cart = localStorage.getItem("cart");

        let offlineCart: ICart[] = [];

        if (cart) {
            offlineCart = JSON.parse(cart);
        }

        const existingItem = offlineCart.find((i: ICart) => i.product_id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            offlineCart.push({
                id: item.id,
                user_id: 0, // Set to 0 or any default value
                product_id: item.id,
                quantity: 1,
                added_at: new Date().toISOString(),
            });
        }

        localStorage.setItem("cart", JSON.stringify(offlineCart));
    }

    return;
}