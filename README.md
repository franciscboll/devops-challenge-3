# DevOps Challenge -- Parte 3

## 📋 Descripción del repositorio

Este repositorio implementa un pipeline CI/CD automatizado que construye, analiza y despliega una aplicación Node.js en un clúster Amazon EKS, utilizando GitHub Actions, Docker, ECR y Helm.

------------------------------------------------------------------------

## 📁 Estructura del repositorio

    .
    ├── app/                     # Código fuente de la aplicación
    │   ├── Dockerfile
    │   ├── index.js
    │   ├── package.json
    │   └── test.js
    │
    ├── deploy/                  # Despliegue mediante Helm
    │   └── helm/
    │       ├── Chart.yaml
    │       ├── values.yaml
    │       └── templates/
    │           ├── deployment.yaml
    │           ├── service.yaml
    │           └── ingress.yaml
    │
    └── .github/
        └── workflows/
            └── cicd.yaml        # Pipeline principal

------------------------------------------------------------------------

## ⚙️ Pipeline CI/CD

El pipeline se compone de **tres etapas principales:**

1.  **Tests:** ejecución de pruebas unitarias básicas.
2.  **Build + Scan + Push:** construcción de imagen, escaneo con Grype y
    publicación en ECR.
3.  **Deploy con Helm:** despliegue en el clúster EKS con rollback
    automático en caso de error.

Incluye además ejecución **manual** desde la pestaña *Actions*
(workflow_dispatch).

------------------------------------------------------------------------

## 🧩 Flujo funcional

	1.	Commit / Pull Request:
GitHub Actions se activa automáticamente con cada cambio en main.
	2.	Tests automáticos:
Se ejecutan pruebas básicas (npm test) para validar la app antes del build.
	3.	Build y escaneo de imagen:
	•	Docker genera la imagen con Dockerfile dentro de app/.
	•	La imagen se etiqueta como appname-<commit> y se analiza con Grype en busca de vulnerabilidades.
	4.	Publicación en ECR:
La imagen aprobada se sube al Amazon Elastic Container Registry.
	5.	Despliegue en EKS con Helm:
Helm actualiza el release en el clúster EKS, inyectando la nueva imagen y tag.
Usa --atomic para revertir automáticamente si el rollout falla.
	6.	Rollback automático:
Si el nuevo pod no pasa el readinessProbe, Helm revierte la versión anterior sin intervención manual.

------------------------------------------------------------------------

## 🧠 Conclusión

Un pipeline completo y automatizado capaz de:
	•	Ejecutar pruebas unitarias.
	•	Construir, escanear y publicar imágenes Docker.
	•	Desplegar en Kubernetes con rollback garantizado.
	•	Mantener un flujo CI/CD reproducible y seguro.


------------------------------------------------------------------------
