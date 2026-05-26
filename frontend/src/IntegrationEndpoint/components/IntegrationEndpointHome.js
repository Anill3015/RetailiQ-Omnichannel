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
                        <Link to="findIntegrationEndpoint">Find IntegrationEndpointById</Link>
                    </li>
                    <li>
                        <Link to="findAllIntegrationEndpoint">FindAll IntegrationEndpoint</Link>
 
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}