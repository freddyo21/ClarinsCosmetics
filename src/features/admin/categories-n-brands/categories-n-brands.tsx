import { useCallback, useEffect, useRef, useState } from "react";
import "./categories-n-brands.css";
import { ICategory } from "../../../data/Category";
import { useSortByKey } from "../../../hooks/sort-by-key";
import { IBrand } from "../../../data/Brand";
import { useNavigate } from "react-router-dom";
import { Badge, Col, FormControl, FormLabel, FormSelect, OverlayTrigger, Row, Table } from "react-bootstrap";
import { TooltipBtn } from "../../../utils/JSXElements";
import { Pagination } from "rsuite";
import { getAllCategories } from "../../../services/products/category.service";
import { getAllBrands } from "../../../services/products/brand.service";
import ModifyCategoriesAndBrandsModal from "../../../components/admin/categories-n-brands/ModifyCatNBrandModal";

const limitOptions = [10, 25, 50, 100];

export default function CategoriesAndBrands() {
    const limitRef = useRef<HTMLSelectElement>(null);

    const [active, setActive] = useState(1);
    const [limit, setLimit] = useState(Number(limitRef.current?.value) || limitOptions[0])

    const [searchTerm, setSearchTerm] = useState("");
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [currentItem, setCurrentItem] = useState<ICategory | IBrand | null>(null);
    const [currentType, setCurrentType] = useState<"Brand" | "Category">("Brand");

    const categorySort = useSortByKey(categories, "id");
    const brandSort = useSortByKey(brands, "id");

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

    const sortBy = (type: "brands" | "categories", key: string) => {
        const sortObject = type === "brands" ? brandSort : categorySort;
        return (sortObject.sortCriteria === key && (sortObject.sortOrder === "ascending"
            ? <i className="fas fa-arrow-up"></i>
            : sortObject.sortOrder === "default"
                ? <i className="fas fa-minus"></i>
                : <i className="fas fa-arrow-down"></i>))
    }

    const getAll = useCallback(() => {
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
    }, [navigate]);

    const update = (type: "Brand" | "Category", item: IBrand | ICategory | null) => {
        setCurrentItem(item);
        setCurrentType(type);
        handleShowModal("update");
    }

    const deleteCatNBrand = (type: "Brand" | "Category") => {
        
    }

    useEffect(() => {
        getAll();
    }, [getAll]);

    return (
        <>
            <div className="products-management__container">
                <div className="d-flex gap-2">
                    <h2 className="text-2xl">Brands and Categories Management</h2>
                    <ModifyCategoriesAndBrandsModal currentItem={currentItem} getAll={getAll} currentType={currentType}
                        handleShowModal={handleShowModal} setShowModal={setShowModal} showModal={showModal} setCurrentItem={setCurrentItem} />
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

                <Row>
                    <Col md={6} className="mb-3">
                        <Table striped bordered hover responsive id="brands-management__table">
                            <thead>
                                <tr>
                                    <th onClick={() => brandSort.handleSortChange("id")}>
                                        ID {sortBy("brands", "id")}
                                    </th>
                                    <th onClick={() => brandSort.handleSortChange("name")}>
                                        Name {sortBy("brands", "name")}
                                    </th>
                                    <th onClick={() => brandSort.handleSortChange("status")}>
                                        Status {sortBy("brands", "status")}
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brandSort.sortedData
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
                                            <td>
                                                <Badge bg={item.status ? "success" : "danger"}>
                                                    {item.status ? "Active" : "Inactive"}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <OverlayTrigger placement="left" overlay={TooltipBtn({}, "Details")}>
                                                        <i className="fas fa-circle-info"></i>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay={TooltipBtn({}, "Edit")}>
                                                        <i className="fas fa-cog" onClick={() => update("Brand", item)}></i>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger placement="right" overlay={TooltipBtn({}, "Delete")}>
                                                        <i className="fas fa-trash"></i>
                                                    </OverlayTrigger>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>

                        <div className="d-flex justify-content-between">
                            <Pagination prev last next first size="md"
                                total={brandSort.sortedData.length} limit={limit}
                                ellipsis={true} boundaryLinks={true} maxButtons={3}
                                activePage={active} onChangePage={changePage} />

                            <div>
                                Showing {(active - 1) * limit + 1} - {Math.min(active * limit, brands.length)} of {brands.length} brands
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Table striped bordered hover responsive id="categories-management__table">
                            <thead>
                                <tr>
                                    <th onClick={() => categorySort.handleSortChange("id")}>
                                        ID {sortBy("categories", "id")}
                                    </th>
                                    <th onClick={() => categorySort.handleSortChange("name")}>
                                        Name {sortBy("categories", "name")}
                                    </th>
                                    <th onClick={() => categorySort.handleSortChange("status")}>
                                        Status {sortBy("categories", "status")}
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorySort.sortedData
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
                                            <td>
                                                <Badge bg={item.status ? "success" : "danger"}>
                                                    {item.status ? "Active" : "Inactive"}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <OverlayTrigger placement="left" overlay={TooltipBtn({}, "Details")}>
                                                        <i className="fas fa-circle-info"></i>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay={TooltipBtn({}, "Edit")}>
                                                        <i className="fas fa-cog" onClick={() => update("Category", item)}></i>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger placement="right" overlay={TooltipBtn({}, "Delete")}>
                                                        <i className="fas fa-trash"></i>
                                                    </OverlayTrigger>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>

                        <div className="d-flex justify-content-between">
                            <Pagination prev last next first size="md"
                                total={categorySort.sortedData.length} limit={limit}
                                ellipsis={true} boundaryLinks={true} maxButtons={3}
                                activePage={active} onChangePage={changePage} />

                            <div>
                                Showing {(active - 1) * limit + 1} - {Math.min(active * limit, categories.length)} of {categories.length} categories
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}