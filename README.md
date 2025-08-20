# AWS SAM Lambda Template (TypeScript)

Este proyecto es un template básico para crear funciones Lambda en TypeScript utilizando AWS SAM.

## Estructura del proyecto

```
.
├── src/
│   ├── application/
│   │   └── use-cases/
│   ├── domain/
│   │   └── models/
│   ├── infrastructure/
│   │   └── adapters/
│   ├── interfaces/
│   │   └── lambda/
│   │       └── handler.ts
│   └── shared/
├── template.yaml
├── tsconfig.json
├── package.json
└── README.md
```

## Comandos útiles

- `npm install` — Instala dependencias
- `npm run build` — Compila TypeScript a JavaScript
- `sam build` — Construye el proyecto SAM
- `sam local invoke` — Ejecuta la Lambda localmente
- `sam deploy --guided` — Despliega la aplicación

## Despliegue automatizado con GitHub Actions

El parámetro `StageName` se determina automáticamente a partir de la rama de GitHub. Así puedes tener entornos por rama (dev, staging, prod, etc.)

Ejemplo de job en `.github/workflows/deploy.yml`:

```yaml
name: Deploy SAM Lambda
on:
  push:
    branches:
      - "*"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Instalar dependencias
        run: npm install
      - name: Compilar
        run: npm run build
      - name: Instalar AWS SAM CLI
        uses: aws-actions/setup-sam@v2
      - name: Desplegar con SAM
        env:
          GITHUB_REF_NAME: ${{ github.ref_name }}
        run: |
          sam build
          sam deploy \
            --stack-name my-stack-${GITHUB_REF_NAME} \
            --parameter-overrides StageName=${GITHUB_REF_NAME} \
            --capabilities CAPABILITY_IAM
```

Esto creará un stack y un stage por cada rama (por ejemplo: `dev`, `main`, `feature/xyz`).

## Requisitos
- Node.js >= 16
- AWS SAM CLI

---

El entrypoint de la Lambda es `src/interfaces/lambda/handler.ts`.

Sigue la arquitectura hexagonal (Ports & Adapters) para separar dominio, casos de uso y adaptadores.
