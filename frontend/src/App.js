import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

import Login from './Login';
import Dashboard from './Dashboard';
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute';

import ForecastHome from './Forecast/components/ForecastHome';
import CreateForecast from './Forecast/components/CreateForecast';
import DeleteForecast from './Forecast/components/DeleteForecast';
import FindForecast from './Forecast/components/FindForecast';
import UpdateForecast from './Forecast/components/UpdateForecast';
import FindForecastById from './Forecast/components/FindForecastById';

import AuditLogHome from './AuditLog/components/AuditLogHome';
import FindAuditLog from './AuditLog/components/FindAuditLog';

import CustomerProfileHome from './CustomerProfile/components/CustomerProfileHome';
import CreateCustomerProfile from './CustomerProfile/components/CreateCustomerProfile';
import DeleteCustomerProfile from './CustomerProfile/components/DeleteCustomerProfile';
import UpdateCustomerProfile from './CustomerProfile/components/UpdateCustomerProfile';
import FindCustomerProfile from './CustomerProfile/components/FindCustomerProfile';
import FindCustomerProfileById from './CustomerProfile/components/FindCustomerProfileById';
import LoyaltyTierCalculator from './CustomerProfile/components/LoyaltyTierCalculator';
import CustomerHistory from './CustomerProfile/components/CustomerHistory';

import ExceptionEventHome from './ExceptionEvent/components/ExceptionEventHome';
import CreateExceptionEvent from './ExceptionEvent/components/CreateExceptionEvent';
import DeleteExceptionEvent from './ExceptionEvent/components/DeleteExceptionEvent';
import UpdateExceptionEvent from './ExceptionEvent/components/UpdateExceptionEvent';
import FindAllExceptionEvent from './ExceptionEvent/components/FindAllExceptionEvent';
import FindExceptionEventById from './ExceptionEvent/components/FindExceptionEventById';

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
import FindAllKPIReport from './KPIReport/components/FindAllKPIReport';

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
import FindOrderById from './Order/components/FindOrderById';

import PriceListHome from './PriceList/components/PriceListHome';
import CreatePriceList from './PriceList/components/CreatePriceList';
import FindPriceList from './PriceList/components/FindPriceList';
import FindPriceListById from './PriceList/components/FindPriceListById';
import UpdatePriceList from './PriceList/components/UpdatePriceList';
import DeletePriceList from './PriceList/components/DeletePriceList';

import PromotionHome from './Promotion/components/PromotionHome';
import CreatePromotion from './Promotion/components/CreatePromotion';
import FindPromotion from './Promotion/components/FindPromotion';
import UpdatePromotion from './Promotion/components/UpdatePromotion';
import FindPromotionById from './Promotion/components/FindPromotionById';
import DeletePromotion from './Promotion/components/DeletePromotion';

import PromotionTypeHome from './PromotionType/components/PromotionTypeHome';
import CreatePromotionType from './PromotionType/components/CreatePromotionType';
import FindPromotionType from './PromotionType/components/FindPromotionType';

import RecommendationHome from './Recommendation/components/RecommendationHome';
import CreateRecommendation from './Recommendation/components/CreateRecommendation';
import FindRecommendation from './Recommendation/components/FindRecommendation';
import UpdateRecommendation from './Recommendation/components/UpdateRecommendation';
import DeleteRecommendation from './Recommendation/components/DeleteRecommendation';
import FindRecommendationById from './Recommendation/components/FindRecommendationById';

import ReplenishmentHome from './Replenishment/components/ReplenishmentHome';
import CreateReplenishment from './Replenishment/components/CreateReplenishment';
import FindReplenishment from './Replenishment/components/FindReplenishment';
import UpdateReplenishment from './Replenishment/components/UpdateReplenishment';
import DeleteReplenishment from './Replenishment/components/DeleteReplenishment';
import FindReplenishmentById from './Replenishment/components/FindReplenishmentById';

import ReturnAuthorizationHome from './ReturnAuthorization/components/ReturnAuthorizationHome';
import CreateReturnAuthorization from './ReturnAuthorization/components/CreateReturnAuthorization';
import UpdateReturnAuthorization from './ReturnAuthorization/components/UpdateReturnAuthorization';
import DeleteReturnAuthorization from './ReturnAuthorization/components/DeleteReturnAuthorization';
import FindReturnAuthorizationById from './ReturnAuthorization/components/FindReturnAuthorizationById';
import FindAllReturnAuthorization from './ReturnAuthorization/components/FindAllReturnAuthorization';

import RoleHome from './Role/components/RoleHome';
import CreateRole from './Role/components/CreateRole';
import FindAllRole from './Role/components/FindAllRole';
import FindRoleById from './Role/components/FindRoleById';
import DeleteRole from './Role/components/DeleteRole';

import UserHome from './User/components/UserHome';
import CreateUser from './User/components/CreateUser';
import FindAllUser from './User/components/FindAllUser';
import UpdateUser from './User/components/UpdateUser';
import DeleteUser from './User/components/DeleteUser';
import FindUserById from './User/components/FindUserById';

import ProductHome from './Product/components/ProductHome';
import CreateProduct from './Product/components/CreateProduct';
import FindProduct from './Product/components/FindProduct';
import FindProductById from './Product/components/FindProductById';
import UpdateProduct from './Product/components/UpdateProduct';
import DeleteProduct from './Product/components/DeleteProduct';
import Register from './Register';
import SafetyStockCalculator from './Forecast/components/SafetyStockCalculator';
import GenerateReplenishment from './Replenishment/components/GenerateReplenishment';

function App() {
  return (
    <Router>
      <Routes>
        


        <Route path="/register" element={<Register />} />
        {/* ✅ Public Routes */}
        <Route path="/"      element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* ✅ Dashboard */}
        <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        {/* ✅ Forecast */}
        <Route path="Forecast" element={<ProtectedRoute><ForecastHome /></ProtectedRoute>}>
            <Route path="createForecast"       element={<CreateForecast />} />
            <Route path="deleteForecast/:fcid"       element={<DeleteForecast />} />
            <Route path="FindForecastById"     element={<FindForecastById />} />
            <Route path="findForecast"         element={<FindForecast />} />
            <Route path="updateForecast/:fcid" element={<UpdateForecast />} />
            <Route path="safetyStock"          element={<SafetyStockCalculator />} />
        </Route>

        {/* ✅ AuditLog */}
        <Route path="AuditLog" element={<ProtectedRoute><AuditLogHome /></ProtectedRoute>}>
            <Route path="findAuditLog" element={<FindAuditLog />} />
        </Route>

        {/* ✅ CustomerProfile */}
        <Route path="CustomerProfile" element={<ProtectedRoute><CustomerProfileHome /></ProtectedRoute>}>
            <Route path="createCustomerProfile"         element={<CreateCustomerProfile />} />
            <Route path="deleteCustomerProfile/:cpid"   element={<DeleteCustomerProfile />} />
            <Route path="findCustomerProfile"           element={<FindCustomerProfile />} />
            <Route path="updateCustomerProfile/:cpid"   element={<UpdateCustomerProfile />} />
            <Route path="findCustomerProfileById" element={<FindCustomerProfileById />} />
            <Route path="loyaltyTier"             element={<LoyaltyTierCalculator />} />
            <Route path="customerHistory"          element={<CustomerHistory />} />
        </Route>

        {/* ✅ ExceptionEvent */}
        <Route path="ExceptionEvent" element={<ProtectedRoute><ExceptionEventHome /></ProtectedRoute>}>
            <Route path="createExceptionEvent"     element={<CreateExceptionEvent />} />
            <Route path="deleteExceptionEvent/:id" element={<DeleteExceptionEvent />} />
            <Route path="findExceptionEventById"   element={<FindExceptionEventById />} />
            <Route path="updateExceptionEvent/:id" element={<UpdateExceptionEvent />} />
            <Route path="findAllExceptionEvent"    element={<FindAllExceptionEvent />} />
        </Route>

        {/* ✅ FulfillmentInstruction */}
        <Route path="FulfillmentInstruction" element={<ProtectedRoute><FulfillmentInstructionHome /></ProtectedRoute>}>
            <Route path="createFulfillmentInstruction" element={<CreateFulfillmentInstruction />} />
            <Route path="deleteFulfillmentInstruction" element={<DeleteFulfillmentInstruction />} />
            <Route path="findFulfillmentInstruction"   element={<FindFulfillmentInstruction />} />
            <Route path="updateFulfillmentInstruction" element={<UpdateFulfillmentInstruction />} />
        </Route>

        {/* ✅ IntegrationEndpoint */}
        <Route path="IntegrationEndpoint" element={<ProtectedRoute><IntegrationEndpointHome /></ProtectedRoute>}>
            <Route path="createIntegrationEndpoint" element={<CreateIntegrationEndpoint />} />
            <Route path="deleteIntegrationEndpoint" element={<DeleteIntegrationEndpoint />} />
            <Route path="findIntegrationEndpoint"   element={<FindIntegrationEndpoint />} />
            <Route path="updateIntegrationEndpoint" element={<UpdateIntegrationEndpoint />} />
        </Route>

        {/* ✅ Inventory */}
        <Route path="Inventory" element={<ProtectedRoute><InventoryHome /></ProtectedRoute>}>
            <Route path="createInventory"      element={<CreateInventory />} />
            <Route path="deleteInventory"      element={<DeleteInventory />} />
            <Route path="findInventory"        element={<FindInventory />} />
            <Route path="updateInventory/:eid" element={<UpdateInventory />} />
        </Route>

        {/* ✅ InventoryAvailability */}
        <Route path="InventoryAvailability" element={<ProtectedRoute><InventoryAvailabilityHome /></ProtectedRoute>}>
            <Route path="createInventoryAvailability" element={<CreateInventoryAvailability />} />
        </Route>

        <Route path="Product" element={<ProductHome/>}>
            <Route path="createProduct"     element={<CreateProduct/>}/>
            <Route path="findProduct"       element={<FindProduct/>}/>
            <Route path="editProduct/:id"   element={<UpdateProduct/>}/>
            <Route path="deleteProduct/:id" element={<DeleteProduct/>}/>
        </Route>
    
        
        {/* ✅ InventoryPosition */}
        <Route path="InventoryPosition" element={<ProtectedRoute><InventoryPositionHome /></ProtectedRoute>}>
            <Route path="createInventoryPosition"      element={<CreateInventoryPosition />} />
            <Route path="deleteInventoryPosition/:eid" element={<DeleteInventoryPosition />} />
            <Route path="findInventoryPosition"        element={<FindInventoryPosition />} />
            <Route path="findInventoryPositionById"    element={<FindInventoryPositionById />} />
            <Route path="updateInventoryPosition/:eid" element={<UpdateInventoryPosition />} />
        </Route>

        {/* ✅ KPIReport */}
        <Route path="KPIReport" element={<ProtectedRoute><KPIReportHome /></ProtectedRoute>}>
            <Route path="createKPIReport"     element={<CreateKPIReport />} />
            <Route path="deleteKPIReport/:id" element={<DeleteKPIReport />} />
            <Route path="findKPIReportById"   element={<FindKPIReportById />} />
            <Route path="findAllKPIReport"    element={<FindAllKPIReport />} />
            <Route path="updateKPIReport/:id" element={<UpdateKPIReport />} />
        </Route>

        {/* ✅ Location */}
        <Route path="Location" element={<ProtectedRoute><LocationHome /></ProtectedRoute>}>
            <Route path="createLocation"      element={<CreateLocation />} />
            <Route path="findLocation"        element={<FindLocation />} />
            <Route path="findLocationById"    element={<FindLocationById />} />
            <Route path="updateLocation/:lid" element={<UpdateLocation />} />
            <Route path="deleteLocation/:lid" element={<DeleteLocation />} />
        </Route>

        {/* ✅ Notification */}
        <Route path="Notification" element={<ProtectedRoute><NotificationHome /></ProtectedRoute>}>
            <Route path="createNotification" element={<CreateNotification />} />
            <Route path="deleteNotification" element={<DeleteNotification />} />
            <Route path="findNotification"   element={<FindNotification />} />
            <Route path="updateNotification" element={<UpdateNotification />} />
        </Route>

        {/* ✅ Order */}
        <Route path="Order" element={<ProtectedRoute><OrderHome /></ProtectedRoute>}>
            <Route path="createOrder"      element={<CreateOrder />} />
            <Route path="findOrder"        element={<FindOrder />} />
            <Route path="findOrderById"    element={<FindOrderById />} />
            <Route path="updateOrder/:oid" element={<UpdateOrder />} />
            <Route path="deleteOrder/:oid" element={<DeleteOrder />} />
        </Route>

        {/* ✅ PriceList */}
        <Route path="PriceList" element={<ProtectedRoute><PriceListHome /></ProtectedRoute>}>
            <Route path="createPriceList"     element={<CreatePriceList />} />
            <Route path="findPriceList"       element={<FindPriceList />} />
            <Route path="findPriceListById"   element={<FindPriceListById />} />
            <Route path="editPriceList/:id"   element={<UpdatePriceList />} />
            <Route path="deletePriceList/:id" element={<DeletePriceList />} />
        </Route>

        {/* ✅ Product */}
        <Route path="Product" element={<ProtectedRoute><ProductHome /></ProtectedRoute>}>
            <Route path="createProduct"     element={<CreateProduct />} />
            <Route path="findProduct"       element={<FindProduct />} />
            <Route path="findProductById"   element={<FindProductById />} />
            <Route path="editProduct/:id"   element={<UpdateProduct />} />
            <Route path="deleteProduct/:id" element={<DeleteProduct />} />
        </Route>

        {/* ✅ Promotion */}
        <Route path="Promotion" element={<ProtectedRoute><PromotionHome /></ProtectedRoute>}>
            <Route path="createPromotion"     element={<CreatePromotion />} />
            <Route path="findPromotion"       element={<FindPromotion />} />
            <Route path="findPromotionById"   element={<FindPromotionById />} />
            <Route path="editPromotion/:id"   element={<UpdatePromotion />} />
            <Route path="deletePromotion/:id" element={<DeletePromotion />} />
        </Route>

        {/* ✅ PromotionType */}
        <Route path="PromotionType" element={<ProtectedRoute><PromotionTypeHome /></ProtectedRoute>}>
            <Route path="createPromotionType" element={<CreatePromotionType />} />
            <Route path="findPromotionType"   element={<FindPromotionType />} />
        </Route>

        {/* ✅ Recommendation */}
        <Route path="Recommendation" element={<ProtectedRoute><RecommendationHome /></ProtectedRoute>}>
            <Route path="createRecommendation"      element={<CreateRecommendation />} />
            <Route path="deleteRecommendation/:rid" element={<DeleteRecommendation />} />
            <Route path="findRecommendation"        element={<FindRecommendation />} />
            <Route path="findRecommendationById"    element={<FindRecommendationById />} />
            <Route path="updateRecommendation/:rid" element={<UpdateRecommendation />} />
        </Route>

        {/* ✅ Replenishment */}
        <Route path="Replenishment" element={<ProtectedRoute><ReplenishmentHome /></ProtectedRoute>}>
            <Route path="createReplenishment"      element={<CreateReplenishment />} />
            <Route path="findReplenishment"        element={<FindReplenishment />} />
            <Route path="findReplenishmentById"    element={<FindReplenishmentById />} />
            <Route path="updateReplenishment/:rid" element={<UpdateReplenishment />} />
            <Route path="deleteReplenishment/:rid" element={<DeleteReplenishment />} />
             <Route path="generateReplenishment"    element={<GenerateReplenishment />} />
        </Route>

        {/* ✅ ReturnAuthorization */}
        <Route path="ReturnAuthorization" element={<ProtectedRoute><ReturnAuthorizationHome /></ProtectedRoute>}>
            <Route path="createReturnAuthorization"     element={<CreateReturnAuthorization />} />
            <Route path="deleteReturnAuthorization/:id" element={<DeleteReturnAuthorization />} />
            <Route path="findReturnAuthorizationById"   element={<FindReturnAuthorizationById />} />
            <Route path="findAllReturnAuthorization"    element={<FindAllReturnAuthorization />} />
            <Route path="updateReturnAuthorization/:id" element={<UpdateReturnAuthorization />} />
        </Route>

        {/* ✅ Role */}
        <Route path="Role" element={<ProtectedRoute><RoleHome /></ProtectedRoute>}>
            <Route path="createRole"     element={<CreateRole />} />
            <Route path="findAllRole"    element={<FindAllRole />} />
            <Route path="findRoleById"   element={<FindRoleById />} />
            <Route path="deleteRole/:id" element={<DeleteRole />} />
        </Route>

        {/* ✅ User */}
        <Route path="User" element={<ProtectedRoute><UserHome /></ProtectedRoute>}>
            <Route path="createUser"     element={<CreateUser />} />
            <Route path="deleteUser/:id" element={<DeleteUser />} />
            <Route path="findAllUser"    element={<FindAllUser />} />
            <Route path="editUser/:id"   element={<UpdateUser />} />
            <Route path="findUserById"   element={<FindUserById />} />
        </Route>

        {/* ✅ Catch all → redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;