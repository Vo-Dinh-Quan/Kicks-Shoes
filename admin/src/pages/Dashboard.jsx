import React, { useState, useEffect, useContext } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import DashboardCard from "../components/Cart/DashboardCard";
import { MyLineChart } from "../components/ui/MyLineChart";
import { images, icons } from "@/assets/assets";
import OrdersList from "@/components/Cart/OrdersList";
import { ShopConText } from "@/context/ShopContext";
import orderApi from "@/apis/orderApi";
import { getTopProducts, getReport } from "@/apis/reportApi"; 
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Dashboard" }];
    const [ordersData, setOrdersData] = useState([]);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });
    const [statisticsData, setStatisticsData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [reportData, setReportData] = useState(null);
    const { handleCategoryChange } = useContext(ShopConText);
    const navigate = useNavigate();

    const handleDateChange = (range) => {
        setDateRange(range);
        console.log("Selected Date Range:", range);
    };

    // Hàm định dạng ngày theo dd-mm-yyyy
    const formatDate = (date) => {
        return format(date, "dd-MM-yyyy");
    };

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await orderApi.getAll();
                console.log("Fetched Order Data:", response.data);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const formattedOrders = response.data.map((order) => {
                        return {
                            ...order,
                            created_at: format(parseISO(order.created_at), "MMM dd'th', yyyy"),
                        };
                    });
                    setOrdersData(formattedOrders);
                } else {
                    console.error("No order data found.");
                }
            } catch (error) {
                console.error("Error fetching order data:", error);
                toast.error("Failed to fetch order data!");
            }
        };
        fetchOrderData();
    }, []);

    // Hàm để gọi API Top Products và Report
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (dateRange.startDate && dateRange.endDate) {
                const fromDate = formatDate(dateRange.startDate);
                const toDate = formatDate(dateRange.endDate);
                try {
                    // Gọi API Top Products
                    const topProductsResponse = await getTopProducts({ fromDate, toDate });
                    console.log("Top Products Data:", topProductsResponse.data);
                    setTopProducts(topProductsResponse.data);

                    // Gọi API Report
                    const reportResponse = await getReport({ fromDate, toDate });
                    console.log("Report Data:", reportResponse.data);
                    setReportData(reportResponse.data);

                    // Cập nhật statisticsData dựa trên reportData
                    const { now, percent } = reportResponse.data;
                    const updatedStatistics = [
                        {
                            id: 1,
                            title: "Total Revenue",
                            amount: `${parseFloat(now[0] || 0).toFixed(2)}`,
                            percentage: percent[0] || 0,
                            description: "Compared to previous period",
                        },
                        {
                            id: 2,
                            title: "Total Orders",
                            amount: `${parseFloat(now[1] || 0).toFixed(2)}`,
                            percentage: percent[1] || 0,
                            description: "Compared to previous period",
                        },
                        {
                            id: 3,
                            title: "Total Products Sold",
                            amount: `${parseFloat(now[2] || 0).toFixed(2)}`,
                            percentage: percent[2] || 0,
                            description: "Compared to previous period",
                        },
                    ];
                    setStatisticsData(updatedStatistics);
                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                    toast.error("Failed to fetch dashboard data!");
                }
            }
        };
        fetchDashboardData();
    }, [dateRange]);

    return (
        <div className="flex flex-col gap-6 mb-8">
            {/* Title */}
            <div className="flex justify-between relative items-end">
                <div>
                    <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
                        Dashboard
                    </h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <div className="z-0">
                    <DateRangePicker onDateChange={handleDateChange} />
                </div>
            </div>
            {/* Statistics component  */}
            <section className="grid grid-cols-3 gap-[14px]">
                {statisticsData.map((item) => (
                    <DashboardCard
                        key={item.id}
                        title={item.title}
                        amount={item.amount}
                        percentage={item.percentage}
                        description={item.description}
                    />
                ))}
            </section>
            <section className="grid grid-cols-3 gap-[14px]">
                <div className="col-span-2 ">
                    {/* Pass reportData to MyLineChart if needed */}
                    <MyLineChart data={reportData} />
                </div>
                <div className="px-4 py-6 bg-white rounded-[16px] flex flex-col gap-4">
                    <div className="flex justify-between items-center pb-5 border-b border-black">
                        <h3 className="font-rubik font-semibold text-xl">
                            Best Sellers
                        </h3>
                        <button className="w-6 h-6 rounded-[4px] bg-transparent hover:bg-gray-300 transition-all">
                            <img
                                src={icons.DotsThreeIcon}
                                alt="dots three icon"
                            />
                        </button>
                    </div>
                    {topProducts.map((product, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between hover:bg-gray-200 rounded-[8px] cursor-pointer"
                        >
                            <div className="flex items-center space-x-4">
                                {/* Hình ảnh */}
                                <img
                                    src={product.product_image || images.Thumbnails[0]} // Đảm bảo có hình ảnh fallback
                                    alt={product.name}
                                    className="w-16 h-16 rounded-[8px]"
                                />
                                {/* Tên và giá */}
                                <div className="flex flex-col gap-1">
                                    <p className="text-[16px] font-semibold text-black">
                                        {product.name}
                                    </p>
                                    <p className="text-[14px] text-[#646464] font-semibold">
                                        ${parseFloat(product.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            {/* Doanh thu và số lượng bán */}
                            <div className="text-right">
                                <p className="font-rubik text-[16px] font-semibold">
                                    ${parseFloat(product.revenue).toFixed(2)}
                                </p>
                                <p className="text-[14px] text-[#646464] font-semibold">
                                    {product.total_quantity} sold
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Nút Report */}
                    <div className="text-left">
                        <button
                            className="font-rubik text-[14px] font-medium px-4 py-[11.5px] bg-black text-white rounded-[8px] text-center 
                        transform transition duration-400 hover:bg-[#4A69E2] uppercase hover:scale-[1.005] hover:text-white"
                            onClick={() => {
                                // Điều hướng tới trang báo cáo hoặc thực hiện chức năng báo cáo
                                navigate("/report"); // Giả sử bạn có route /report
                            }}
                        >
                            REPORT
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <OrdersList orders={ordersData} />
            </section>
        </div>
    );
};

export default Dashboard;
