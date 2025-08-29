# AsyncAPI extension: `x-tagGroups`

Redoc uses tags as navigation groupings, so channels with the same tag are shown in the same section of the API reference documentation.
The `x-tagGroups` feature adds an additional layer of navigation above the tags, allowing more granularity.
Declare each group with a name, and add the tags to the group.

{% admonition type="warning" name="Group all tags" %}
The `x-tagGroups` feature forms the top level navigation for the API documentation.
Any tag that is not in a group will not be included in the output.

**Add all tags to a group in order to include them in the documentation.**
{% /admonition %}

Adding a navigation layer using `x-tagGroups` is particularly useful in making larger or combined APIs' documentation more navigable for users.

## Location

The `x-tagGroups` extension is used at the top level of an AsyncAPI description.

## Options

{% table %}

- Option
- Type
- Description

---

- x-tagGroups
- [ [TagGroup Object](#taggroup-object) ]
- A list of tag groups.

{% /table %}

### TagGroup object

{% table %}

- Option
- Type
- Description

---

- name
- string
- The display name for the tag, used in the navigation bar and as a section heading.

---

- tags
- [ string ]
- List of tags to include in this group.

{% /table %}

## Examples

The following example shows how to organize tags into logical groups.
The `x-tagGroups` extension is used to separate core ride operations from supporting services.

```yaml
asyncapi: 3.0.0
components:
  tags:
    Rides:
      name: Rides
      description: Core ride lifecycle events and status updates
    Payments:
      name: Payments
      description: Financial transaction events and payment processing
    Notifications:
      name: Notifications
      description: Real-time notifications for drivers and passengers

x-tagGroups:
 - name: Core Services
   tags:
    - Rides
    - Payments
 - name: Communication
   tags:
    - Notifications
```
The navigation in the API reference documentation using this `x-tagGroups` configuration will have the following structure:

- Core Services
  - Rides
  - Payments
- Communication
  - Notifications

## Resources

- See a full [list of supported AsyncAPI extensions](./index.md).
