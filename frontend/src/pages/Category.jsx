import products from "../data/products";
import { useNavigate } from "react-router-dom";

const Category = ()=>{
    const categories  = [...new Set(products.map((item)=>item.category))]
    const navigate = useNavigate();

    return(
        <div style={{padding: "20px"}}>
                        <h2>Caterogris</h2>
                        <ul>
                            {categories.map((cat, index)=>(
                                <li key={index} style={{marginBottom:"10px", cursor:"pointer"}} onClick={() => navigate(`/products?category=${cat}`)}>{cat}</li>
                            ))}
                        </ul>
        </div>
    )
}
export default Category;