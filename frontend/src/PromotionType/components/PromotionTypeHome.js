import {Link, Outlet} from 'react-router'
export default function PromotionTypeHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createPromotionType">Add PromotionType</Link>
                    </li>
                    <li>
                        <Link to="findPromotionType">Find PromotionType</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}