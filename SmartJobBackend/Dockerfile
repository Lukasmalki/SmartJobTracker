# 1️⃣ Välj officiell .NET SDK image för build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

# Set working directory
WORKDIR /app

# Kopiera csproj och restore dependencies först (cache)
COPY *.csproj ./
RUN dotnet restore

# Kopiera resten av koden
COPY . ./

# Bygg projektet i Release mode
RUN dotnet publish -c Release -o /app/publish

# 2️⃣ Bygg runtime image (mindre och snabbare)
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# Kopiera från build steget
COPY --from=build /app/publish .

# Exponera porten som Render använder
EXPOSE 10000

# Start command
ENTRYPOINT ["dotnet", "SmartJobBackend.dll"]