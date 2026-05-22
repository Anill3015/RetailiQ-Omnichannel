import {Link, Outlet} from 'react-router'
export default function PromotionHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createPromotion">Add Promotion</Link>
                    </li>
                    <li>
                        <Link to="findPromotion">Find Promotion</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}