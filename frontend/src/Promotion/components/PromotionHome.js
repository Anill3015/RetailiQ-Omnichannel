import {Link, Outlet} from 'react-router'
export default function PromotionHome(){

    return (
        <div>
            <nav>
                <ul>
                   <li><Link to="createPromotion">Add Promotion</Link></li>
                    <li><Link to="findPromotion">All Promotions</Link></li>
                    <li><Link to="findPromotionById">Find Promotion By ID</Link></li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}