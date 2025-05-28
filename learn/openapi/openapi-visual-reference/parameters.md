# Named Parameters

> An object to hold reusable [Parameter Objects](./parameter.md).

Declare named parameters in the components object.

> Holds a set of reusable objects for different aspects of the OAS. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.

```yaml
components:
  parameters:
    AnyNameYouWant:
      # Parameter Object
    AnotherNameYouWant:
      # Parameter Object
```

## Visuals

See the [Parameter Object](./parameter.md).

## Types

- `NamedParameters` is a map of `Parameter`


