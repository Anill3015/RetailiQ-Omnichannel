import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route,Outlet } from 'react-router';

import ForecastHome from './Forecast/components/ForecastHome';
import CreateForecast from './Forecast/components/CreateForecast';
import DeleteForecast from './Forecast/components/DeleteForecast';
import FindForecast from './Forecast/components/FindForecast';
import UpdateForecast from './Forecast/components/UpdateForecast';

import AuditLogHome from './AuditLog/components/AuditLogHome';
import FindAuditLog from './AuditLog/components/FindAuditLog';

import CustomerProfileHome from './CustomerProfile/components/CustomerProfileHome';
import CreateCustomerProfile from './CustomerProfile/components/CreateCustomerProfile';
import DeleteCustomerProfile from './CustomerProfile/components/DeleteCustomerProfile';
import UpdateCustomerProfile from './CustomerProfile/components/UpdateCustomerProfile';
import FindCustomerProfile from './CustomerProfile/components/FindCustomerProfile';
import FindCustomerProfileById from './CustomerProfile/components/FindCustomerProfileById';

import ExceptionEventHome from './ExceptionEvent/components/ExceptionEventHome';
import CreateExceptionEvent from './ExceptionEvent/components/CreateExceptionEvent';
import DeleteExceptionEvent from './ExceptionEvent/components/DeleteExceptionEvent';
import UpdateExceptionEvent from './ExceptionEvent/components/UpdateExceptionEvent';

import FulfillmentInstructionHome from './FulfillmentInstruction/components/FulfillmentInstructionHome';
import CreateFulfillmentInstruction from './FulfillmentInstruction/components/CreateFulfillmentInstruction';
import FindFulfillmentInstruction from './FulfillmentInstruction/components/FindFulfillmentInstruction';
import UpdateFulfillmentInstruction from './FulfillmentInstruction/components/UpdateFulfillmentInstruction';
import DeleteFulfillmentInstruction from './FulfillmentInstruction/components/DeleteFulfillmentInstruction';

import IntegrationEndpointHome from './IntegrationEndpoint/components/IntegrationEndpointHome';
import CreateIntegrationEndpoint from './IntegrationEndpoint/components/CreateIntegrationEndpoint';
import UpdateIntegrationEndpoint from './IntegrationEndpoint/components/UpdateIntegrationEndpoint';
import DeleteIntegrationEndpoint from './IntegrationEndpoint/components/DeleteIntegrationEndpoint';
import FindIntegrationEndpoint from './IntegrationEndpoint/components/FindIntegrationEndpoint';

import InventoryHome from './Inventory/components/InventoryHome';
import CreateInventory from './Inventory/components/CreateInventory';
import FindInventory from './Inventory/components/FindInventory';
import UpdateInventory from './Inventory/components/UpdateInventory';
import DeleteInventory from './Inventory/components/DeleteInventory';

import InventoryAvailabilityHome from './InventoryAvailability/components/InventoryAvailabilityHome';
import CreateInventoryAvailability from './InventoryAvailability/components/FindInventoryAvailability';

import InventoryPositionHome from './InventoryPosition/components/InventoryPositionHome';
import CreateInventoryPosition from './InventoryPosition/components/CreateInventoryPosition';
import FindInventoryPosition from './InventoryPosition/components/FindInventoryPosition';
import FindInventoryPositionById from './InventoryPosition/components/FindInventoryPositionById';
import UpdateInventoryPosition from './InventoryPosition/components/UpdateInventoryPosition';
import DeleteInventoryPosition from './InventoryPosition/components/DeleteInventoryPosition';

import KPIReportHome from './KPIReport/components/KPIReportHome';
import CreateKPIReport from './KPIReport/components/CreateKPIReport';
import FindKPIReportById from './KPIReport/components/FindKPIReportById';
import UpdateKPIReport from './KPIReport/components/UpdateKPIReport';
import DeleteKPIReport from './KPIReport/components/DeleteKPIReport';

import LocationHome from './Location/components/LocationHome';
import CreateLocation from './Location/components/CreateLocation';
import FindLocation from './Location/components/FindLocation';
import FindLocationById from './Location/components/FindLocationById';
import DeleteLocation from './Location/components/DeleteLocation';
import UpdateLocation from './Location/components/UpdateLocation';

import NotificationHome from './Notification/components/NotificationHome';
import CreateNotification from './Notification/components/CreateNotification';
import FindNotification from './Notification/components/FindNotification';
import UpdateNotification from './Notification/components/UpdateNotification';
import DeleteNotification from './Notification/components/DeleteNotification';

import OrderHome from './Order/components/OrderHome';
import CreateOrder from './Order/components/CreateOrder';
import FindOrder from './Order/components/FindOrder';
import DeleteOrder from './Order/components/DeleteOrder';
import UpdateOrder from './Order/components/UpdateOrder';

import PriceListHome from './PriceList/components/PriceListHome';
import CreatePriceList from './PriceList/components/CreatePriceList';
import FindPriceList from './PriceList/components/FindPriceList';
import UpdatePriceList from './PriceList/components/UpdatePriceList';
import DeletePriceList from './PriceList/components/DeletePriceList';

import PromotionHome from './Promotion/components/PromotionHome';
import CreatePromotion from './Promotion/components/CreatePromotion';
import FindPromotion from './Promotion/components/FindPromotion';

import PromotionTypeHome from './PromotionType/components/PromotionTypeHome';
import CreatePromotionType from './PromotionType/components/CreatePromotionType';
import FindPromotionType from './PromotionType/components/FindPromotionType';

import RecommendationHome from './Recommendation/components/RecommendationHome';
import CreateRecommendation from './Recommendation/components/CreateRecommendation';
import FindRecommendation from './Recommendation/components/FindRecommendation';
import UpdateRecommendation from './Recommendation/components/UpdateRecommendation';

import ReplenishmentHome from './Replenishment/components/ReplenishmentHome';
import CreateReplenishment from './Replenishment/components/CreateReplenishment';
import FindReplenishment from './Replenishment/components/FindReplenishment';
import UpdateReplenishment from './Replenishment/components/UpdateReplenishment';
import DeleteReplenishment from './Replenishment/components/DeleteReplenishment';

import ReturnAuthorizationHome from './ReturnAuthorization/components/ReturnAuthorizationHome';
import CreateReturnAuthorization from './ReturnAuthorization/components/CreateReturnAuthorization';
import UpdateReturnAuthorization from './ReturnAuthorization/components/UpdateReturnAuthorization';
import DeleteReturnAuthorization from './ReturnAuthorization/components/DeleteReturnAuthorization';

import RoleHome from './Role/components/RoleHome';
import CreateRole from './Role/components/CreateRole';
import FindRole from './Role/components/FindRole';
import DeleteRole from './Role/components/DeleteRole';

import UserHome from './User/components/UserHome';
import CreateUser from './User/components/CreateUser';
import FindUser from './User/components/FindUser';
import UpdateUser from './User/components/UpdateUser';
import DeleteUser from './User/components/DeleteUser';

import ProductHome from './Product/components/ProductHome';
import CreateProduct from './Product/components/CreateProduct';
import FindProduct from './Product/components/FindProduct';
import UpdateProduct from './Product/components/UpdateProduct';
import DeleteProduct from './Product/components/DeleteProduct';
import FindAllExceptionEvent from './ExceptionEvent/components/FindAllExceptionEvent';
import FindExceptionEventById from './ExceptionEvent/components/FindExceptionEventById';
import FindAllKPIReport from './KPIReport/components/FindAllKPIReport';
import FindReturnAuthorizationById from './ReturnAuthorization/components/FindReturnAuthorizationById';
import FindAllReturnAuthorization from './ReturnAuthorization/components/FindAllReturnAuthorization';
import DeleteRecommendation from './Recommendation/components/DeleteRecommendation';
import FindRecommendationById from './Recommendation/components/FindRecommendationById';
import FindReplenishmentById from './Replenishment/components/FindReplenishmentById';
import FindForecastById from './Forecast/components/FindForecastById';
import FindOrderById from './Order/components/FindOrderById';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="Forecast" element={<ForecastHome/>}>
            <Route path="createForecast" element={<CreateForecast/>}></Route>
            <Route path="deleteForecast" element={<DeleteForecast/>}></Route>
            <Route path="FindForecastById" element={<FindForecastById/>}></Route>
            <Route path="findForecast" element={<FindForecast/>}></Route>
            <Route path="updateForecast/:fcid" element={<UpdateForecast/>}></Route>
        </Route>

        <Route path="AuditLog" element={<AuditLogHome/>}>\
            <Route path="findAuditLog" element={<FindAuditLog/>}></Route>
        </Route>

        <Route path="CustomerProfile" element={<CustomerProfileHome/>}>
            <Route path="createCustomerProfile" element={<CreateCustomerProfile/>}></Route>
            <Route path="deleteCustomerProfile/:cpid" element={<DeleteCustomerProfile/>}></Route>
            <Route path="findCustomerProfile" element={<FindCustomerProfile/>}></Route>
            <Route path="updateCustomerProfile/:cpid" element={<UpdateCustomerProfile/>}></Route>
            <Route path="findCustomerProfileById/:cpid" element={<FindCustomerProfileById/>}></Route>
        </Route>
         <Route path="ExceptionEvent" element={<ExceptionEventHome/>}>
            <Route path="createExceptionEvent" element={<CreateExceptionEvent/>}></Route>
            <Route path="deleteExceptionEvent/:id" element={<DeleteExceptionEvent/>}></Route>
            <Route path="findExceptionEventById" element={<FindExceptionEventById/>}></Route>
            <Route path="updateExceptionEvent/:id" element={<UpdateExceptionEvent/>}></Route>
            <Route path="findAllExceptionEvent" element={<FindAllExceptionEvent/>}></Route>
        </Route>

         <Route path="FulfillmentInstruction" element={<FulfillmentInstructionHome/>}>
            <Route path="createFulfillmentInstruction" element={<CreateFulfillmentInstruction/>}></Route>
            <Route path="deleteFulfillmentInstruction" element={<DeleteFulfillmentInstruction/>}></Route>
            <Route path="findFulfillmentInstruction" element={<FindFulfillmentInstruction/>}></Route>
            <Route path="updateFulfillmentInstruction" element={<UpdateFulfillmentInstruction/>}></Route>
        </Route>

           <Route path="IntegrationEndpoint" element={<IntegrationEndpointHome/>}>
            <Route path="createIntegrationEndpoint" element={<CreateIntegrationEndpoint/>}></Route>
            <Route path="deleteIntegrationEndpoint" element={<DeleteIntegrationEndpoint/>}></Route>
            <Route path="findIntegrationEndpoint" element={<FindIntegrationEndpoint/>}></Route>
            <Route path="updateIntegrationEndpoint" element={<UpdateIntegrationEndpoint/>}></Route>
        </Route>

          <Route path="Inventory" element={<InventoryHome/>}>
            <Route path="createInventory" element={<CreateInventory/>}></Route>
            <Route path="deleteInventory" element={<DeleteInventory/>}></Route>
            <Route path="findInventory" element={<FindInventory/>}></Route>
            <Route path="updateInventory" element={<UpdateInventory/>}></Route>
        </Route>

        <Route path="InventoryAvailability" element={<InventoryAvailabilityHome/>}>
            <Route path="createInventoryAvailability" element={<CreateInventoryAvailability/>}></Route>
        </Route>   

        <Route path="InventoryPosition" element={<InventoryPositionHome/>}>
            <Route path="createInventoryPosition" element={<CreateInventoryPosition/>}></Route>
            <Route path="deleteInventoryPosition" element={<DeleteInventoryPosition/>}></Route>
            <Route path="findInventoryPosition" element={<FindInventoryPosition/>}></Route>
            <Route path="findInventoryPositionById" element={<FindInventoryPositionById/>}></Route>
            <Route path="updateInventoryPosition" element={<UpdateInventoryPosition/>}></Route>
        </Route> 
          <Route path="KPIReport" element={<KPIReportHome/>}>
            <Route path="createKPIReport" element={<CreateKPIReport/>}></Route>
            <Route path="deleteKPIReport/:id" element={<DeleteKPIReport/>}></Route>
            <Route path="findKPIReportById" element={<FindKPIReportById/>}></Route>
            <Route path="findAllKPIReport" element={<FindAllKPIReport/>}></Route>
            <Route path="updateKPIReport/:id" element={<UpdateKPIReport/>}></Route>
        </Route> 

        <Route path="Location" element={<LocationHome/>}>
    <Route path="createLocation" element={<CreateLocation/>}/>
    <Route path="findLocation" element={<FindLocation/>}/>
    <Route path="findLocationById" element={<FindLocationById/>}/>
    <Route path="updateLocation/:lid" element={<UpdateLocation/>}/>
    <Route path="deleteLocation/:lid" element={<DeleteLocation/>}/>
</Route>
        <Route path="Notification" element={<NotificationHome/>}>
            <Route path="createNotification" element={<CreateNotification/>}></Route>
            <Route path="deleteNotification" element={<DeleteNotification/>}></Route>
            <Route path="findNotification" element={<FindNotification/>}></Route>
            <Route path="updateNotification" element={<UpdateNotification/>}></Route>
        </Route>

       <Route path="Order" element={<OrderHome/>}>
    <Route path="createOrder" element={<CreateOrder/>}/>
    <Route path="findOrder" element={<FindOrder/>}/>
    <Route path="findOrderById" element={<FindOrderById/>}/>
    <Route path="updateOrder/:oid" element={<UpdateOrder/>}/>
    <Route path="deleteOrder/:oid" element={<DeleteOrder/>}/>
</Route>

        <Route path="PriceList" element={<PriceListHome/>}>
            <Route path="createPriceList" element={<CreatePriceList/>}></Route>
            <Route path="deletePriceList" element={<DeletePriceList/>}></Route>
            <Route path="findPriceList" element={<FindPriceList/>}></Route>
            <Route path="updatePriceList" element={<UpdatePriceList/>}></Route>
        </Route>

        <Route path="Product" element={<ProductHome/>}>
            <Route path="createProduct" element={<CreateProduct/>}></Route>
            <Route path="deleteProduct" element={<DeleteProduct/>}></Route>
            <Route path="findProduct" element={<FindProduct/>}></Route>
            <Route path="updateProduct" element={<UpdateProduct/>}></Route>
        </Route>
    
       <Route path="Promotion" element={<PromotionHome/>}>
            <Route path="createPromotion" element={<CreatePromotion/>}></Route>
            <Route path="findPromotion" element={<FindPromotion/>}></Route>
        </Route>

        <Route path="PromotionType" element={<PromotionTypeHome/>}>
            <Route path="createPromotionType" element={<CreatePromotionType/>}></Route>
            <Route path="findPromotionType" element={<FindPromotionType/>}></Route>
        </Route>

         <Route path="Recommendation" element={<RecommendationHome/>}>
            <Route path="createRecommendation" element={<CreateRecommendation/>}/>
            <Route path="deleteRecommendation/:rid" element={<DeleteRecommendation/>}/>
            <Route path="findRecommendation" element={<FindRecommendation/>}/>
            <Route path="findRecommendationById" element={<FindRecommendationById/>}/>
            <Route path="updateRecommendation/:rid" element={<UpdateRecommendation/>}/>
            
        </Route>

        <Route path="Replenishment" element={<ReplenishmentHome/>}>
    <Route path="createReplenishment" element={<CreateReplenishment/>}/>
    <Route path="findReplenishment" element={<FindReplenishment/>}/>
    <Route path="findReplenishmentById" element={<FindReplenishmentById/>}/>
    <Route path="updateReplenishment/:rid" element={<UpdateReplenishment/>}/>
    <Route path="deleteReplenishment/:rid" element={<DeleteReplenishment/>}/>
</Route>

        <Route path="ReturnAuthorization" element={<ReturnAuthorizationHome/>}>
            <Route path="createReturnAuthorization" element={<CreateReturnAuthorization/>}></Route>
            <Route path="deleteReturnAuthorization/:id" element={<DeleteReturnAuthorization/>}></Route>
            <Route path="findReturnAuthorizationById" element={<FindReturnAuthorizationById/>}></Route>
            <Route path="findAllReturnAuthorization" element={<FindAllReturnAuthorization/>}></Route>
            <Route path="updateReturnAuthorization/:id" element={<UpdateReturnAuthorization/>}></Route>
        </Route>

         <Route path="Role" element={<RoleHome/>}>
            <Route path="createRole" element={<CreateRole/>}></Route>
            <Route path="deleteRole" element={<DeleteRole/>}></Route>
            <Route path="findRole" element={<FindRole/>}></Route>
        </Route>

        <Route path="User" element={<UserHome/>}>
            <Route path="createUser" element={<CreateUser/>}></Route>
            <Route path="deleteUser" element={<DeleteUser/>}></Route>
            <Route path="findUser" element={<FindUser/>}></Route>
            <Route path="updateUser" element={<UpdateUser/>}></Route>
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
