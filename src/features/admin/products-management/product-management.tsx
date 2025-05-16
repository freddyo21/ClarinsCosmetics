import { Badge, FormControl, FormLabel, FormSelect, OverlayTrigger, Table } from "react-bootstrap";
import "./product-management.css";
import { Pagination } from "rsuite";
import { useCallback, useEffect, useRef, useState } from "react";
import { toastrError } from "../../../utils/toastr";
import { useNavigate } from "react-router-dom";
import { useSortByKey } from "../../../hooks/sort-by-key";
import { IProduct } from "../../../data/Product";
import { deleteProduct, getAllProducts } from "../../../services/products/product.service";
import { TooltipBtn } from "../../../utils/JSXElements";
import { logOut } from "../../../services/general/credential/login.service";
import ModifyProductModal from "../../../components/admin/product-management/ModifyProductModal";
import Swal from "sweetalert2";
import { sweetalert } from "../../../utils/sweetalert";

const limitOptions = [10, 25, 50, 100];

export default function ProductManagement() {
    const limitRef = useRef<HTMLSelectElement>(null);

    const [active, setActive] = useState(1);
    const [limit, setLimit] = useState(Number(limitRef.current?.value) || limitOptions[0])

    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

    const { sortOrder, sortCriteria, handleSortChange, sortedData } = useSortByKey(products, "id");

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

    const sortBy = (key: string) => {
        return (sortCriteria === key && (sortOrder === "ascending"
            ? <i className="fas fa-arrow-up"></i>
            : sortOrder === "default"
                ? <i className="fas fa-minus"></i>
                : <i className="fas fa-arrow-down"></i>))
    }

    const getAll = useCallback(() => {
        getAllProducts().then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                setProducts(res.data);
            } else if (res.status === 204) {
                setProducts([]);
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                toastrError("Unauthorized", "You are not authorized to access this resource.");
                logOut();
                navigate("/");
            } else if (err.response.status === 404) {
                toastrError("Not found", "There were no products in the database.");
            } else {
                toastrError("Error", err.response.data.message);
                console.error(err);
            }
        });
    }, [navigate]);

    const update = (product: IProduct) => {
        console.log(product);
        let img = JSON.parse(product.image_url || "[]")
            .map((img: string) => img.trim())
            .filter(Boolean) // Filter out empty strings
            .join("\n");
        product.image_url = img;
        
        setCurrentProduct(product);
        handleShowModal("update");
    }

    const deletePrd = (id: number) => {
        Swal.fire({
            title: "Are you sure to delete this product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
        }).then((result) => {
            if (result.isConfirmed) {
                sweetalert("Deleted!", "success", "This product has been deleted.");
                // Call the delete product function here
                deleteProduct(id);
                getAll();
            }
        })
    }

    useEffect(() => {
        getAll();
    }, [getAll]);

    return (
        <>
            <div className="products-management__container">
                <div className="d-flex gap-2">
                    <h2 className="text-2xl">Products Management</h2>
                    <ModifyProductModal currentProduct={currentProduct} handleShowModal={handleShowModal} getAll={getAll}
                        setCurrentProduct={setCurrentProduct} setShowModal={setShowModal} showModal={showModal} />
                </div>

                <div className="products-management__filter my-3">
                    <div className="products-management__filter-search">
                        <FormControl type="text" placeholder="Input keyword(s) or the ID of the record that you want to search"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="products-management__filter-limit">
                        <FormLabel htmlFor="limit" className="m-0">Records per page</FormLabel>
                        <FormSelect id="limit" name="limit" className="ms-2 w-50" ref={limitRef}
                            onChange={changeLimit}>
                            {limitOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </FormSelect>
                    </div>
                </div>

                <Table striped bordered hover responsive id="products-management__table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSortChange("id")}>
                                ID {sortBy("id")}
                            </th>
                            <th onClick={() => handleSortChange("name")}>
                                Name {sortBy("name")}
                            </th>
                            <th onClick={() => handleSortChange("category")}>
                                Category {sortBy("category")}
                            </th>
                            <th onClick={() => handleSortChange("brand")}>
                                Brand {sortBy("brand")}
                            </th>
                            <th onClick={() => handleSortChange("price")}>
                                Price {sortBy("price")}
                            </th>
                            <th onClick={() => handleSortChange("stock_quantity")}>
                                Stock {sortBy("stock_quantity")}
                            </th>
                            <th onClick={() => handleSortChange("sold")}>
                                Sold {sortBy("sold")}
                            </th>
                            <th onClick={() => handleSortChange("status")}>
                                Status {sortBy("status")}
                            </th>
                            <th onClick={() => handleSortChange("create_at")}>
                                Created at {sortBy("create_at")}
                            </th>
                            <th onClick={() => handleSortChange("update_at")}>
                                Updated at {sortBy("update_at")}
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
                            .map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.price}</td>
                                    <td>{item.stock_quantity}</td>
                                    <td>{item.sold}</td>
                                    <td>
                                        <Badge pill bg={item.status ? "success" : "secondary"}>
                                            {item.status ? "Active" : "Inactive"}
                                        </Badge>
                                    </td>
                                    <td>{item.create_at}</td>
                                    <td>{item.update_at}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <OverlayTrigger placement="left" overlay={TooltipBtn({}, "Details")}>
                                                <i className="fas fa-circle-info"></i>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={TooltipBtn({}, "Edit")}>
                                                <i className="fas fa-cog" onClick={() => update(item)}></i>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={TooltipBtn({}, "Delete")}>
                                                <i className="fas fa-trash" onClick={() => deletePrd(item.id)}></i>
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
                        Showing {(active - 1) * limit + 1} - {Math.min(active * limit, products.length)} of {products.length} products
                    </div>
                </div>
            </div>
        </>
    );
}