import {Link, Outlet} from 'react-router'
export default function PriceListHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createPriceList">Add PriceList</Link>
                    </li>
                    <li>
                        <Link to="deletePriceList">Delete PriceList</Link>
                    </li>
                    <li>
                        <Link to="findPriceList">Find PriceList</Link>
                    </li>
                    <li>
                        <Link to="updatePriceList">Update PriceList</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}