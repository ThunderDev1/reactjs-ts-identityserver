# reactjs-ts-identityserver
Demo project for using Identity Server with React.js SPA and TypeScript

![Demo Gif](https://statics.blob.core.windows.net/public/reactjs-ts-identityserver2.gif)

The project is in 3 parts:

#### IdentityServer (http://localhost:5000)

Based off the IdentityServer4 samples, it uses uses ASP.NET Identity for identity management. You'll need to create the database (instructions bellow) to begin creating user accounts.

#### Spa (http://localhost:5100)

A single page application made with React, TypeScript and Webpack. Uses [redux-oidc](https://github.com/maxmantz/redux-oidc) package for managing authentication.

Note: I'm no longer using hash router, webpack dev server is configured to redirect all pages to index.html.
When deploying to production, you will need a similar mecanism for the callback page to work (this can easily be done using Netlify or Firebase hosting).

#### Api (http://localhost:5200)

Based off the `dotnet new webapi` template. Has a global authorize filter.


### Stuff to install

Dotnet Core 3.0 SDK  
Node.js  
SQL Server express

### Running the project

Clone repository

Add a secrets.json file in IdentityServer folder with the following (replace user id and password):
```
{
    "ConnectionStrings": {
      "DefaultConnection": "Server=(local);Database=AspIdentity;MultipleActiveResultSets=true;user id=*****;password=*****;"
    }
}
```

Open a command prompt in project location:

`cd Spa`

`yarn`

`yarn serve`


In a second command prompt:

`cd IdentityServer`

`dotnet ef database update`

`dotnet run`

In a third command prompt:


`cd Api`

`dotnet run`

Go to identity server (http://localhost:5000) create an account then go to the single page app (http://localhost:5100)

You may need to change the environment variable on each project, either
* run `set ASPNETCORE_ENVIRONMENT=Development` in Windows cmd terminal
* run `$Env:ASPNETCORE_ENVIRONMENT = "Development"` in Windows powershell terminal
* run `ASPNETCORE_ENVIRONMENT=Development` in Linux bash

### Credits

* [IdentityServer4.Samples](https://github.com/IdentityServer/IdentityServer4.Samples)
* [Dotnet core templates](https://github.com/aspnet/JavaScriptServices) 
* [redux-oidc](https://github.com/maxmantz/redux-oidc)
