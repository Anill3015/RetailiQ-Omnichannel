import {Link, Outlet} from 'react-router'
export default function PriceListHome(){

    return (
        <div>
            <nav>
                <ul>
                   <li><Link to="createPriceList">Add PriceList</Link></li>
                    <li><Link to="findPriceList">All PriceLists</Link></li>
                    <li><Link to="findPriceListById">Find PriceList By ID</Link></li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}