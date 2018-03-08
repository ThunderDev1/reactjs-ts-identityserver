# reactjs-ts-identityserver
Demo project for using Identity Server with React.js SPA and TypeScript

The identity server project uses ASP.NET Identity for identity management.


### Stuff to install

Dotnet Core 2.0 SDK  
Node.js  
SQL Server (or at least LocalDb)

### Running the project

Clone repository

Open a command prompt in project location:

`cd Spa`

`npm install`

`dotnet run`


In a second command prompt:

`cd IdentityServer`

`dotnet ef database update`

`dotnet run`

In a third command prompt:


`cd Api`

`dotnet run`

Go to identity server (http://localhost:5000) create an account then go to the single page app (http://localhost:5100)

### Credits

* [IdentityServer4.Samples](https://github.com/IdentityServer/IdentityServer4.Samples)
* [Dotnet core templates](https://github.com/aspnet/JavaScriptServices) 
* [redux-oidc](https://github.com/maxmantz/redux-oidc)
