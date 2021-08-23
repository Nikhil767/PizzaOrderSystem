# Pizza Order System
- Two projects :
1. **PizzaAppApi** - for Backend .net core api's
Structure :
PizzaAppApi - will have api end points (controllers)
Domain - will have all Entities, DTO, Repository Interfaces
Service Interfaces - will have interface for services (Business logic)
Services - will have business logic & validation
Infrastructure - will have Repository layer
UniteTest - will have unit test for services


Api url are as follows : 
for getting SizeTypes (GET): https://localhost:44358/api/Lookup/sizetype
for getting SauceTypes (GET): https://localhost:44358/api/Lookup/saucetype
for getting ChesseTypes (GET): https://localhost:44358/api/Lookup/chessetype
for getting ToppingTypes (GET): https://localhost:44358/api/Lookup/toppingtype
for getting Dashboard content (GET): https://localhost:44358/api/Dashboard/dashboard
for getting Slider Content (GET): https://localhost:44358/api/Dashboard/slider
for Placing the Order (GET): https://localhost:44358/api/Order

unit testing covered for Services only with XUnit
also shared the postman collection file with input payloads (Pizaa Order Service.postman_collection.json)
before placing the order user need to provide emaild so data will be stored based on per emailid for per user

2. **pizza-app-client** - for angular [12] (frontend) UI
On client side there are following components:
AppComponent (Default)
SliderComponent - to show sliding on main page
OrderCartComponent - to show cart Amount on main page
DashBoardComponent - to grid on dashboard route
	- GridComponent - to show grid with multiple items
	- CardItemComponent - to show single item
CustomPizzaComponentComponent - to grid on custompizza route
	- CardItemComponent - to show single item
	
HttpService - service for calling Http requests
HelperService - service for calling passing data between components
Unit testing covered for services only