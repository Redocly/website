## Using filter with collections

Use `?filter=` parameter on collections to retrieve a subset of the collection based on the provided filter.
Fields and values in the filter are separated with `:`.

Query structure:

- To use exact match, use `:`:

```
  ?filter=firstName:John
```

- To use substring match, use `~`:

```
  ?filter=firstName~Jo
```

- To use multiple values, use `,` as a separator of values:

```
?filter=firstName:John,Bob
?filter=status:success,pending
```

- To use range filter, use `..`:

```
?filter=amount:1..10
?filter=birthDate:1900-01-01T00:00:00.000Z..2000-01-01T00:00:00.000Z
```

- To negate the result of the filter, use `-`:

```
?filter=-firstName:John
```

- To use logical AND, use either `AND` operator (case-insensitive) or an empty string:

```
?filter=firstName:John AND isAdmin:true
```

- To use logical OR, use `OR` operator:

```
?filter=firstName:John OR lastName:Doe
```

- Datetime-based fields accept values formatted in the `ISO 8601` format:

```
?filter=createdTime:2021-02-14T13:30:000Z
```

- If you want to search for a value that contains a space, `,` or `..` operators, you need to wrap the value in quotes.
  You can escape quotes inside of quotes with a backslash `\`. Both single and double quotes are supported:

```
?filter=description:"The story called \"The Sky and the Sea.\""
```

- You do not need to wrap a `number`, `boolean` or `null` into quotes:

```
?filter=age:18
?filter=isAdmin:true
?filter=description:null
```
