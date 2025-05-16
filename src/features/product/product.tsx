import { Button, Card, Col, Collapse, FormCheck, FormControl, FormLabel, FormSelect, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import "./product.css";
import { useEffect, useMemo, useRef, useState } from "react";
import FormRange from "react-bootstrap/esm/FormRange";
import { Pagination } from "rsuite";
import "rsuite/Pagination/styles/index.css";
import { TooltipBtn } from "../../utils/JSXElements";
import { ICategory } from "../../data/Category";
import { getAllActiveCategories } from "../../services/products/category.service";
import { IProduct } from "../../data/Product";
import { getAllActiveProducts } from "../../services/products/product.service";
import { getRatingOfAllProducts } from "../../services/products/review.service";
import { addToCart } from "../../services/products/cart.service";
import { ICart } from "../../data/Cart";
import { toastrSuccess } from "../../utils/toastr";

const sampleProducts = [
    {
        id: "p1",
        name: "Total Eye Lift",
        category: "face",
        // subCategory: "eye care",
        price: 89.00,
        rating: 4.8,
        isNew: true,
        isBestSeller: true,
        description: "Complete age control concentrate that visibly lifts and firms the entire eye area",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=300",
        tags: ["anti-aging", "lifting"]
    },
    {
        id: "p2",
        name: "Double Serum",
        category: "face",
        // subCategory: "serum",
        price: 132.00,
        rating: 4.9,
        isNew: false,
        isBestSeller: true,
        description: "Complete age control concentrate powered by 21 plant extracts",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=300",
        tags: ["anti-aging", "hydration"]
    },
    {
        id: "p3",
        name: "Body Firming Cream",
        category: "body",
        // subCategory: "moisturizer",
        price: 67.00,
        rating: 4.5,
        isNew: false,
        isBestSeller: false,
        description: "Firms, tones and improves elasticity for smoother-looking skin",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=300",
        tags: ["firming", "toning"]
    },
    {
        id: "p4",
        name: "UV Plus SPF50",
        category: "face",
        // subCategory: "sun care",
        price: 45.00,
        rating: 4.6,
        isNew: false,
        isBestSeller: false,
        description: "Protects from UV rays, pollution and free radicals",
        image: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?q=80&w=300",
        tags: ["sun protection", "anti-pollution"]
    },
    {
        id: "p5",
        name: "Hydra-Essentiel Cream",
        category: "face",
        // subCategory: "moisturizer",
        price: 48.00,
        rating: 4.7,
        isNew: true,
        isBestSeller: false,
        description: "Quenches and helps protect skin from the dehydrating effects of daily life",
        image: "https://images.unsplash.com/photo-1631730359585-38a4935fbddd?q=80&w=300",
        tags: ["hydration", "moisturizing"]
    },
    {
        id: "p6",
        name: "Gentle Refiner Exfoliating Cream",
        category: "face",
        // subCategory: "exfoliator",
        price: 39.00,
        rating: 4.4,
        isNew: false,
        isBestSeller: false,
        description: "Exfoliates, smooths and refines skin with microbeads and natural extracts",
        image: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?q=80&w=300",
        tags: ["exfoliation", "smoothing"]
    }
];

const categories = [
    { id: "all", name: "All Products" },
    { id: "face", name: "Face Care" },
    { id: "body", name: "Body Care" },
    { id: "makeup", name: "Makeup" },
    { id: "fragrance", name: "Fragrance" }
];

const limitOptions = [3, 5, 10, 25, 50];

export default function Products() {
    const [products, setProducts] = useState<IProduct[] | null>(null);

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    // const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
    const [priceRange, setPriceRange] = useState<number[]>([0, 150]);
    const [sortOption, setSortOption] = useState<string>("featured");
    const [isFilterOpen, setFilterOpen] = useState(true);

    const limitRef = useRef<HTMLSelectElement>(null);

    // const sort = useSortByKey(sampleProducts, "id");

    const [active, setActive] = useState(1);
    const [limit, setLimit] = useState(Number(limitRef.current?.value) || 3);

    const [searchTerm, setSearchTerm] = useState("");

    const changePage = (e: number) => {
        setActive(e);
        console.log(e);
    }

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let result = [...products]; // Use spread operator to create a shallow copy

        // Filter by category
        if (selectedCategory !== "All") {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by price
        result = result.filter(p =>
            p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // Sort products
        if (sortOption === "price-ascending") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-descending") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortOption === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        }

        // Featured is default (no sorting)
        result = result.filter((product) => {
            const search = searchTerm.toLowerCase();
            return Object.values(product).some(value =>
                value?.toString().toLowerCase().includes(search)
            );
        });

        return result;
    }, [products, selectedCategory, sortOption, priceRange, searchTerm]);

    // Reset filters
    const resetFilters = () => {
        setSelectedCategory("All");
        setPriceRange([0, 150]);
        setSortOption("featured");
    }

    const addItemToCart = (item: IProduct, items?: ICart[]) => {
        addToCart(item, items);
        toastrSuccess("Success", "Added to cart successfully");
    }

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await getAllActiveProducts();
                const rating = await getRatingOfAllProducts();

                // Map through products and add rating
                const productsWithRating = res.data.map((product: IProduct) => {
                    const productRating = rating.data.find((r: any) => r.product_id === product.id);
                    return {
                        ...product,
                        rating: productRating ? productRating.average_rating : 0,
                    };
                });

                setProducts(productsWithRating || []); // Đảm bảo luôn là array
            } catch (err) {
                console.error(err);
                setProducts([]); // Trường hợp lỗi vẫn set array rỗng
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        getAllActiveCategories().then((res) => {
            console.log(res.data);
            if (res.data.length > 0) {
                setCategories(res.data);
            }
        }).catch((err) => {
            console.error(err);
        });
    }, [])

    return (
        <>
            <div className="product__container">
                <h3><b>Our Products</b></h3>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <Button variant="light" size="sm" onClick={() => setFilterOpen(!isFilterOpen)}>
                            <i className="fas fa-filter"></i>&nbsp; Filters
                        </Button>&nbsp;

                        <div>
                            <span className="text-sm text-gray-500">
                                {filteredProducts.length} products
                            </span>
                        </div>
                    </div>

                    <div>
                        <FormControl placeholder="Search products..." className="product__search"
                            value={searchTerm} onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setActive(1);
                            }} />
                    </div>

                    <div className="d-flex align-items-center product__filter-criterias">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Sort by</Tooltip>}>
                            <i className="fas fa-list-ul"></i>
                        </OverlayTrigger> &nbsp;
                        <FormSelect value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="product__sort-select">
                            <option value="featured">Featured</option>
                            <option value="price-ascending">Price: Low to High</option>
                            <option value="price-descending">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </FormSelect>
                    </div>
                </div>

                <Row>
                    <Col md={3} className="product__filter">
                        <Collapse in={isFilterOpen}>
                            <Card>
                                <Card.Body>
                                    <div>
                                        <h4 className="mb-2">Categories</h4>

                                        <FormCheck>
                                            <FormCheck.Input type="radio" name="category" value="All"
                                                checked={selectedCategory === "All"} onChange={(e) => setSelectedCategory(e.target.value)} />
                                            <FormCheck.Label>All Products</FormCheck.Label>
                                        </FormCheck>
                                        {categories && categories.map((category) => (
                                            <FormCheck key={category.id}>
                                                <FormCheck.Input type="radio" name="category" value={category.name}
                                                    checked={selectedCategory === category.name} onChange={(e) => setSelectedCategory(e.target.value)} />
                                                <FormCheck.Label>{category.name}</FormCheck.Label>
                                            </FormCheck>
                                        ))}

                                        {/* Subcategories (show only when a category is selected) */}
                                        {/* {selectedCategory !== "all" && availableSubCategories.length > 0 && (
                                            <div>
                                                <h5 className="mb-3">Subcategories</h5>
                                                {availableSubCategories.map((subcat) => (
                                                    <FormCheck key={subcat}>
                                                        <FormCheck.Input type="radio" name="sub_category" id={subcat} value={subcat}
                                                            checked={selectedSubCategory === subcat} onChange={(ev) => setSelectedSubCategory(ev.target.value)} />
                                                        <FormCheck.Label htmlFor={subcat}>{subcat}</FormCheck.Label>
                                                    </FormCheck>
                                                ))}
                                            </div>
                                        )} */}
                                    </div>

                                    <div>
                                        {/* Price Range */}
                                        <div>
                                            <h4 className="font-medium">Price Range</h4>
                                            <div className="px-2">
                                                <div>
                                                    <FormLabel className="mb-1">Min</FormLabel>
                                                    <FormRange min={0} max={200} value={priceRange[0]}
                                                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                                        className="mb-2" />
                                                    <FormLabel className="mb-1">Max</FormLabel>
                                                    <FormRange min={0} max={200} value={priceRange[1]}
                                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} />
                                                </div>
                                                <div className="d-flex justify-content-between items-center mb-3">
                                                    <span className="text-sm">${priceRange[0]}</span>
                                                    <span className="text-sm">${priceRange[1]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button variant="outline-primary" size="sm" className="w-100"
                                        onClick={resetFilters}>
                                        Reset Filters
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Collapse>
                    </Col>

                    <Col md={9} className="product__main">
                        <div>
                            {filteredProducts.length > 0 ? (
                                <div className="product__grid">
                                    {filteredProducts
                                        .slice((active - 1) * limit, active * limit)
                                        .map((product) => (
                                            <Card key={product.id} className="overflow-hidden product__card">
                                                <Card.Img variant="top" src={JSON.parse(product.image_url)[0]} className="w-100" />

                                                <Card.Body className="pb-2">
                                                    <Card.Title>{product.name}</Card.Title>
                                                    {/* <Card.Subtitle className="mb-2">{product.subCategory}</Card.Subtitle> */}
                                                    <p className="text-sm mb-2">{product.description}</p>

                                                    <div className="d-flex items-center mt-2">
                                                        <div className="d-flex align-items-center">
                                                            {[...Array(5)].map((_, index) => (
                                                                <i key={index} className="fas fa-star"
                                                                    style={{ color: index < Math.floor(product.rating) ? "#ffc400" : "aaa" }}></i>
                                                            ))}

                                                            <span className="ms-1 text-xs text-gray-600">
                                                                {product.rating}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* <div className="mt-2 d-flex flex-wrap gap-1">
                                                        {product.tags.map(tag => (
                                                            <Badge bg="danger" key={tag} className="product__tag">{tag}</Badge>
                                                        ))}
                                                    </div> */}
                                                </Card.Body>

                                                <Card.Footer className="d-flex justify-content-between align-items-center text-md">
                                                    <span className="text-bold">${product.price}</span>
                                                    <OverlayTrigger placement="top" overlay={TooltipBtn({}, "Add to cart")}>
                                                        <i className="fas fa-cart-plus" onClick={() => addItemToCart(product)}></i>
                                                    </OverlayTrigger>
                                                </Card.Footer>
                                            </Card>
                                        ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <p className="text-lg text-gray-500 mb-4">No products found matching your criteria.</p>
                                    <Button variant="outline-primary" onClick={resetFilters}>
                                        Reset Filters
                                    </Button>
                                </div>
                            )}


                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <Pagination prev last next first size="md"
                                    total={filteredProducts.length} limit={limit}
                                    activePage={active}
                                    onChangePage={changePage} />
                                <div className="d-flex justify-content-between align-items-center product__filter--limit">
                                    <FormLabel htmlFor="limit">Records per Page</FormLabel>
                                    <FormSelect id="limit" name="limit" className="ms-2 w-50" ref={limitRef}
                                        onChange={() => setLimit(Number(limitRef.current?.value))}>
                                        {limitOptions.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}