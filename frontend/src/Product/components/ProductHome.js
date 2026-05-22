import {Link, Outlet} from 'react-router'
export default function ProductHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createProduct">Add Product</Link>
                    </li>
                    <li>
                        <Link to="deleteProduct">Delete Product</Link>
                    </li>
                    <li>
                        <Link to="findProduct">Find Product</Link>
                    </li>
                    <li>
                        <Link to="updateProduct">Update Product</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}