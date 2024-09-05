# Template engine
Este es un *Template engine* que construí entender el funcionamiento de algunos *template engines* como [Handlebars]("https://handlebarsjs.com/"), [EJS](https://ejs.co/), etc.

## Uso
Para usar este template-engine, se debe contar con un **template** en formato **HTML**. Las variables deben especificarse de la siguiente manera:

```
<h1>Mi variable: **variable_name**</h1>
```
> variable_name: Nombre de la variable

Luego, para compilar el template con un valor, se debe llamar a **compile**:

```
import { compile } from ("mirtemplates") //in ES modules

compile(template, objWithValues)
```
- **template**: Debera contener el template en formato HTML
- **objWithValues**: Objeto con el formato *{varName: varValue}*. Debera contener el nombre de la variable y su valor.
