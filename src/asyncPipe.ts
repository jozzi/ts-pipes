
export interface AsyncOperatorFunction<T, R> {
    (source: T): Promise<R>
}

/**
 * Pipes initial values into passed async methods
 * @param initialValue 
 */
export async function pipeAsync<T>(initialValue: T): Promise<T>
export async function pipeAsync<T, A>(initialValue: T, op1: AsyncOperatorFunction<T, A>): Promise<A>
export async function pipeAsync<T, A, B>(initialValue: T, op1: AsyncOperatorFunction<T, A>, op2: AsyncOperatorFunction<A, B>): Promise<B>
export async function pipeAsync<T, A, B, C>(initialValue: T, op1: AsyncOperatorFunction<T, A>, op2: AsyncOperatorFunction<A, B>, op3: AsyncOperatorFunction<B, C>): Promise<C>
export async function pipeAsync<T, A, B, C, D>(initialValue: T, op1: AsyncOperatorFunction<T, A>, op2: AsyncOperatorFunction<A, B>, op3: AsyncOperatorFunction<B, C>, op4: AsyncOperatorFunction<C, D>): Promise<D>
export async function pipeAsync<T, A, B, C, D, E>(initialValue: T, op1: AsyncOperatorFunction<T, A>, op2: AsyncOperatorFunction<A, B>, op3: AsyncOperatorFunction<B, C>, op4: AsyncOperatorFunction<C, D>, op5: AsyncOperatorFunction<D, E>): Promise<E>
export async function pipeAsync<T, A, B, C, D, E, F>(initialValue: T, op1: AsyncOperatorFunction<T, A>, op2: AsyncOperatorFunction<A, B>, op3: AsyncOperatorFunction<B, C>, op4: AsyncOperatorFunction<C, D>, op5: AsyncOperatorFunction<D, E>, op6: AsyncOperatorFunction<E, F>): Promise<F>
export async function pipeAsync<T, A, B, C, D, E, F, G>(initialValue: T, op1: AsyncOperatorFunction<T, A>, op2: AsyncOperatorFunction<A, B>, op3: AsyncOperatorFunction<B, C>, op4: AsyncOperatorFunction<C, D>, op5: AsyncOperatorFunction<D, E>, op6: AsyncOperatorFunction<E, F>, op7: AsyncOperatorFunction<F, G>): Promise<G>
export async function pipeAsync<T, A, B, C, D, E, F, G, H>(initialValue: T, op1: AsyncOperatorFunction<T, A>, op2: AsyncOperatorFunction<A, B>, op3: AsyncOperatorFunction<B, C>, op4: AsyncOperatorFunction<C, D>, op5: AsyncOperatorFunction<D, E>, op6: AsyncOperatorFunction<E, F>, op7: AsyncOperatorFunction<F, G>, op8: AsyncOperatorFunction<G, H>): Promise<H>
export async function pipeAsync<T, A, B, C, D, E, F, G, H, I>(initialValue: T, op1: AsyncOperatorFunction<T, A>, op2: AsyncOperatorFunction<A, B>, op3: AsyncOperatorFunction<B, C>, op4: AsyncOperatorFunction<C, D>, op5: AsyncOperatorFunction<D, E>, op6: AsyncOperatorFunction<E, F>, op7: AsyncOperatorFunction<F, G>, op8: AsyncOperatorFunction<G, H>, op9: AsyncOperatorFunction<H, I>): Promise<I>
export async function pipeAsync<T, A, B, C, D, E, F, G, H, I>(initialValue: T, op1: AsyncOperatorFunction<T, A>, op2: AsyncOperatorFunction<A, B>, op3: AsyncOperatorFunction<B, C>, op4: AsyncOperatorFunction<C, D>, op5: AsyncOperatorFunction<D, E>, op6: AsyncOperatorFunction<E, F>, op7: AsyncOperatorFunction<F, G>, op8: AsyncOperatorFunction<G, H>, op9: AsyncOperatorFunction<H, I>, ...operations: AsyncOperatorFunction<any, any>[]): Promise<{}>
/* tslint:enable:max-line-length */
export async function pipeAsync(initialValue: any, ...operations: AsyncOperatorFunction<any, any>[]): Promise<any> {
    const steps = Array.from(operations);

    return function asyncpipe(arg: any) {

        return steps.reduce(
            (result, nextStep) => result.then(nextStep), 
            Promise.resolve(arg)
        );
    }(initialValue)
}