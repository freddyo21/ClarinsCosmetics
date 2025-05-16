import { Button, FormControl, FormGroup, FormLabel, FormSelect, Modal, OverlayTrigger } from "react-bootstrap"
import { TooltipBtn } from "../../../utils/JSXElements"
import { Dispatch, FormEvent, SetStateAction } from "react"
import { toastrError, toastrInfo, toastrSuccess } from "../../../utils/toastr"
import { IProduct } from "../../../data/Product"
import { ICategory } from "../../../data/Category"
import { IBrand } from "../../../data/Brand"


export default function ModifyCategoriesAndBrandsModal({ currentItem, setCurrentItem, currentType, showModal, setShowModal, handleShowModal, getAll }: {
    currentItem: ICategory | IBrand | null,
    setCurrentItem: Dispatch<SetStateAction<ICategory | IBrand | null>>,
    currentType: "Category" | "Brand",
    showModal: { create: boolean, update: boolean },
    setShowModal: Dispatch<SetStateAction<{ create: boolean, update: boolean }>>,
    handleShowModal: (modal: "create" | "update") => void,
    getAll: () => void
}) {

    const handleCloseModal = () => {
        setShowModal({ create: false, update: false });
        console.log(currentItem);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData.entries()) as unknown as IProduct;

        console.log(data);

        // handleCloseModal();
    }

    return (
        <>
            <OverlayTrigger placement="right" overlay={TooltipBtn({}, "Add product")}>
                <Button variant="outline-success" onClick={() => handleShowModal("create")}>
                    <i className="fas fa-plus"></i>
                </Button>
            </OverlayTrigger>

            <Modal show={showModal.create || showModal.update} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{showModal.create ? "Add Item" : "Modify"} {showModal.update ? currentType : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} id="modify_product_form">
                        <FormGroup className="mb-3">
                            <FormLabel>Name</FormLabel>
                            <FormControl name="name" defaultValue={currentItem?.name} />
                        </FormGroup>
                        {showModal.create && (
                            <FormGroup className="mb-3">
                                <FormLabel>Type</FormLabel>
                                <FormSelect name="type">
                                    <option value="1">Brand</option>
                                    <option value="2">Category</option>
                                </FormSelect>
                            </FormGroup>
                        )}
                        {showModal.update && (
                            <FormGroup className="mb-3">
                                <FormLabel>Status</FormLabel>
                                <FormSelect name="status" defaultValue={Number(currentItem?.status)}>
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                </FormSelect>
                            </FormGroup>
                        )}
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