import "./user-management.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge, FormControl, FormLabel, FormSelect, OverlayTrigger, Table } from "react-bootstrap";
import "rsuite/Pagination/styles/index.css";
import { Pagination } from "rsuite";
import { useSortByKey } from "../../../hooks/sort-by-key";
import { deleteUser, getAllUsers } from "../../../services/users/user.service";
import { IUserFull } from "../../../data/User";
import ModifyUserModal from "../../../components/admin/user-management/ModifyUserModal";
import { toastrError } from "../../../utils/toastr";
import { useNavigate } from "react-router-dom";
import { TooltipBtn } from "../../../utils/JSXElements";
import Swal from "sweetalert2";
import { sweetalert } from "../../../utils/sweetalert";

const limitOptions = [10, 25, 50, 100];

export default function UserManagement() {
    const limitRef = useRef<HTMLSelectElement>(null);

    const [active, setActive] = useState(1);
    const [limit, setLimit] = useState(Number(limitRef.current?.value) || limitOptions[0])

    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState<IUserFull[]>([]);
    const [currentUser, setCurrentUser] = useState<IUserFull | null>(null);

    const { sortOrder, sortCriteria, handleSortChange, sortedData } = useSortByKey(users, "id");

    const [showModal, setShowModal] = useState({ create: false, update: false });
    const handleShowModal = (modal: "create" | "update") => setShowModal({ ...showModal, [modal]: true });

    const navigate = useNavigate();

    const changePage = (e: number) => {
        setActive(e);
    }

    const changeLimit = () => {
        setLimit(Number(limitRef.current?.value));
        changePage(1);
    }

    const setStatus = (status: number) => {
        switch (status) {
            case 0:
                return (<Badge bg="danger">
                    Inactive
                </Badge>)
            case 1:
                return (<Badge bg="success">
                    Active
                </Badge>)
                break;
            case 2:
                return (<Badge bg="warning">
                    Pending
                </Badge>)
                break;
            default:

        }
    }

    const sortBy = (key: string) => {
        return (sortCriteria === key && (sortOrder === "ascending"
            ? <i className="fas fa-arrow-up"></i>
            : sortOrder === "default"
                ? <i className="fas fa-minus"></i>
                : <i className="fas fa-arrow-down"></i>))
    }

    const getAll = useCallback(() => {
        getAllUsers().then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                setUsers(res.data);
            } else if (res.status === 204) {
                setUsers([]);
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                toastrError("Unauthorized", "You are not authorized to access this resource.");
                navigate("/");
            } else {
                toastrError("Error", "An error occurred while fetching data.");
            }
        });
    }, [navigate]);

    const update = (user: IUserFull) => {
        console.log(user);
        setCurrentUser(user);
        handleShowModal("update");
    }

    const deleteUsr = (id: number) => {
        Swal.fire({
            title: "Are you sure to delete this user?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
        }).then((result) => {
            if (result.isConfirmed) {
                sweetalert("Deleted!", "success", "This user has been deleted.");
                // Call the delete user function here
                deleteUser(id).then((res) => {
                    if (res.status === 200) {
                        getAll();
                    } else {
                        toastrError("Error", "An error occurred while deleting the user.");
                    }
                }).catch((err) => {
                    if (err.response.status === 400) {
                        toastrError("Bad Request", "Invalid ID format");
                    } else if (err.response.status === 404) {
                        toastrError("Not Found", `User with id ${id} is not found.`);
                    } else {
                        toastrError("Error", err.response.data.message);
                    }
                });
            }
        })
    }

    useEffect(() => {
        getAll();
    }, [getAll]);

    return (
        <>
            <div className="user-management__container">
                <div className="d-flex gap-2">
                    <h2 className="text-2xl">User Management</h2>
                    <ModifyUserModal currentUser={currentUser} setCurrentUser={setCurrentUser} getAll={getAll}
                        showModal={showModal} setShowModal={setShowModal} handleShowModal={handleShowModal} />
                </div>

                <div className="user-management__filter my-3">
                    <div className="user-management__filter-search">
                        <FormControl type="text" placeholder="Input keyword(s) or the ID of the record that you want to search"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="user-management__filter-limit">
                        <FormLabel htmlFor="limit" className="m-0">Records per page</FormLabel>
                        <FormSelect id="limit" name="limit" className="ms-2 w-50" ref={limitRef}
                            onChange={changeLimit}>
                            {limitOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </FormSelect>
                    </div>
                </div>

                <Table striped bordered hover responsive id="user-management__table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th onClick={() => handleSortChange("id")}>
                                ID {sortBy("id")}
                            </th>
                            <th onClick={() => handleSortChange("name")}>
                                Full name {sortBy("name")}
                            </th>
                            <th onClick={() => handleSortChange("gender")}>
                                Gender {sortBy("gender")}
                            </th>
                            <th onClick={() => handleSortChange("email")}>
                                Email {sortBy("email")}
                            </th>
                            <th onClick={() => handleSortChange("phone")}>
                                Phone {sortBy("phone")}
                            </th>
                            <th onClick={() => handleSortChange("role")}>
                                Role {sortBy("role")}
                            </th>
                            <th onClick={() => handleSortChange("status")}>
                                Status {sortBy("status")}
                            </th>
                            <th onClick={() => handleSortChange("create_at")}>
                                Registered date {sortBy("create_at")}
                            </th>
                            <th onClick={() => handleSortChange("logged_in")}>
                                Last login {sortBy("logged_in")}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData
                            .filter((item) => {
                                const search = searchTerm.toLowerCase();
                                return Object.values(item).some(value => // 
                                    value?.toString().toLowerCase().includes(search)
                                );
                            })
                            // .filter((item) => filterCity === "" || item.city === filterCity)
                            .slice((active - 1) * limit, active * limit)
                            .map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.gender ? "Female" : "Male"}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <Badge bg={item.role ? "success" : "danger"}>
                                            {item.role ? "User" : "Admin"}
                                        </Badge>
                                    </td>
                                    <td>{setStatus(item.status)}</td>
                                    <td>{item.create_at}</td>
                                    <td>{item.logged_in}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <OverlayTrigger placement="left" overlay={TooltipBtn({}, "Details")}>
                                                <i className="fas fa-circle-info"></i>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={TooltipBtn({}, "Edit")}>
                                                <i className="fas fa-cog" onClick={() => update(item)}></i>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={TooltipBtn({}, "Delete")}>
                                                <i className="fas fa-trash" onClick={() => deleteUsr(item.id)}></i>
                                            </OverlayTrigger>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between">
                    <Pagination prev last next first size="md"
                        total={sortedData.length} limit={limit}
                        ellipsis={true} boundaryLinks={true} maxButtons={4}
                        activePage={active} onChangePage={changePage} />

                    <div>
                        Showing {(active - 1) * limit + 1} - {Math.min(active * limit, users.length)} of {users.length} users
                    </div>
                </div>
            </div>
        </>
    );
}