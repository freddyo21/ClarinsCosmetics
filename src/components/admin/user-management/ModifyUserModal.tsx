import { Button, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Modal, OverlayTrigger } from "react-bootstrap"
import { TooltipBtn } from "../../../utils/JSXElements"
import { Dispatch, FormEvent, SetStateAction } from "react"
import { IUserFull } from "../../../data/User"
import { createUser, updateUser } from "../../../services/users/user.service"
import { toastrError, toastrInfo, toastrSuccess } from "../../../utils/toastr"


export default function ModifyUserModal({ currentUser, setCurrentUser, showModal, setShowModal, handleShowModal, getAll }: {
    currentUser: IUserFull | null,
    setCurrentUser: Dispatch<SetStateAction<IUserFull | null>>,
    showModal: { create: boolean, update: boolean },
    setShowModal: Dispatch<SetStateAction<{ create: boolean, update: boolean }>>,
    handleShowModal: (modal: "create" | "update") => void,
    getAll: () => void
}) {
    const handleCloseModal = () => {
        setShowModal({ create: false, update: false });
        setCurrentUser(null);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData.entries()) as unknown as IUserFull;
        // Handle form submission logic here
        console.log(data);

        if (showModal.create) {
            // Create user logic
            createUser(data).then((response) => {
                if (response.status === 201) {
                    toastrSuccess("Success", "User created successfully!");
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

                toastrError("Error", "An error occurred while creating the user.");
            })
        } else if (showModal.update) {
            if (currentUser) {
                // Update user logic
                updateUser(data, currentUser.id).then((response) => {
                    if (response.status === 201) {
                        toastrSuccess("Success", "User updated successfully!");
                        getAll();
                    } else if (response.status === 304) {
                        toastrInfo("Info", "No changes made to the user.");
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

                    toastrError("Error", "An error occurred while updating the user.");
                })
            } else {
                toastrError("Error", "User not found.");
            }
        }

        handleCloseModal();
    }

    return (
        <>
            <OverlayTrigger placement="right" overlay={TooltipBtn({}, "Add user")}>
                <Button variant="outline-success" onClick={() => handleShowModal("create")}>
                    <i className="fas fa-plus"></i>
                </Button>
            </OverlayTrigger>

            <Modal show={showModal.create || showModal.update} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{showModal.create ? "Add" : "Modify"} User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} id="modify_user_form">
                        <FormGroup className="mb-3">
                            <FormLabel>Name</FormLabel>
                            <FormControl name="name" defaultValue={currentUser?.name} />
                        </FormGroup>
                        <InputGroup className="mb-3">
                            <FormGroup className="w-50">
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl type="date" name="dob" defaultValue={currentUser?.dob} />
                            </FormGroup>
                            <FormGroup className="w-50">
                                <FormLabel>Gender</FormLabel>
                                <FormSelect name="gender" defaultValue={Number(currentUser?.gender)}>
                                    <option value="-1">Choose gender</option>
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </FormSelect>
                            </FormGroup>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <FormGroup className="w-50">
                                <FormLabel>Email</FormLabel>
                                <FormControl type="email" name="email" defaultValue={currentUser?.email} />
                            </FormGroup>
                            <FormGroup className="w-50">
                                <FormLabel>Phone</FormLabel>
                                <FormControl type="tel" name="phone" defaultValue={currentUser?.phone} />
                            </FormGroup>
                        </InputGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Role</FormLabel>
                            <FormSelect name="role" defaultValue={currentUser?.role}>
                                <option value="0">Admin</option>
                                <option value="1">User</option>
                            </FormSelect>
                        </FormGroup>
                        {showModal.update && (
                            <FormGroup className="mb-3">
                                <FormLabel>Status</FormLabel>
                                <FormSelect name="status" defaultValue={currentUser?.status}>
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                    {currentUser?.role === 1 && <option value="2">Pending</option>}
                                </FormSelect>
                            </FormGroup>
                        )}
                        {showModal.create && (
                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl type="password" placeholder="Password" name="password" />
                            </FormGroup>
                        )}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant={showModal.create ? "success" : "warning"} form="modify_user_form">
                        {showModal.create ? "Add" : "Edit"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}