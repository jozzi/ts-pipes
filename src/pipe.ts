/**
 * Allows to pipe value into series of methods
 * @author: Jozef Radonak
 * @license: MIT 
 */

export interface UnaryFunction<T, R> {
    (source: T): R;
}
export interface OperatorFunction<T, R> extends UnaryFunction<T, R> { }




// Heavily inspired by RxJS pipe method

/**
 * Pipes initial values into passed synchronous methods
 * @param initialValue 
 */
export function pipe<T>(initialValue: T): T
export function pipe<T, A>(initialValue: T, op1: OperatorFunction<T, A>): A
export function pipe<T, A, B>(initialValue: T, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): B
export function pipe<T, A, B, C>(initialValue: T, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): C
export function pipe<T, A, B, C, D>(initialValue: T, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): D
export function pipe<T, A, B, C, D, E>(initialValue: T, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): E
export function pipe<T, A, B, C, D, E, F>(initialValue: T, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): F
export function pipe<T, A, B, C, D, E, F, G>(initialValue: T, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): G
export function pipe<T, A, B, C, D, E, F, G, H>(initialValue: T, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): H
export function pipe<T, A, B, C, D, E, F, G, H, I>(initialValue: T, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): I
export function pipe<T, A, B, C, D, E, F, G, H, I>(initialValue: T, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): {}
/* tslint:enable:max-line-length */
export function pipe(initialValue: any, ...operations: OperatorFunction<any, any>[]): any {
    if (operations.length === 0) {
        return initialValue;
    }

    return pipeFromArray(operations)(initialValue);
}

function pipeFromArray<T, R>(fns: UnaryFunction<T, R>[]): UnaryFunction<T, R> {
    if (!fns) {
        return function () { } as UnaryFunction<any, any>;
    }

    if (fns.length === 1) {
        return fns[0];
    }

    return function piped(input: T): R {
        return fns.reduce((prev: any, fn: UnaryFunction<T, R>) => fn(prev), input as any);
    };
}
