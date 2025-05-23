/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import { ShopConText } from "../../context/ShopContext";
import ProductCard from "../Product/ProductCard";
import { Link, NavLink } from "react-router-dom";

const RecentProduct = () => {
    const { recentProducts, currency } = useContext(ShopConText);
    const [limitedProducts, setLimitedProducts] = useState([]);

    useEffect(() => {
        // Lấy 4 sản phẩm đầu tiên
        setLimitedProducts(recentProducts.slice(0, 4));
    }, [recentProducts]);

    // Kiểm tra nếu không có sản phẩm nào, trả về null hoặc thông báo
    if (!recentProducts || recentProducts.length === 0) {
        return null;  // Hoặc bạn có thể thay bằng một thông báo như: "No recent products available"
    }

    return (
        <div className="mt-[24px] xl:mt-[90px] mb-[60px] xl:mb-[128px] font-rubik">
            <div className="flex items-end justify-between mb-[24px] xl:mb-8">
                <h2 className="xl:uppercase w-[220px] xl:w-[800px] font-semibold xl:text-medium text-[24px] leading-[95%]">
                    Recently viewed products
                </h2>
                <NavLink to="/listing" className="items-center">
                    <button className="bg-primary_blue text-white xl:py-[15.5px] xl:px-8 px-4 py-[11.5px] rounded-lg font-medium text-[14px] 
                    transform transition duration-400 hover:bg-[#294acc] hover:scale-[1.02]">
                        SHOP NOW
                    </button>
                </NavLink>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-[24px] xl:gap-y-0">
                {limitedProducts.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        product={product}
                        currency={currency}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentProduct;
