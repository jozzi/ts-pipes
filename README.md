# Typed pipe

Allows to chain functions without nesting and provide methods to pipe both sync and async methods.
Preserves type information accross methods.

Inspired by RxJS pipe method

## Examples

Sync pipe method

```
pipe(    
    "5",
    arg => arg + 5,
    arg => parseInt(arg)
)

```

Async pipe method

```
(async (){

    const result = await pipeAsync(
        11,
        (arg) => new Promise<string>(resolve => {
            setTimeout(() => {
                resolve(arg * 10 + "px")
            }, 200);
        }), // "110px"
        (arg) => new Promise<string>(resolve => {
            setTimeout(() => {
                resolve(arg.substring(1,3))
            }, 200);
        }), // "110"
        (arg) => new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(parseInt(arg))
            }, 200);
        }) // 110
    )

    console.log(result) 
 })()
 ```
