import { Button, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Modal, OverlayTrigger } from "react-bootstrap"
import { TooltipBtn } from "../../../utils/JSXElements"
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { toastrError, toastrInfo, toastrSuccess } from "../../../utils/toastr"
import { IProduct, IProductModify } from "../../../data/Product"
import { createProduct, updateProduct } from "../../../services/products/product.service"
import { ICategory } from "../../../data/Category"
import { IBrand } from "../../../data/Brand"
import { getAllCategories } from "../../../services/products/category.service"
import { getAllBrands } from "../../../services/products/brand.service"


export default function ModifyProductModal({ currentProduct, setCurrentProduct, showModal, setShowModal, handleShowModal, getAll }: {
    currentProduct: IProduct | null,
    setCurrentProduct: Dispatch<SetStateAction<IProduct | null>>,
    showModal: { create: boolean, update: boolean },
    setShowModal: Dispatch<SetStateAction<{ create: boolean, update: boolean }>>,
    handleShowModal: (modal: "create" | "update") => void,
    getAll: () => void
}) {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [brands, setBrands] = useState<IBrand[]>([]);

    const handleCloseModal = () => {
        setShowModal({ create: false, update: false });
        setCurrentProduct(null);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        // const data = Object.fromEntries(formData.entries()) as unknown as IProduct;

        let img = formData.get('image_url') as string;
        if (img !== "") {
            img = JSON.stringify(img.split("\n")
                .map((img) => img.trim())
                .filter(Boolean));
        }

        // Handle the form data
        const data: IProductModify = {
            name: formData.get('name') as string,
            price: Number(formData.get('price')),
            stock_quantity: Number(formData.get('stock_quantity')),
            description: formData.get('description') as string,
            brand_id: Number(formData.get('brand_id')),
            category_id: Number(formData.get('category_id')),
            status: Number(formData.get('status')),
            image_url: img,
        };

        // Handle form submission logic here
        console.log(data);

        if (showModal.create) {
            // Create product logic
            createProduct(data).then((response) => {
                if (response.status === 201) {
                    toastrSuccess("Success", "Product created successfully!");
                    getAll();
                }
            }).catch((error) => {
                if ([401, 403, 405].includes(error.response.status)) {
                    toastrError("Error", error.response.data.message);
                    return;
                }

                if (error.response.status === 422) {
                    toastrError("Error", error.response.data.errors.join(" ").toString());
                    return;
                }

                toastrError("Error", error.response.data);
            })
        } else if (showModal.update) {
            if (currentProduct) {
                // Update product logic
                updateProduct(data, currentProduct.id).then((response) => {
                    if (response.status === 201) {
                        toastrSuccess("Success", "Product updated successfully!");
                        getAll();
                    } else if (response.status === 304) {
                        toastrInfo("Info", "No changes made to the product.");
                    }
                }).catch((error) => {
                    if ([400, 401, 403, 405].includes(error.response.status)) {
                        toastrError("Error", error.response.data.message);
                        return;
                    }

                    if (error.response.status === 422) {
                        toastrError("Error", error.response.data.errors.join(" ").toString());
                        return;
                    }

                    toastrError("Error", error.response.data);
                })
            } else {
                toastrError("Error", "Product not found.");
            }
        }

        handleCloseModal();
    }

    useEffect(() => {
        getAllCategories().then((response) => {
            if (response.status === 200) {
                setCategories(response.data);
            } else if (response.status === 204) {
                setCategories([]);
            }
        })

        getAllBrands().then((response) => {
            if (response.status === 200) {
                setBrands(response.data);
            } else if (response.status === 204) {
                setBrands([]);
            }
        })
    }, [])

    return (
        <>
            <OverlayTrigger placement="right" overlay={TooltipBtn({}, "Add product")}>
                <Button variant="outline-success" onClick={() => handleShowModal("create")}>
                    <i className="fas fa-plus"></i>
                </Button>
            </OverlayTrigger>

            <Modal show={showModal.create || showModal.update} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{showModal.create ? "Add" : "Modify"} Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} id="modify_product_form">
                        <FormGroup className="mb-3">
                            <FormLabel>Name</FormLabel>
                            <FormControl name="name" defaultValue={currentProduct?.name} />
                        </FormGroup>
                        <InputGroup className="mb-3">
                            <FormGroup className="w-50">
                                <FormLabel>Price</FormLabel>
                                <FormControl type="number" step={0.01} name="price" defaultValue={currentProduct?.price} />
                            </FormGroup>
                            <FormGroup className="w-50">
                                <FormLabel>Stock</FormLabel>
                                <FormControl type="number" name="stock_quantity" defaultValue={currentProduct?.stock_quantity} />
                            </FormGroup>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <FormGroup className="w-50">
                                <FormLabel>Category</FormLabel>
                                <FormSelect name="category_id" defaultValue={currentProduct?.category}>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </FormSelect>
                            </FormGroup>
                            <FormGroup className="w-50">
                                <FormLabel>Brand</FormLabel>
                                <FormSelect name="brand_id" defaultValue={currentProduct?.brand}>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </FormSelect>
                            </FormGroup>
                        </InputGroup>
                        {showModal.update && (
                            <FormGroup className="mb-3">
                                <FormLabel>Status</FormLabel>
                                <FormSelect name="status" defaultValue={currentProduct?.status}>
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                </FormSelect>
                            </FormGroup>
                        )}
                        <FormGroup className="mb-3">
                            <FormLabel>Images (Paste img link here, each one is one row)</FormLabel>
                            <FormControl as="textarea" rows={4} name="image_url" defaultValue={currentProduct?.image_url} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Description</FormLabel>
                            <FormControl as="textarea" name="description" defaultValue={currentProduct?.description} />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant={showModal.create ? "success" : "warning"} form="modify_product_form">
                        {showModal.create ? "Add" : "Edit"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}