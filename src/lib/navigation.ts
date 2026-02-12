import { collection, getDocs, limit } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export interface NavLink {
    label: string;
    href?: string;
    submenu?: { label: string; href: string }[];
}

export const getFooterLinks = async (): Promise<NavLink[]> => {
    try {
        // Fetch Products
        const productsSnap = await getDocs(collection(db, "products"));
        const productsMenu = productsSnap.docs.map((doc) => ({
            label: doc.data().name,
            href: `/products/${doc.id}`,
        }));

        // Fetch Solutions
        const solutionsSnap = await getDocs(collection(db, "solutions"));
        const solutionsMenu = solutionsSnap.docs.map((doc) => ({
            label: doc.data().name,
            href: `/solutions/${doc.id}`,
        }));

        const mainNav: NavLink[] = [
            { label: "Solutions", submenu: solutionsMenu },
            { label: "Solutions", submenu: [...solutionsMenu, { label: "All Solutions →", href: "/solutions" }] },
            { href: "/terms-of-services ", label: "Terms of Services " },
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/about", label: "About" },
            { href: "/sustainability  ", label: "Sustainability  " },
            { label: "Products", submenu: [...productsMenu, { label: "All Products →", href: "/products" }] },
            {
                label: "Resources",
                submenu: [
                    { label: "Insights", href: "https://bodenlinkshop.com/blogs/blogs" },
                    { label: "Installation Guides", href: "/resources/installation-guides" },
                    { label: "Technical Library", href: "/technical-library" },
                    { label: "Case Studies", href: "/resources/case-studies" },
                    { label: "Videos", href: "/resources/videos" },
                ],
            },
            { label: "Contact Us", href: "/contact" },
        ];

        return mainNav;
    } catch (error) {
        console.error("Error fetching footer links:", error);
        return [];
    }
};
