import "./home.css";
import ProductSection from "../../components/home/ProductSection";
import { IProduct } from "../../data/Product";
import { useEffect, useState } from "react";
import { getTopSelling } from "../../services/products/product.service";

export default function Home() {
    const [topSellingProducts, setTopSellingProducts] = useState<IProduct[]>([]);
    // const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        let isMounted = true;
        getTopSelling().then((res) => {
            if (isMounted) {
                console.log(res.data);
                setTopSellingProducts(res.data);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            <main className="">
                {/* Top Selling Products */}
                <section className="p-4">
                    <h2 className="text-3xl font-bold">Top Selling Products</h2>
                    <ProductSection title="Top Selling Products" products={topSellingProducts!} />
                </section>

                {/* Product Sections */}
                <ProductSection title="Face Care Products"
                    products={topSellingProducts!.filter(p => ["face care", "face"].includes(p.category.toLowerCase()))} />
                <ProductSection title="Body Care Products"
                    products={topSellingProducts!.filter(p => ["body care", "body"].includes(p.category.toLowerCase()))} />
                <ProductSection title="Sunscreen Products"
                    products={topSellingProducts!.filter(p => p.category.toLowerCase() === "sunscreen")} />

                {/* Offers Section */}
                <section className="rounded home__offers-section">
                    <h3 className="mb-4">Exclusive Offers</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Buy 2 Clarins products and get 10% off</li>
                        <li>Free shipping on orders over $75</li>
                        <li>Exclusive gifts with select purchases</li>
                    </ul>
                </section>

                {/* Gallery */}
                {/* <Gallery /> */}
            </main>
        </>
    );
}