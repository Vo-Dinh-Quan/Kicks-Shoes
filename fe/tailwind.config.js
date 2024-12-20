/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Open Sans", "sans-serif"], // Sử dụng Open Sans cho font sans
                rubik: ["Rubik", "sans-serif"],
                inter: ["Inter", "sans-serif"] // Sử dụng Rubik cho font rubik
            },
            container: {
                center: true, // Căn giữa container
                padding: {
                    DEFAULT: "16px", // Padding mặc định cho mọi kích thước màn hình
                    sm: "16px", // Padding cho màn hình nhỏ (sm: ≥640px)
                    md: "32px", // Padding cho màn hình vừa (md: ≥768px)
                    lg: "32px", // Padding cho màn hình lớn (lg: ≥1024px)
                    xl: "32px", // Padding cho màn hình rất lớn (xl: ≥1280px)
                    "2xl": "64px", // Padding cho màn hình cực lớn (2xl: ≥1536px)
                },
                screens: {
                    sm: "100%", // Chiều rộng 100% cho màn hình nhỏ
                    md: "832px", // Chiều rộng 100% cho màn hình vừa
                    lg: "1088px", // Đặt chiều rộng tối đa cho màn hình lớn
                    xl: "1344px", // Đặt chiều rộng tối đa cho màn hình rất lớn
                    "2xl": "1448px", // Đặt chiều rộng tối đa cho màn hình cực lớn
                    'max-sm': { 'max': '640px' },
                    xxs: "400px",
                },
                margin: {
                    DEFAULT: "auto", // Margin tự động để căn giữa container
                },
            },
            fontSize: {
                big: "223px",
                medium: "74px",
                small: "60px",
            },
            colors: {
                primary_blue: '#4A69E2', // Màu chủ đạo (blue)
                secondary_yellow: '#FFA52F', // Màu phụ (Yellow)
                secondary_black: '#232321', // Màu phụ (Black)
            },
        },

    },
    plugins: ["prettier-plugin-tailwindcss"],
};
