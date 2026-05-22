import {Link, Outlet} from 'react-router'
export default function IntegrationEndpointHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createIntegrationEndpoint">Add IntegrationEndpoint</Link>
                    </li>
                    <li>
                        <Link to="deleteIntegrationEndpoint">Delete IntegrationEndpoint</Link>
                    </li>
                    <li>
                        <Link to="findIntegrationEndpoint">Find IntegrationEndpoint</Link>
                    </li>
                    <li>
                        <Link to="updateIntegrationEndpoint">Update IntegrationEndpoint</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}