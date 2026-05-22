import {Link, Outlet} from 'react-router'
export default function RecommendationHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createRecommendation">Add Recommendation</Link>
                    </li>
                    <li>
                        <Link to="findRecommendation">Find Recommendation</Link>
                    </li>
                    <li>
                        <Link to="updateRecommendation">Update Recommendation</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}