import {Link, Outlet} from 'react-router'
export default function PromotionTypeHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="createPromotionType">Add Promotion Type</Link></li>
                    <li><Link to="findPromotionType">All Promotion Types</Link></li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}