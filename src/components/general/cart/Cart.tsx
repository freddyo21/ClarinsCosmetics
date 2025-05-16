import { useEffect, useState } from "react";
import "./Cart.css";
import { Button, Card, FormControl, Modal, OverlayTrigger, Spinner } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { ICart, ICartItem } from "../../../data/Cart";
import { getProductById } from "../../../services/products/product.service";
import { TooltipBtn } from "../../../utils/JSXElements";
import { toastrSuccess } from "../../../utils/toastr";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [showModal, setShowModal] = useState(false);
    const [cartShowingItems, setCartShowingItems] = useState<ICartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);
    const handleShow = async () => {
        setIsLoading(true);
        try {
            const cart = getCartItems();
            if (cart) {
                const cartItems = await setCartItems(cart);
                setCartShowingItems(cartItems);
            }
        } catch (error) {
            console.error("Error loading cart:", error);
        } finally {
            setIsLoading(false);
            setShowModal(true);
        }
    }

    const getCartItems = () => {
        const token = new Cookies().get("user-token");
        if (token) {
            // const decodedToken = jwtDecode(token);
            // const userId = decodedToken.sub;

            // // Fetch cart items from the server using userId
            // fetch(`http://localhost:8000/api/cart/${userId}`)
            //     .then(response => response.json())
            //     .then(data => setCartItems(data))
            //     .catch(error => console.error("Error fetching cart items:", error));

            return null; // Placeholder for server-side cart fetching
        }

        // If no token, fetch cart items from local storage
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) as ICart[] : null;
    }

    const setCartItems = async (cart: ICart[]) => {
        const promises = cart.map(async (item: ICart) => { // Fetch product details for each item
            try {
                // Fetch product details using the product_id
                const response = await getProductById(item.product_id);

                return {
                    product_id: item.product_id,
                    name: response.data.name,
                    quantity: item.quantity,
                    price: response.data.price.toFixed(2),
                    image_url: response.data.image_url
                } as ICartItem;
            } catch (error) {
                console.error("Error fetching product:", item.product_id, error);
                return null;
            }
        });

        // Wait for all promises to resolve
        const items = await Promise.all(promises);

        // Filter out any null values (in case of errors)
        return items.filter(item => item !== null) as ICartItem[];
    }

    const removeFromCart = (itemId: number) => {
        const cart = getCartItems();
        if (!cart) return;

        const updatedCart = cart.filter((item: ICart) => item.product_id !== itemId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        setCartShowingItems(prevItems =>
            prevItems.filter(item => item.product_id !== itemId)
        );

        // Optionally, you can also show a message or update the UI
        toastrSuccess("Success", "Item removed from cart successfully");
    }

    const updateCartItemQuantity = (itemId: number, newQuantity: number) => {
        const cart = getCartItems();
        if (!cart) return;

        const updatedCart = cart.map((item: ICart) =>
            item.product_id === itemId ? { ...item, quantity: newQuantity } : item
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        setCartShowingItems(prevItems =>
            prevItems.map(item =>
                item.product_id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    }

    const checkout = () => {
        handleClose();
        navigate("/checkout");
    }

    useEffect(() => {
        const loadCart = async () => {
            const cart = getCartItems();
            if (cart) {
                const cartItems = await setCartItems(cart);
                setCartShowingItems(cartItems);
            }
        };
        loadCart();
    }, []);

    return (
        <>
            <i className="fas fa-shopping-cart" onClick={handleShow}></i>

            <Modal size="lg" show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="cart">
                        {isLoading ? (
                            <div className="text-center p-5">
                                <Spinner animation="border" />
                                <p>Loading cart items...</p>
                            </div>
                        ) : (<>
                            {
                                cartShowingItems.length > 0 ? (
                                    cartShowingItems.map((item, index) => (
                                        <Card key={index}>
                                            <div className="cart-item__container">
                                                <img className="cart-item__image" src={JSON.parse(item.image_url)[0]} alt={item.name} width={125} />
                                                <Card.Body className="cart-item">
                                                    <div className="cart-item__details">
                                                        <h5>{item.name}</h5>
                                                        <span>Price: ${item.price}</span>
                                                        <p>Total: ${(Number(item.price) * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                    <div className="cart-item__quantity">
                                                        Quantity:
                                                        <FormControl type="number" min="1" value={item.quantity}
                                                            onChange={(e) => updateCartItemQuantity(item.product_id, Number(e.target.value))} />
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center text-xl">
                                                        <OverlayTrigger placement="top" overlay={TooltipBtn({}, "Remove from cart")}>
                                                            <i className="fas fa-trash" onClick={() => removeFromCart(item.product_id)}></i>
                                                        </OverlayTrigger>
                                                    </div>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <p>Your cart is empty.</p>
                                )
                            }
                        </>)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={checkout} disabled={cartShowingItems.length === 0}>
                        <i className="fas fa-credit-card"></i>&nbsp;
                        Checkout
                    </Button>
                    <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}