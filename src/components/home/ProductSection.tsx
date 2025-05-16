import "./ProductSection.css";
import React, { useState, useMemo } from "react";
import { Button, Card, FormSelect, InputGroup, Modal } from "react-bootstrap";
import { IProduct } from "../../data/Product";
// import ProductPopup from "./ProductPopup";

type ProductSectionProps = {
  title: string;
  products: IProduct[];
};

const uniqueValues = (items: IProduct[], key: keyof IProduct) => {
  const set = new Set<string>();
  items.forEach((item) => set.add(item[key] as string));
  return Array.from(set);
};

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [selectedProductImages, setSelectedProductImages] = useState<string[]>([]);

  const [brandFilter, setBrandFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>(""); // Format: "low", "high", ""
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  }

  const handleShow = (product: IProduct) => {
    setSelectedProduct(product);
    setSelectedProductImages(JSON.parse(product.image_url));
    setShowModal(true);
  }

  // Get unique values for brands and categories
  // using useMemo to optimize performance
  // and avoid unnecessary calculations on every render
  const brands = useMemo(() => uniqueValues(products, "brand"), [products]);
  const categories = useMemo(() => uniqueValues(products, "category"), [products]);

  // Filter products based on selected filters
  // using useMemo to optimize performance
  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (brandFilter) filtered = filtered.filter((p) => p.brand === brandFilter);
    if (categoryFilter) filtered = filtered.filter((p) => p.category === categoryFilter);
    if (priceFilter === "low") filtered = filtered.slice().sort((a, b) => a.price - b.price);
    if (priceFilter === "high") filtered = filtered.slice().sort((a, b) => b.price - a.price);
    return filtered;
  }, [brandFilter, priceFilter, categoryFilter, products]);

  return (
    <section className="home__product-section">
      <Card>
        <Card.Body>
          <h3 className="text-2xl font-semibold mb-3">{title}</h3>
          <InputGroup className="mb-3">
            {/* Filters */}
            <FormSelect className="" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </FormSelect>

            <FormSelect className="" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </FormSelect>

            <FormSelect className="" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="">Sort by Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </FormSelect>

            <Button variant="primary" onClick={() => {
              setBrandFilter("");
              setCategoryFilter("");
              setPriceFilter("");
            }} id="home__clear-filters">
              Clear Filters
            </Button>
          </InputGroup>

          <div className="home__product-container">
            {filteredProducts.map((product) => (
              <div key={product.id} className="home__product-item">
                {/* Product Card */}
                <Card key={product.id} className="home__product-card" onClick={() => handleShow(product)}>
                  <Card.Img variant="top" src={JSON.parse(product.image_url)[0]} alt={product.name}
                    loading="lazy" className="home__product-image" />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle>${product.price}</Card.Subtitle>
                    <Card.Text>{product.brand}</Card.Text>
                    <Button variant="primary" onClick={() => handleShow(product)}>
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
      {selectedProduct && (
        <Modal show={showModal} onHide={handleClose} className="home__product-modal">
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
              {selectedProductImages.map((image, index) => (
                <img key={index} src={image} alt={selectedProduct.name}
                  loading="lazy" className="home__product-modal-image w-100" />
              ))}
            </div>
            <p>{selectedProduct.description}</p>
            <div className="d-flex justify-content-between">
              <p>Brand: {selectedProduct.brand}</p>
              <p>Category: {selectedProduct.category}</p>
            </div>
            <p>Price: ${selectedProduct.price}</p>
            <p>Sold: {selectedProduct.sold}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Add to Cart</Button>
          </Modal.Footer>
        </Modal>
      )}
    </section>
  );
};

export default ProductSection;
