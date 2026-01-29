'use client'
import { getAllCategories } from "@/lib/api/admin";
import { logger } from "@/lib/logger";
import { useEffect, useState } from "react";

export default function Categories() {
    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAllCategories();
            setCategories(data);
            logger.log(data)
        }
        fetchCategories()
    }, [])
    return {categories}
}