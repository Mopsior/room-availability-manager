# Room Availability Manager

## Folder Structure
`/app` - normal next /app router. Don't have any components or things other than actual page

`/features` - structure for all local utils: if component is not whole project-wide, you put it here - structure:

```yaml
features/<page name>/                    
                    <feature name>/components/    # components for specific feature
                    _components/                  # components for specific route, but not whole app
```

`/styles` - all styles (for easier themeing)
```yaml
styles/
        variables.css         # global file
        /<page name>/... -    # this same folder structure as in /features. Uses this same name as component with .module.css suffix
```

`/hooks` & `/lib` - made by libraries (shadcn and tailwind)

`/utils` - firebase & context

## Paths
`@shadcn/*` -> `components/ui/*`

`@fb/*` -> `utils/firebase/*`

`@fb` -> `./utils/firebase/firebase.ts`