# Git Flow XTREME-GYM

## Ramas base permanentes

- `main` → Producción estable. Solo recibe merges desde `development` (o hotfixes urgentes).
- `development` → Integración de nuevas features y fixes antes de pasar a producción.

**Regla:** Nunca se eliminan `main` ni `development`.

---

## Ramas temporales para desarrollo

Puedes crear ramas temporales **siempre desde** `development`

| **Tipo de rama** | **Prefijo** | **Uso** |
| --- | --- | --- |
| **Feature** | `feature/` | Nueva funcionalidad. Ej: `feature/create-endpoint` |
| **Fix** | `fix/` | Corrección de bug no crítico. Ej: `fix/role-validation` |
| **Hotfix** | `hotfix/` | Corrección urgente en producción (parte desde `main`). Ej: `hotfix/login-crash` |
| **Refactor** | `refactor/` | Mejora interna sin cambiar funcionalidad. Ej: `refactor/user-service` |

## Flujo de trabajo por tarea de Jira

### 1. Crear rama temporal

```bash
# Crear rama feature desde development
git switch develop
git pull origin develop

# 2. Crear rama temporal con ID de Jira
git switch -c feature/create-dashboard

# 3. Crear commit vacío
git commit --allow-empty -m "SCRUM-1: create-dashboard"

# 4. Subir la rama
git push origin feature/create-dashboard
```

---

### 2. Crear Pull Request

- **Base:** `development`
- **Compare:** `feature/SCRUM-1-create-dashboard`
- Reglas:
- ✅ Code Review obligatorio
- ✅ Merge solo si todo está aprobado

---

### 3. Trabajar en la tarea

```bash
# Agregar cambios reales
git add .
git commit -m "feat: implement create and get_all functions in crud"
git push origin feature/SCRUM-1-create-dashboard
```

---

### 4. Merge y limpieza

- Merge a `development`.
- Eliminar la rama temporal (`Delete branch` en GitHub).
- Nunca borrar `main` ni `development`.

---

## Convención de commits

Formato:

```bash
<type>: <short description in lowercase>
```

Tipos comunes:

- `feat` → Nueva funcionalidad
- `fix` → Corrección de bug
- `refactor` → Mejora interna
- `test` → Tests
- `docs` → Documentación
- `chore` → Configuración/tareas menores
- `style` → Formato de código
- `perf` → Mejora de rendimiento
- `ci` → Cambios en CI/CD
- `build` → Sistema de build o dependencias
- `revert` → Revertir commit