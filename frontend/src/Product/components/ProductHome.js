<<<<<<< HEAD

import {Link, Outlet} from 'react-router'
export default function ProductHome(){
=======
import { Link, Outlet } from 'react-router-dom';
>>>>>>> Rakesh

export default function ProductHome() {
    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">Products</span>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createProduct">Add</Link>
                    </li>
<<<<<<< HEAD
                    <li>
                        <Link to="findProduct">Find Product</Link>
                    </li>
                     <li>
                        <Link to="findProductById">FindProductById</Link>
 
=======
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findProduct">Find All</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findProductById">Find By ID</Link>
>>>>>>> Rakesh
                    </li>
                </ul>
            </nav>
            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}