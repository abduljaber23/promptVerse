# 📐 Diagramme de Séquence UML — Authentification JWT Natif (Sans Passport)

## 🎯 Périmètre du Flux
Ce diagramme détaille l'inscription (`/auth/register`), la connexion (`/auth/login`) et l'interception des requêtes protégées via un `AuthGuard` natif NestJS (sans Passport, sans OAuth).

---

## 📊 Diagramme Mermaid — Séquence Auth

```mermaid
sequenceDiagram
    autonumber
    actor Client as Client - React App
    participant AuthController as AuthController - NestJS
    participant AuthService as AuthService
    participant UsersRepository as UsersRepository - TypeORM
    participant JwtService as JwtService - NestJS
    participant AuthGuard as AuthGuard - NestJS
    participant DB as Database - MySQL

    %% === SCÉNARIO 1 : CONNEXION ===
    Note over Client, DB: Scénario 1 - Connexion POST /auth/login
    Client->>AuthController: POST /auth/login (email, password)
    AuthController->>AuthService: validateUserCredentials(email, password)
    AuthService->>UsersRepository: findOneBy({ email })
    UsersRepository->>DB: SELECT * FROM user WHERE email = ?
    DB-->>UsersRepository: User Record
    UsersRepository-->>AuthService: User Entity

    alt Identifiants Invalides
        AuthService->>AuthService: bcrypt.compare => false
        AuthService-->>AuthController: throw UnauthorizedException
        AuthController-->>Client: 401 Unauthorized
    else Identifiants Valides
        AuthService->>AuthService: bcrypt.compare => true
        AuthService->>JwtService: sign({ sub: userId, email, role })
        JwtService-->>AuthService: JWT Token String
        AuthService-->>AuthController: { accessToken, user }
        AuthController-->>Client: 200 OK { accessToken, user }
    end

    %% === SCÉNARIO 2 : REQUÊTE PROTÉGÉE ===
    Note over Client, DB: Scénario 2 - Requête Protégée GET /prompts/purchased
    Client->>AuthGuard: GET /prompts/purchased (Header: Authorization Bearer token)
    AuthGuard->>JwtService: verifyAsync(token, secret)
    
    alt Token Valide
        JwtService-->>AuthGuard: Payload { sub: 42, role: BUYER }
        AuthGuard->>AuthGuard: Attach payload to req.user
        AuthGuard->>AuthController: Forward request
        AuthController-->>Client: 200 OK [ Prompts Achetés ]
    else Token Invalide ou Expiré
        JwtService-->>AuthGuard: Error / Invalid Signature
        AuthGuard-->>Client: 401 Unauthorized
    end
```
