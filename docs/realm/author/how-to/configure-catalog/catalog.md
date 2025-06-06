---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# Configure catalogs

Use the catalog to access and manage your project's resources in one place.
The catalog feature requires no initial configuration.
However, you can customize it according to your needs

The default configuration includes several pre-configured catalogs:

- `all`: Shows all entities
- `services`: Shows only service entities
- `domains`: Shows only domain entities
- `teams`: Shows only team entities
- `users`: Shows only user entities
- `apiDescriptions`: Shows only API description entities


| Entity Name | Configuration Key | URL Path |
|-------------|------------|----------|
| All entities | `all` | `/catalog/all` |
| Services | `services` | `/catalog/services` |
| Domains | `domains` | `/catalog/domains` |
| Teams | `teams` | `/catalog/teams` |
| Users | `users` | `/catalog/users` |
| API Descriptions | `apiDescriptions` | `/catalog/apis` |

Some of the catalogs can be empty, if there are no entities of that type defined.

There are also default filters for each catalog:

- Domains - `domains`
- Owners - `owners`
- Tags - `tags`

