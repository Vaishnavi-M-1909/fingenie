
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Chat
 * 
 */
export type Chat = $Result.DefaultSelection<Prisma.$ChatPayload>
/**
 * Model BankAccount
 * 
 */
export type BankAccount = $Result.DefaultSelection<Prisma.$BankAccountPayload>
/**
 * Model Statement
 * 
 */
export type Statement = $Result.DefaultSelection<Prisma.$StatementPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Insight
 * 
 */
export type Insight = $Result.DefaultSelection<Prisma.$InsightPayload>
/**
 * Model MerchantMap
 * 
 */
export type MerchantMap = $Result.DefaultSelection<Prisma.$MerchantMapPayload>
/**
 * Model LearningResource
 * 
 */
export type LearningResource = $Result.DefaultSelection<Prisma.$LearningResourcePayload>
/**
 * Model ResourceInteraction
 * 
 */
export type ResourceInteraction = $Result.DefaultSelection<Prisma.$ResourceInteractionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chat`: Exposes CRUD operations for the **Chat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chats
    * const chats = await prisma.chat.findMany()
    * ```
    */
  get chat(): Prisma.ChatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bankAccount`: Exposes CRUD operations for the **BankAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BankAccounts
    * const bankAccounts = await prisma.bankAccount.findMany()
    * ```
    */
  get bankAccount(): Prisma.BankAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.statement`: Exposes CRUD operations for the **Statement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Statements
    * const statements = await prisma.statement.findMany()
    * ```
    */
  get statement(): Prisma.StatementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.insight`: Exposes CRUD operations for the **Insight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Insights
    * const insights = await prisma.insight.findMany()
    * ```
    */
  get insight(): Prisma.InsightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.merchantMap`: Exposes CRUD operations for the **MerchantMap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MerchantMaps
    * const merchantMaps = await prisma.merchantMap.findMany()
    * ```
    */
  get merchantMap(): Prisma.MerchantMapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningResource`: Exposes CRUD operations for the **LearningResource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningResources
    * const learningResources = await prisma.learningResource.findMany()
    * ```
    */
  get learningResource(): Prisma.LearningResourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resourceInteraction`: Exposes CRUD operations for the **ResourceInteraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResourceInteractions
    * const resourceInteractions = await prisma.resourceInteraction.findMany()
    * ```
    */
  get resourceInteraction(): Prisma.ResourceInteractionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Chat: 'Chat',
    BankAccount: 'BankAccount',
    Statement: 'Statement',
    Transaction: 'Transaction',
    Insight: 'Insight',
    MerchantMap: 'MerchantMap',
    LearningResource: 'LearningResource',
    ResourceInteraction: 'ResourceInteraction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "chat" | "bankAccount" | "statement" | "transaction" | "insight" | "merchantMap" | "learningResource" | "resourceInteraction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Chat: {
        payload: Prisma.$ChatPayload<ExtArgs>
        fields: Prisma.ChatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          findFirst: {
            args: Prisma.ChatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          findMany: {
            args: Prisma.ChatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[]
          }
          create: {
            args: Prisma.ChatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          createMany: {
            args: Prisma.ChatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[]
          }
          delete: {
            args: Prisma.ChatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          update: {
            args: Prisma.ChatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          deleteMany: {
            args: Prisma.ChatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[]
          }
          upsert: {
            args: Prisma.ChatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          aggregate: {
            args: Prisma.ChatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChat>
          }
          groupBy: {
            args: Prisma.ChatGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatCountArgs<ExtArgs>
            result: $Utils.Optional<ChatCountAggregateOutputType> | number
          }
        }
      }
      BankAccount: {
        payload: Prisma.$BankAccountPayload<ExtArgs>
        fields: Prisma.BankAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BankAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BankAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          findFirst: {
            args: Prisma.BankAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BankAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          findMany: {
            args: Prisma.BankAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>[]
          }
          create: {
            args: Prisma.BankAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          createMany: {
            args: Prisma.BankAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BankAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>[]
          }
          delete: {
            args: Prisma.BankAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          update: {
            args: Prisma.BankAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          deleteMany: {
            args: Prisma.BankAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BankAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BankAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>[]
          }
          upsert: {
            args: Prisma.BankAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankAccountPayload>
          }
          aggregate: {
            args: Prisma.BankAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBankAccount>
          }
          groupBy: {
            args: Prisma.BankAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<BankAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.BankAccountCountArgs<ExtArgs>
            result: $Utils.Optional<BankAccountCountAggregateOutputType> | number
          }
        }
      }
      Statement: {
        payload: Prisma.$StatementPayload<ExtArgs>
        fields: Prisma.StatementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          findFirst: {
            args: Prisma.StatementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          findMany: {
            args: Prisma.StatementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>[]
          }
          create: {
            args: Prisma.StatementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          createMany: {
            args: Prisma.StatementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StatementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>[]
          }
          delete: {
            args: Prisma.StatementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          update: {
            args: Prisma.StatementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          deleteMany: {
            args: Prisma.StatementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StatementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>[]
          }
          upsert: {
            args: Prisma.StatementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          aggregate: {
            args: Prisma.StatementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatement>
          }
          groupBy: {
            args: Prisma.StatementGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatementGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatementCountArgs<ExtArgs>
            result: $Utils.Optional<StatementCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Insight: {
        payload: Prisma.$InsightPayload<ExtArgs>
        fields: Prisma.InsightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InsightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InsightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          findFirst: {
            args: Prisma.InsightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InsightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          findMany: {
            args: Prisma.InsightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>[]
          }
          create: {
            args: Prisma.InsightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          createMany: {
            args: Prisma.InsightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InsightCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>[]
          }
          delete: {
            args: Prisma.InsightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          update: {
            args: Prisma.InsightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          deleteMany: {
            args: Prisma.InsightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InsightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InsightUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>[]
          }
          upsert: {
            args: Prisma.InsightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          aggregate: {
            args: Prisma.InsightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInsight>
          }
          groupBy: {
            args: Prisma.InsightGroupByArgs<ExtArgs>
            result: $Utils.Optional<InsightGroupByOutputType>[]
          }
          count: {
            args: Prisma.InsightCountArgs<ExtArgs>
            result: $Utils.Optional<InsightCountAggregateOutputType> | number
          }
        }
      }
      MerchantMap: {
        payload: Prisma.$MerchantMapPayload<ExtArgs>
        fields: Prisma.MerchantMapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MerchantMapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MerchantMapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload>
          }
          findFirst: {
            args: Prisma.MerchantMapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MerchantMapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload>
          }
          findMany: {
            args: Prisma.MerchantMapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload>[]
          }
          create: {
            args: Prisma.MerchantMapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload>
          }
          createMany: {
            args: Prisma.MerchantMapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MerchantMapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload>[]
          }
          delete: {
            args: Prisma.MerchantMapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload>
          }
          update: {
            args: Prisma.MerchantMapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload>
          }
          deleteMany: {
            args: Prisma.MerchantMapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MerchantMapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MerchantMapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload>[]
          }
          upsert: {
            args: Prisma.MerchantMapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantMapPayload>
          }
          aggregate: {
            args: Prisma.MerchantMapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMerchantMap>
          }
          groupBy: {
            args: Prisma.MerchantMapGroupByArgs<ExtArgs>
            result: $Utils.Optional<MerchantMapGroupByOutputType>[]
          }
          count: {
            args: Prisma.MerchantMapCountArgs<ExtArgs>
            result: $Utils.Optional<MerchantMapCountAggregateOutputType> | number
          }
        }
      }
      LearningResource: {
        payload: Prisma.$LearningResourcePayload<ExtArgs>
        fields: Prisma.LearningResourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningResourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningResourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload>
          }
          findFirst: {
            args: Prisma.LearningResourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningResourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload>
          }
          findMany: {
            args: Prisma.LearningResourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload>[]
          }
          create: {
            args: Prisma.LearningResourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload>
          }
          createMany: {
            args: Prisma.LearningResourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningResourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload>[]
          }
          delete: {
            args: Prisma.LearningResourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload>
          }
          update: {
            args: Prisma.LearningResourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload>
          }
          deleteMany: {
            args: Prisma.LearningResourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningResourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningResourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload>[]
          }
          upsert: {
            args: Prisma.LearningResourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningResourcePayload>
          }
          aggregate: {
            args: Prisma.LearningResourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningResource>
          }
          groupBy: {
            args: Prisma.LearningResourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningResourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningResourceCountArgs<ExtArgs>
            result: $Utils.Optional<LearningResourceCountAggregateOutputType> | number
          }
        }
      }
      ResourceInteraction: {
        payload: Prisma.$ResourceInteractionPayload<ExtArgs>
        fields: Prisma.ResourceInteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceInteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceInteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload>
          }
          findFirst: {
            args: Prisma.ResourceInteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceInteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload>
          }
          findMany: {
            args: Prisma.ResourceInteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload>[]
          }
          create: {
            args: Prisma.ResourceInteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload>
          }
          createMany: {
            args: Prisma.ResourceInteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceInteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload>[]
          }
          delete: {
            args: Prisma.ResourceInteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload>
          }
          update: {
            args: Prisma.ResourceInteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload>
          }
          deleteMany: {
            args: Prisma.ResourceInteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceInteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceInteractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload>[]
          }
          upsert: {
            args: Prisma.ResourceInteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceInteractionPayload>
          }
          aggregate: {
            args: Prisma.ResourceInteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResourceInteraction>
          }
          groupBy: {
            args: Prisma.ResourceInteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceInteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceInteractionCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceInteractionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    chat?: ChatOmit
    bankAccount?: BankAccountOmit
    statement?: StatementOmit
    transaction?: TransactionOmit
    insight?: InsightOmit
    merchantMap?: MerchantMapOmit
    learningResource?: LearningResourceOmit
    resourceInteraction?: ResourceInteractionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    statements: number
    transactions: number
    insights: number
    chats: number
    bankAccounts: number
    resourceInteractions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statements?: boolean | UserCountOutputTypeCountStatementsArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    insights?: boolean | UserCountOutputTypeCountInsightsArgs
    chats?: boolean | UserCountOutputTypeCountChatsArgs
    bankAccounts?: boolean | UserCountOutputTypeCountBankAccountsArgs
    resourceInteractions?: boolean | UserCountOutputTypeCountResourceInteractionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStatementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInsightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsightWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBankAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankAccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResourceInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceInteractionWhereInput
  }


  /**
   * Count Type BankAccountCountOutputType
   */

  export type BankAccountCountOutputType = {
    statements: number
  }

  export type BankAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statements?: boolean | BankAccountCountOutputTypeCountStatementsArgs
  }

  // Custom InputTypes
  /**
   * BankAccountCountOutputType without action
   */
  export type BankAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccountCountOutputType
     */
    select?: BankAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BankAccountCountOutputType without action
   */
  export type BankAccountCountOutputTypeCountStatementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatementWhereInput
  }


  /**
   * Count Type StatementCountOutputType
   */

  export type StatementCountOutputType = {
    transactions: number
    insights: number
  }

  export type StatementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | StatementCountOutputTypeCountTransactionsArgs
    insights?: boolean | StatementCountOutputTypeCountInsightsArgs
  }

  // Custom InputTypes
  /**
   * StatementCountOutputType without action
   */
  export type StatementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementCountOutputType
     */
    select?: StatementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StatementCountOutputType without action
   */
  export type StatementCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * StatementCountOutputType without action
   */
  export type StatementCountOutputTypeCountInsightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsightWhereInput
  }


  /**
   * Count Type LearningResourceCountOutputType
   */

  export type LearningResourceCountOutputType = {
    interactions: number
  }

  export type LearningResourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interactions?: boolean | LearningResourceCountOutputTypeCountInteractionsArgs
  }

  // Custom InputTypes
  /**
   * LearningResourceCountOutputType without action
   */
  export type LearningResourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResourceCountOutputType
     */
    select?: LearningResourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LearningResourceCountOutputType without action
   */
  export type LearningResourceCountOutputTypeCountInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceInteractionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    avatarUrl: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    avatarUrl: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    statements?: boolean | User$statementsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    insights?: boolean | User$insightsArgs<ExtArgs>
    chats?: boolean | User$chatsArgs<ExtArgs>
    bankAccounts?: boolean | User$bankAccountsArgs<ExtArgs>
    resourceInteractions?: boolean | User$resourceInteractionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "avatarUrl" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statements?: boolean | User$statementsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    insights?: boolean | User$insightsArgs<ExtArgs>
    chats?: boolean | User$chatsArgs<ExtArgs>
    bankAccounts?: boolean | User$bankAccountsArgs<ExtArgs>
    resourceInteractions?: boolean | User$resourceInteractionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      statements: Prisma.$StatementPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      insights: Prisma.$InsightPayload<ExtArgs>[]
      chats: Prisma.$ChatPayload<ExtArgs>[]
      bankAccounts: Prisma.$BankAccountPayload<ExtArgs>[]
      resourceInteractions: Prisma.$ResourceInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      avatarUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    statements<T extends User$statementsArgs<ExtArgs> = {}>(args?: Subset<T, User$statementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    insights<T extends User$insightsArgs<ExtArgs> = {}>(args?: Subset<T, User$insightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chats<T extends User$chatsArgs<ExtArgs> = {}>(args?: Subset<T, User$chatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bankAccounts<T extends User$bankAccountsArgs<ExtArgs> = {}>(args?: Subset<T, User$bankAccountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resourceInteractions<T extends User$resourceInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, User$resourceInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.statements
   */
  export type User$statementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    where?: StatementWhereInput
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    cursor?: StatementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StatementScalarFieldEnum | StatementScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.insights
   */
  export type User$insightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    where?: InsightWhereInput
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    cursor?: InsightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InsightScalarFieldEnum | InsightScalarFieldEnum[]
  }

  /**
   * User.chats
   */
  export type User$chatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    where?: ChatWhereInput
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    cursor?: ChatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * User.bankAccounts
   */
  export type User$bankAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    where?: BankAccountWhereInput
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    cursor?: BankAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BankAccountScalarFieldEnum | BankAccountScalarFieldEnum[]
  }

  /**
   * User.resourceInteractions
   */
  export type User$resourceInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    where?: ResourceInteractionWhereInput
    orderBy?: ResourceInteractionOrderByWithRelationInput | ResourceInteractionOrderByWithRelationInput[]
    cursor?: ResourceInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceInteractionScalarFieldEnum | ResourceInteractionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Chat
   */

  export type AggregateChat = {
    _count: ChatCountAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  export type ChatMinAggregateOutputType = {
    id: string | null
    userId: string | null
    role: string | null
    content: string | null
    imageUrl: string | null
    createdAt: Date | null
  }

  export type ChatMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    role: string | null
    content: string | null
    imageUrl: string | null
    createdAt: Date | null
  }

  export type ChatCountAggregateOutputType = {
    id: number
    userId: number
    role: number
    content: number
    imageUrl: number
    recommendations: number
    createdAt: number
    _all: number
  }


  export type ChatMinAggregateInputType = {
    id?: true
    userId?: true
    role?: true
    content?: true
    imageUrl?: true
    createdAt?: true
  }

  export type ChatMaxAggregateInputType = {
    id?: true
    userId?: true
    role?: true
    content?: true
    imageUrl?: true
    createdAt?: true
  }

  export type ChatCountAggregateInputType = {
    id?: true
    userId?: true
    role?: true
    content?: true
    imageUrl?: true
    recommendations?: true
    createdAt?: true
    _all?: true
  }

  export type ChatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chat to aggregate.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Chats
    **/
    _count?: true | ChatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMaxAggregateInputType
  }

  export type GetChatAggregateType<T extends ChatAggregateArgs> = {
        [P in keyof T & keyof AggregateChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChat[P]>
      : GetScalarType<T[P], AggregateChat[P]>
  }




  export type ChatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatWhereInput
    orderBy?: ChatOrderByWithAggregationInput | ChatOrderByWithAggregationInput[]
    by: ChatScalarFieldEnum[] | ChatScalarFieldEnum
    having?: ChatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatCountAggregateInputType | true
    _min?: ChatMinAggregateInputType
    _max?: ChatMaxAggregateInputType
  }

  export type ChatGroupByOutputType = {
    id: string
    userId: string
    role: string
    content: string
    imageUrl: string | null
    recommendations: JsonValue | null
    createdAt: Date
    _count: ChatCountAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  type GetChatGroupByPayload<T extends ChatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatGroupByOutputType[P]>
            : GetScalarType<T[P], ChatGroupByOutputType[P]>
        }
      >
    >


  export type ChatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    role?: boolean
    content?: boolean
    imageUrl?: boolean
    recommendations?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    role?: boolean
    content?: boolean
    imageUrl?: boolean
    recommendations?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    role?: boolean
    content?: boolean
    imageUrl?: boolean
    recommendations?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectScalar = {
    id?: boolean
    userId?: boolean
    role?: boolean
    content?: boolean
    imageUrl?: boolean
    recommendations?: boolean
    createdAt?: boolean
  }

  export type ChatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "role" | "content" | "imageUrl" | "recommendations" | "createdAt", ExtArgs["result"]["chat"]>
  export type ChatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ChatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ChatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ChatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chat"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      role: string
      content: string
      imageUrl: string | null
      recommendations: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["chat"]>
    composites: {}
  }

  type ChatGetPayload<S extends boolean | null | undefined | ChatDefaultArgs> = $Result.GetResult<Prisma.$ChatPayload, S>

  type ChatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatCountAggregateInputType | true
    }

  export interface ChatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chat'], meta: { name: 'Chat' } }
    /**
     * Find zero or one Chat that matches the filter.
     * @param {ChatFindUniqueArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatFindUniqueArgs>(args: SelectSubset<T, ChatFindUniqueArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatFindUniqueOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindFirstArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatFindFirstArgs>(args?: SelectSubset<T, ChatFindFirstArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindFirstOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chats
     * const chats = await prisma.chat.findMany()
     * 
     * // Get first 10 Chats
     * const chats = await prisma.chat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatWithIdOnly = await prisma.chat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatFindManyArgs>(args?: SelectSubset<T, ChatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chat.
     * @param {ChatCreateArgs} args - Arguments to create a Chat.
     * @example
     * // Create one Chat
     * const Chat = await prisma.chat.create({
     *   data: {
     *     // ... data to create a Chat
     *   }
     * })
     * 
     */
    create<T extends ChatCreateArgs>(args: SelectSubset<T, ChatCreateArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chats.
     * @param {ChatCreateManyArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatCreateManyArgs>(args?: SelectSubset<T, ChatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chats and returns the data saved in the database.
     * @param {ChatCreateManyAndReturnArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chat.
     * @param {ChatDeleteArgs} args - Arguments to delete one Chat.
     * @example
     * // Delete one Chat
     * const Chat = await prisma.chat.delete({
     *   where: {
     *     // ... filter to delete one Chat
     *   }
     * })
     * 
     */
    delete<T extends ChatDeleteArgs>(args: SelectSubset<T, ChatDeleteArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chat.
     * @param {ChatUpdateArgs} args - Arguments to update one Chat.
     * @example
     * // Update one Chat
     * const chat = await prisma.chat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatUpdateArgs>(args: SelectSubset<T, ChatUpdateArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chats.
     * @param {ChatDeleteManyArgs} args - Arguments to filter Chats to delete.
     * @example
     * // Delete a few Chats
     * const { count } = await prisma.chat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatDeleteManyArgs>(args?: SelectSubset<T, ChatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatUpdateManyArgs>(args: SelectSubset<T, ChatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats and returns the data updated in the database.
     * @param {ChatUpdateManyAndReturnArgs} args - Arguments to update many Chats.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chat.
     * @param {ChatUpsertArgs} args - Arguments to update or create a Chat.
     * @example
     * // Update or create a Chat
     * const chat = await prisma.chat.upsert({
     *   create: {
     *     // ... data to create a Chat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chat we want to update
     *   }
     * })
     */
    upsert<T extends ChatUpsertArgs>(args: SelectSubset<T, ChatUpsertArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatCountArgs} args - Arguments to filter Chats to count.
     * @example
     * // Count the number of Chats
     * const count = await prisma.chat.count({
     *   where: {
     *     // ... the filter for the Chats we want to count
     *   }
     * })
    **/
    count<T extends ChatCountArgs>(
      args?: Subset<T, ChatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatAggregateArgs>(args: Subset<T, ChatAggregateArgs>): Prisma.PrismaPromise<GetChatAggregateType<T>>

    /**
     * Group by Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatGroupByArgs['orderBy'] }
        : { orderBy?: ChatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chat model
   */
  readonly fields: ChatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chat model
   */
  interface ChatFieldRefs {
    readonly id: FieldRef<"Chat", 'String'>
    readonly userId: FieldRef<"Chat", 'String'>
    readonly role: FieldRef<"Chat", 'String'>
    readonly content: FieldRef<"Chat", 'String'>
    readonly imageUrl: FieldRef<"Chat", 'String'>
    readonly recommendations: FieldRef<"Chat", 'Json'>
    readonly createdAt: FieldRef<"Chat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chat findUnique
   */
  export type ChatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat findUniqueOrThrow
   */
  export type ChatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat findFirst
   */
  export type ChatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chats.
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * Chat findFirstOrThrow
   */
  export type ChatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chats.
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * Chat findMany
   */
  export type ChatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chats to fetch.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Chats.
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * Chat create
   */
  export type ChatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * The data needed to create a Chat.
     */
    data: XOR<ChatCreateInput, ChatUncheckedCreateInput>
  }

  /**
   * Chat createMany
   */
  export type ChatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chats.
     */
    data: ChatCreateManyInput | ChatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chat createManyAndReturn
   */
  export type ChatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * The data used to create many Chats.
     */
    data: ChatCreateManyInput | ChatCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chat update
   */
  export type ChatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * The data needed to update a Chat.
     */
    data: XOR<ChatUpdateInput, ChatUncheckedUpdateInput>
    /**
     * Choose, which Chat to update.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat updateMany
   */
  export type ChatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatUpdateManyMutationInput, ChatUncheckedUpdateManyInput>
    /**
     * Filter which Chats to update
     */
    where?: ChatWhereInput
    /**
     * Limit how many Chats to update.
     */
    limit?: number
  }

  /**
   * Chat updateManyAndReturn
   */
  export type ChatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatUpdateManyMutationInput, ChatUncheckedUpdateManyInput>
    /**
     * Filter which Chats to update
     */
    where?: ChatWhereInput
    /**
     * Limit how many Chats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chat upsert
   */
  export type ChatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * The filter to search for the Chat to update in case it exists.
     */
    where: ChatWhereUniqueInput
    /**
     * In case the Chat found by the `where` argument doesn't exist, create a new Chat with this data.
     */
    create: XOR<ChatCreateInput, ChatUncheckedCreateInput>
    /**
     * In case the Chat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatUpdateInput, ChatUncheckedUpdateInput>
  }

  /**
   * Chat delete
   */
  export type ChatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter which Chat to delete.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat deleteMany
   */
  export type ChatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chats to delete
     */
    where?: ChatWhereInput
    /**
     * Limit how many Chats to delete.
     */
    limit?: number
  }

  /**
   * Chat without action
   */
  export type ChatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
  }


  /**
   * Model BankAccount
   */

  export type AggregateBankAccount = {
    _count: BankAccountCountAggregateOutputType | null
    _min: BankAccountMinAggregateOutputType | null
    _max: BankAccountMaxAggregateOutputType | null
  }

  export type BankAccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    accountHolderName: string | null
    accountNumber: string | null
    ifscCode: string | null
    bankName: string | null
    branch: string | null
    createdAt: Date | null
  }

  export type BankAccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    accountHolderName: string | null
    accountNumber: string | null
    ifscCode: string | null
    bankName: string | null
    branch: string | null
    createdAt: Date | null
  }

  export type BankAccountCountAggregateOutputType = {
    id: number
    userId: number
    accountHolderName: number
    accountNumber: number
    ifscCode: number
    bankName: number
    branch: number
    createdAt: number
    _all: number
  }


  export type BankAccountMinAggregateInputType = {
    id?: true
    userId?: true
    accountHolderName?: true
    accountNumber?: true
    ifscCode?: true
    bankName?: true
    branch?: true
    createdAt?: true
  }

  export type BankAccountMaxAggregateInputType = {
    id?: true
    userId?: true
    accountHolderName?: true
    accountNumber?: true
    ifscCode?: true
    bankName?: true
    branch?: true
    createdAt?: true
  }

  export type BankAccountCountAggregateInputType = {
    id?: true
    userId?: true
    accountHolderName?: true
    accountNumber?: true
    ifscCode?: true
    bankName?: true
    branch?: true
    createdAt?: true
    _all?: true
  }

  export type BankAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankAccount to aggregate.
     */
    where?: BankAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankAccounts to fetch.
     */
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BankAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BankAccounts
    **/
    _count?: true | BankAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BankAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BankAccountMaxAggregateInputType
  }

  export type GetBankAccountAggregateType<T extends BankAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateBankAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBankAccount[P]>
      : GetScalarType<T[P], AggregateBankAccount[P]>
  }




  export type BankAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankAccountWhereInput
    orderBy?: BankAccountOrderByWithAggregationInput | BankAccountOrderByWithAggregationInput[]
    by: BankAccountScalarFieldEnum[] | BankAccountScalarFieldEnum
    having?: BankAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BankAccountCountAggregateInputType | true
    _min?: BankAccountMinAggregateInputType
    _max?: BankAccountMaxAggregateInputType
  }

  export type BankAccountGroupByOutputType = {
    id: string
    userId: string
    accountHolderName: string
    accountNumber: string
    ifscCode: string | null
    bankName: string
    branch: string | null
    createdAt: Date
    _count: BankAccountCountAggregateOutputType | null
    _min: BankAccountMinAggregateOutputType | null
    _max: BankAccountMaxAggregateOutputType | null
  }

  type GetBankAccountGroupByPayload<T extends BankAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BankAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BankAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BankAccountGroupByOutputType[P]>
            : GetScalarType<T[P], BankAccountGroupByOutputType[P]>
        }
      >
    >


  export type BankAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountHolderName?: boolean
    accountNumber?: boolean
    ifscCode?: boolean
    bankName?: boolean
    branch?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    statements?: boolean | BankAccount$statementsArgs<ExtArgs>
    _count?: boolean | BankAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bankAccount"]>

  export type BankAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountHolderName?: boolean
    accountNumber?: boolean
    ifscCode?: boolean
    bankName?: boolean
    branch?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bankAccount"]>

  export type BankAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountHolderName?: boolean
    accountNumber?: boolean
    ifscCode?: boolean
    bankName?: boolean
    branch?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bankAccount"]>

  export type BankAccountSelectScalar = {
    id?: boolean
    userId?: boolean
    accountHolderName?: boolean
    accountNumber?: boolean
    ifscCode?: boolean
    bankName?: boolean
    branch?: boolean
    createdAt?: boolean
  }

  export type BankAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "accountHolderName" | "accountNumber" | "ifscCode" | "bankName" | "branch" | "createdAt", ExtArgs["result"]["bankAccount"]>
  export type BankAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    statements?: boolean | BankAccount$statementsArgs<ExtArgs>
    _count?: boolean | BankAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BankAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BankAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BankAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BankAccount"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      statements: Prisma.$StatementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      accountHolderName: string
      accountNumber: string
      ifscCode: string | null
      bankName: string
      branch: string | null
      createdAt: Date
    }, ExtArgs["result"]["bankAccount"]>
    composites: {}
  }

  type BankAccountGetPayload<S extends boolean | null | undefined | BankAccountDefaultArgs> = $Result.GetResult<Prisma.$BankAccountPayload, S>

  type BankAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BankAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BankAccountCountAggregateInputType | true
    }

  export interface BankAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BankAccount'], meta: { name: 'BankAccount' } }
    /**
     * Find zero or one BankAccount that matches the filter.
     * @param {BankAccountFindUniqueArgs} args - Arguments to find a BankAccount
     * @example
     * // Get one BankAccount
     * const bankAccount = await prisma.bankAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BankAccountFindUniqueArgs>(args: SelectSubset<T, BankAccountFindUniqueArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BankAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BankAccountFindUniqueOrThrowArgs} args - Arguments to find a BankAccount
     * @example
     * // Get one BankAccount
     * const bankAccount = await prisma.bankAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BankAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, BankAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountFindFirstArgs} args - Arguments to find a BankAccount
     * @example
     * // Get one BankAccount
     * const bankAccount = await prisma.bankAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BankAccountFindFirstArgs>(args?: SelectSubset<T, BankAccountFindFirstArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountFindFirstOrThrowArgs} args - Arguments to find a BankAccount
     * @example
     * // Get one BankAccount
     * const bankAccount = await prisma.bankAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BankAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, BankAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BankAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BankAccounts
     * const bankAccounts = await prisma.bankAccount.findMany()
     * 
     * // Get first 10 BankAccounts
     * const bankAccounts = await prisma.bankAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bankAccountWithIdOnly = await prisma.bankAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BankAccountFindManyArgs>(args?: SelectSubset<T, BankAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BankAccount.
     * @param {BankAccountCreateArgs} args - Arguments to create a BankAccount.
     * @example
     * // Create one BankAccount
     * const BankAccount = await prisma.bankAccount.create({
     *   data: {
     *     // ... data to create a BankAccount
     *   }
     * })
     * 
     */
    create<T extends BankAccountCreateArgs>(args: SelectSubset<T, BankAccountCreateArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BankAccounts.
     * @param {BankAccountCreateManyArgs} args - Arguments to create many BankAccounts.
     * @example
     * // Create many BankAccounts
     * const bankAccount = await prisma.bankAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BankAccountCreateManyArgs>(args?: SelectSubset<T, BankAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BankAccounts and returns the data saved in the database.
     * @param {BankAccountCreateManyAndReturnArgs} args - Arguments to create many BankAccounts.
     * @example
     * // Create many BankAccounts
     * const bankAccount = await prisma.bankAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BankAccounts and only return the `id`
     * const bankAccountWithIdOnly = await prisma.bankAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BankAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, BankAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BankAccount.
     * @param {BankAccountDeleteArgs} args - Arguments to delete one BankAccount.
     * @example
     * // Delete one BankAccount
     * const BankAccount = await prisma.bankAccount.delete({
     *   where: {
     *     // ... filter to delete one BankAccount
     *   }
     * })
     * 
     */
    delete<T extends BankAccountDeleteArgs>(args: SelectSubset<T, BankAccountDeleteArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BankAccount.
     * @param {BankAccountUpdateArgs} args - Arguments to update one BankAccount.
     * @example
     * // Update one BankAccount
     * const bankAccount = await prisma.bankAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BankAccountUpdateArgs>(args: SelectSubset<T, BankAccountUpdateArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BankAccounts.
     * @param {BankAccountDeleteManyArgs} args - Arguments to filter BankAccounts to delete.
     * @example
     * // Delete a few BankAccounts
     * const { count } = await prisma.bankAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BankAccountDeleteManyArgs>(args?: SelectSubset<T, BankAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BankAccounts
     * const bankAccount = await prisma.bankAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BankAccountUpdateManyArgs>(args: SelectSubset<T, BankAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankAccounts and returns the data updated in the database.
     * @param {BankAccountUpdateManyAndReturnArgs} args - Arguments to update many BankAccounts.
     * @example
     * // Update many BankAccounts
     * const bankAccount = await prisma.bankAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BankAccounts and only return the `id`
     * const bankAccountWithIdOnly = await prisma.bankAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BankAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, BankAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BankAccount.
     * @param {BankAccountUpsertArgs} args - Arguments to update or create a BankAccount.
     * @example
     * // Update or create a BankAccount
     * const bankAccount = await prisma.bankAccount.upsert({
     *   create: {
     *     // ... data to create a BankAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BankAccount we want to update
     *   }
     * })
     */
    upsert<T extends BankAccountUpsertArgs>(args: SelectSubset<T, BankAccountUpsertArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BankAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountCountArgs} args - Arguments to filter BankAccounts to count.
     * @example
     * // Count the number of BankAccounts
     * const count = await prisma.bankAccount.count({
     *   where: {
     *     // ... the filter for the BankAccounts we want to count
     *   }
     * })
    **/
    count<T extends BankAccountCountArgs>(
      args?: Subset<T, BankAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BankAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BankAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BankAccountAggregateArgs>(args: Subset<T, BankAccountAggregateArgs>): Prisma.PrismaPromise<GetBankAccountAggregateType<T>>

    /**
     * Group by BankAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BankAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BankAccountGroupByArgs['orderBy'] }
        : { orderBy?: BankAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BankAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BankAccount model
   */
  readonly fields: BankAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BankAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BankAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    statements<T extends BankAccount$statementsArgs<ExtArgs> = {}>(args?: Subset<T, BankAccount$statementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BankAccount model
   */
  interface BankAccountFieldRefs {
    readonly id: FieldRef<"BankAccount", 'String'>
    readonly userId: FieldRef<"BankAccount", 'String'>
    readonly accountHolderName: FieldRef<"BankAccount", 'String'>
    readonly accountNumber: FieldRef<"BankAccount", 'String'>
    readonly ifscCode: FieldRef<"BankAccount", 'String'>
    readonly bankName: FieldRef<"BankAccount", 'String'>
    readonly branch: FieldRef<"BankAccount", 'String'>
    readonly createdAt: FieldRef<"BankAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BankAccount findUnique
   */
  export type BankAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccount to fetch.
     */
    where: BankAccountWhereUniqueInput
  }

  /**
   * BankAccount findUniqueOrThrow
   */
  export type BankAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccount to fetch.
     */
    where: BankAccountWhereUniqueInput
  }

  /**
   * BankAccount findFirst
   */
  export type BankAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccount to fetch.
     */
    where?: BankAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankAccounts to fetch.
     */
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankAccounts.
     */
    cursor?: BankAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankAccounts.
     */
    distinct?: BankAccountScalarFieldEnum | BankAccountScalarFieldEnum[]
  }

  /**
   * BankAccount findFirstOrThrow
   */
  export type BankAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccount to fetch.
     */
    where?: BankAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankAccounts to fetch.
     */
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankAccounts.
     */
    cursor?: BankAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankAccounts.
     */
    distinct?: BankAccountScalarFieldEnum | BankAccountScalarFieldEnum[]
  }

  /**
   * BankAccount findMany
   */
  export type BankAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter, which BankAccounts to fetch.
     */
    where?: BankAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankAccounts to fetch.
     */
    orderBy?: BankAccountOrderByWithRelationInput | BankAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BankAccounts.
     */
    cursor?: BankAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankAccounts.
     */
    distinct?: BankAccountScalarFieldEnum | BankAccountScalarFieldEnum[]
  }

  /**
   * BankAccount create
   */
  export type BankAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a BankAccount.
     */
    data: XOR<BankAccountCreateInput, BankAccountUncheckedCreateInput>
  }

  /**
   * BankAccount createMany
   */
  export type BankAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BankAccounts.
     */
    data: BankAccountCreateManyInput | BankAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BankAccount createManyAndReturn
   */
  export type BankAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * The data used to create many BankAccounts.
     */
    data: BankAccountCreateManyInput | BankAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BankAccount update
   */
  export type BankAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a BankAccount.
     */
    data: XOR<BankAccountUpdateInput, BankAccountUncheckedUpdateInput>
    /**
     * Choose, which BankAccount to update.
     */
    where: BankAccountWhereUniqueInput
  }

  /**
   * BankAccount updateMany
   */
  export type BankAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BankAccounts.
     */
    data: XOR<BankAccountUpdateManyMutationInput, BankAccountUncheckedUpdateManyInput>
    /**
     * Filter which BankAccounts to update
     */
    where?: BankAccountWhereInput
    /**
     * Limit how many BankAccounts to update.
     */
    limit?: number
  }

  /**
   * BankAccount updateManyAndReturn
   */
  export type BankAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * The data used to update BankAccounts.
     */
    data: XOR<BankAccountUpdateManyMutationInput, BankAccountUncheckedUpdateManyInput>
    /**
     * Filter which BankAccounts to update
     */
    where?: BankAccountWhereInput
    /**
     * Limit how many BankAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BankAccount upsert
   */
  export type BankAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the BankAccount to update in case it exists.
     */
    where: BankAccountWhereUniqueInput
    /**
     * In case the BankAccount found by the `where` argument doesn't exist, create a new BankAccount with this data.
     */
    create: XOR<BankAccountCreateInput, BankAccountUncheckedCreateInput>
    /**
     * In case the BankAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BankAccountUpdateInput, BankAccountUncheckedUpdateInput>
  }

  /**
   * BankAccount delete
   */
  export type BankAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    /**
     * Filter which BankAccount to delete.
     */
    where: BankAccountWhereUniqueInput
  }

  /**
   * BankAccount deleteMany
   */
  export type BankAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankAccounts to delete
     */
    where?: BankAccountWhereInput
    /**
     * Limit how many BankAccounts to delete.
     */
    limit?: number
  }

  /**
   * BankAccount.statements
   */
  export type BankAccount$statementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    where?: StatementWhereInput
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    cursor?: StatementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StatementScalarFieldEnum | StatementScalarFieldEnum[]
  }

  /**
   * BankAccount without action
   */
  export type BankAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
  }


  /**
   * Model Statement
   */

  export type AggregateStatement = {
    _count: StatementCountAggregateOutputType | null
    _min: StatementMinAggregateOutputType | null
    _max: StatementMaxAggregateOutputType | null
  }

  export type StatementMinAggregateOutputType = {
    id: string | null
    userId: string | null
    filePath: string | null
    originalFilename: string | null
    uploadedAt: Date | null
    status: string | null
    bankAccountId: string | null
  }

  export type StatementMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    filePath: string | null
    originalFilename: string | null
    uploadedAt: Date | null
    status: string | null
    bankAccountId: string | null
  }

  export type StatementCountAggregateOutputType = {
    id: number
    userId: number
    filePath: number
    originalFilename: number
    uploadedAt: number
    status: number
    meta: number
    bankAccountId: number
    _all: number
  }


  export type StatementMinAggregateInputType = {
    id?: true
    userId?: true
    filePath?: true
    originalFilename?: true
    uploadedAt?: true
    status?: true
    bankAccountId?: true
  }

  export type StatementMaxAggregateInputType = {
    id?: true
    userId?: true
    filePath?: true
    originalFilename?: true
    uploadedAt?: true
    status?: true
    bankAccountId?: true
  }

  export type StatementCountAggregateInputType = {
    id?: true
    userId?: true
    filePath?: true
    originalFilename?: true
    uploadedAt?: true
    status?: true
    meta?: true
    bankAccountId?: true
    _all?: true
  }

  export type StatementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Statement to aggregate.
     */
    where?: StatementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statements to fetch.
     */
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Statements
    **/
    _count?: true | StatementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatementMaxAggregateInputType
  }

  export type GetStatementAggregateType<T extends StatementAggregateArgs> = {
        [P in keyof T & keyof AggregateStatement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatement[P]>
      : GetScalarType<T[P], AggregateStatement[P]>
  }




  export type StatementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatementWhereInput
    orderBy?: StatementOrderByWithAggregationInput | StatementOrderByWithAggregationInput[]
    by: StatementScalarFieldEnum[] | StatementScalarFieldEnum
    having?: StatementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatementCountAggregateInputType | true
    _min?: StatementMinAggregateInputType
    _max?: StatementMaxAggregateInputType
  }

  export type StatementGroupByOutputType = {
    id: string
    userId: string
    filePath: string
    originalFilename: string
    uploadedAt: Date
    status: string
    meta: JsonValue | null
    bankAccountId: string | null
    _count: StatementCountAggregateOutputType | null
    _min: StatementMinAggregateOutputType | null
    _max: StatementMaxAggregateOutputType | null
  }

  type GetStatementGroupByPayload<T extends StatementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatementGroupByOutputType[P]>
            : GetScalarType<T[P], StatementGroupByOutputType[P]>
        }
      >
    >


  export type StatementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filePath?: boolean
    originalFilename?: boolean
    uploadedAt?: boolean
    status?: boolean
    meta?: boolean
    bankAccountId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    bankAccount?: boolean | Statement$bankAccountArgs<ExtArgs>
    transactions?: boolean | Statement$transactionsArgs<ExtArgs>
    insights?: boolean | Statement$insightsArgs<ExtArgs>
    _count?: boolean | StatementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statement"]>

  export type StatementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filePath?: boolean
    originalFilename?: boolean
    uploadedAt?: boolean
    status?: boolean
    meta?: boolean
    bankAccountId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    bankAccount?: boolean | Statement$bankAccountArgs<ExtArgs>
  }, ExtArgs["result"]["statement"]>

  export type StatementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filePath?: boolean
    originalFilename?: boolean
    uploadedAt?: boolean
    status?: boolean
    meta?: boolean
    bankAccountId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    bankAccount?: boolean | Statement$bankAccountArgs<ExtArgs>
  }, ExtArgs["result"]["statement"]>

  export type StatementSelectScalar = {
    id?: boolean
    userId?: boolean
    filePath?: boolean
    originalFilename?: boolean
    uploadedAt?: boolean
    status?: boolean
    meta?: boolean
    bankAccountId?: boolean
  }

  export type StatementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "filePath" | "originalFilename" | "uploadedAt" | "status" | "meta" | "bankAccountId", ExtArgs["result"]["statement"]>
  export type StatementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    bankAccount?: boolean | Statement$bankAccountArgs<ExtArgs>
    transactions?: boolean | Statement$transactionsArgs<ExtArgs>
    insights?: boolean | Statement$insightsArgs<ExtArgs>
    _count?: boolean | StatementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StatementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    bankAccount?: boolean | Statement$bankAccountArgs<ExtArgs>
  }
  export type StatementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    bankAccount?: boolean | Statement$bankAccountArgs<ExtArgs>
  }

  export type $StatementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Statement"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      bankAccount: Prisma.$BankAccountPayload<ExtArgs> | null
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      insights: Prisma.$InsightPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      filePath: string
      originalFilename: string
      uploadedAt: Date
      status: string
      meta: Prisma.JsonValue | null
      bankAccountId: string | null
    }, ExtArgs["result"]["statement"]>
    composites: {}
  }

  type StatementGetPayload<S extends boolean | null | undefined | StatementDefaultArgs> = $Result.GetResult<Prisma.$StatementPayload, S>

  type StatementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StatementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StatementCountAggregateInputType | true
    }

  export interface StatementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Statement'], meta: { name: 'Statement' } }
    /**
     * Find zero or one Statement that matches the filter.
     * @param {StatementFindUniqueArgs} args - Arguments to find a Statement
     * @example
     * // Get one Statement
     * const statement = await prisma.statement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatementFindUniqueArgs>(args: SelectSubset<T, StatementFindUniqueArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Statement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatementFindUniqueOrThrowArgs} args - Arguments to find a Statement
     * @example
     * // Get one Statement
     * const statement = await prisma.statement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatementFindUniqueOrThrowArgs>(args: SelectSubset<T, StatementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Statement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFindFirstArgs} args - Arguments to find a Statement
     * @example
     * // Get one Statement
     * const statement = await prisma.statement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatementFindFirstArgs>(args?: SelectSubset<T, StatementFindFirstArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Statement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFindFirstOrThrowArgs} args - Arguments to find a Statement
     * @example
     * // Get one Statement
     * const statement = await prisma.statement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatementFindFirstOrThrowArgs>(args?: SelectSubset<T, StatementFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Statements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Statements
     * const statements = await prisma.statement.findMany()
     * 
     * // Get first 10 Statements
     * const statements = await prisma.statement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statementWithIdOnly = await prisma.statement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatementFindManyArgs>(args?: SelectSubset<T, StatementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Statement.
     * @param {StatementCreateArgs} args - Arguments to create a Statement.
     * @example
     * // Create one Statement
     * const Statement = await prisma.statement.create({
     *   data: {
     *     // ... data to create a Statement
     *   }
     * })
     * 
     */
    create<T extends StatementCreateArgs>(args: SelectSubset<T, StatementCreateArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Statements.
     * @param {StatementCreateManyArgs} args - Arguments to create many Statements.
     * @example
     * // Create many Statements
     * const statement = await prisma.statement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatementCreateManyArgs>(args?: SelectSubset<T, StatementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Statements and returns the data saved in the database.
     * @param {StatementCreateManyAndReturnArgs} args - Arguments to create many Statements.
     * @example
     * // Create many Statements
     * const statement = await prisma.statement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Statements and only return the `id`
     * const statementWithIdOnly = await prisma.statement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StatementCreateManyAndReturnArgs>(args?: SelectSubset<T, StatementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Statement.
     * @param {StatementDeleteArgs} args - Arguments to delete one Statement.
     * @example
     * // Delete one Statement
     * const Statement = await prisma.statement.delete({
     *   where: {
     *     // ... filter to delete one Statement
     *   }
     * })
     * 
     */
    delete<T extends StatementDeleteArgs>(args: SelectSubset<T, StatementDeleteArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Statement.
     * @param {StatementUpdateArgs} args - Arguments to update one Statement.
     * @example
     * // Update one Statement
     * const statement = await prisma.statement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatementUpdateArgs>(args: SelectSubset<T, StatementUpdateArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Statements.
     * @param {StatementDeleteManyArgs} args - Arguments to filter Statements to delete.
     * @example
     * // Delete a few Statements
     * const { count } = await prisma.statement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatementDeleteManyArgs>(args?: SelectSubset<T, StatementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Statements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Statements
     * const statement = await prisma.statement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatementUpdateManyArgs>(args: SelectSubset<T, StatementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Statements and returns the data updated in the database.
     * @param {StatementUpdateManyAndReturnArgs} args - Arguments to update many Statements.
     * @example
     * // Update many Statements
     * const statement = await prisma.statement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Statements and only return the `id`
     * const statementWithIdOnly = await prisma.statement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StatementUpdateManyAndReturnArgs>(args: SelectSubset<T, StatementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Statement.
     * @param {StatementUpsertArgs} args - Arguments to update or create a Statement.
     * @example
     * // Update or create a Statement
     * const statement = await prisma.statement.upsert({
     *   create: {
     *     // ... data to create a Statement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Statement we want to update
     *   }
     * })
     */
    upsert<T extends StatementUpsertArgs>(args: SelectSubset<T, StatementUpsertArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Statements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementCountArgs} args - Arguments to filter Statements to count.
     * @example
     * // Count the number of Statements
     * const count = await prisma.statement.count({
     *   where: {
     *     // ... the filter for the Statements we want to count
     *   }
     * })
    **/
    count<T extends StatementCountArgs>(
      args?: Subset<T, StatementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Statement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatementAggregateArgs>(args: Subset<T, StatementAggregateArgs>): Prisma.PrismaPromise<GetStatementAggregateType<T>>

    /**
     * Group by Statement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StatementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatementGroupByArgs['orderBy'] }
        : { orderBy?: StatementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StatementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Statement model
   */
  readonly fields: StatementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Statement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bankAccount<T extends Statement$bankAccountArgs<ExtArgs> = {}>(args?: Subset<T, Statement$bankAccountArgs<ExtArgs>>): Prisma__BankAccountClient<$Result.GetResult<Prisma.$BankAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Statement$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Statement$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    insights<T extends Statement$insightsArgs<ExtArgs> = {}>(args?: Subset<T, Statement$insightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Statement model
   */
  interface StatementFieldRefs {
    readonly id: FieldRef<"Statement", 'String'>
    readonly userId: FieldRef<"Statement", 'String'>
    readonly filePath: FieldRef<"Statement", 'String'>
    readonly originalFilename: FieldRef<"Statement", 'String'>
    readonly uploadedAt: FieldRef<"Statement", 'DateTime'>
    readonly status: FieldRef<"Statement", 'String'>
    readonly meta: FieldRef<"Statement", 'Json'>
    readonly bankAccountId: FieldRef<"Statement", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Statement findUnique
   */
  export type StatementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statement to fetch.
     */
    where: StatementWhereUniqueInput
  }

  /**
   * Statement findUniqueOrThrow
   */
  export type StatementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statement to fetch.
     */
    where: StatementWhereUniqueInput
  }

  /**
   * Statement findFirst
   */
  export type StatementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statement to fetch.
     */
    where?: StatementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statements to fetch.
     */
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Statements.
     */
    cursor?: StatementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Statements.
     */
    distinct?: StatementScalarFieldEnum | StatementScalarFieldEnum[]
  }

  /**
   * Statement findFirstOrThrow
   */
  export type StatementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statement to fetch.
     */
    where?: StatementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statements to fetch.
     */
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Statements.
     */
    cursor?: StatementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Statements.
     */
    distinct?: StatementScalarFieldEnum | StatementScalarFieldEnum[]
  }

  /**
   * Statement findMany
   */
  export type StatementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statements to fetch.
     */
    where?: StatementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statements to fetch.
     */
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Statements.
     */
    cursor?: StatementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Statements.
     */
    distinct?: StatementScalarFieldEnum | StatementScalarFieldEnum[]
  }

  /**
   * Statement create
   */
  export type StatementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * The data needed to create a Statement.
     */
    data: XOR<StatementCreateInput, StatementUncheckedCreateInput>
  }

  /**
   * Statement createMany
   */
  export type StatementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Statements.
     */
    data: StatementCreateManyInput | StatementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Statement createManyAndReturn
   */
  export type StatementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * The data used to create many Statements.
     */
    data: StatementCreateManyInput | StatementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Statement update
   */
  export type StatementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * The data needed to update a Statement.
     */
    data: XOR<StatementUpdateInput, StatementUncheckedUpdateInput>
    /**
     * Choose, which Statement to update.
     */
    where: StatementWhereUniqueInput
  }

  /**
   * Statement updateMany
   */
  export type StatementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Statements.
     */
    data: XOR<StatementUpdateManyMutationInput, StatementUncheckedUpdateManyInput>
    /**
     * Filter which Statements to update
     */
    where?: StatementWhereInput
    /**
     * Limit how many Statements to update.
     */
    limit?: number
  }

  /**
   * Statement updateManyAndReturn
   */
  export type StatementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * The data used to update Statements.
     */
    data: XOR<StatementUpdateManyMutationInput, StatementUncheckedUpdateManyInput>
    /**
     * Filter which Statements to update
     */
    where?: StatementWhereInput
    /**
     * Limit how many Statements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Statement upsert
   */
  export type StatementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * The filter to search for the Statement to update in case it exists.
     */
    where: StatementWhereUniqueInput
    /**
     * In case the Statement found by the `where` argument doesn't exist, create a new Statement with this data.
     */
    create: XOR<StatementCreateInput, StatementUncheckedCreateInput>
    /**
     * In case the Statement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatementUpdateInput, StatementUncheckedUpdateInput>
  }

  /**
   * Statement delete
   */
  export type StatementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter which Statement to delete.
     */
    where: StatementWhereUniqueInput
  }

  /**
   * Statement deleteMany
   */
  export type StatementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Statements to delete
     */
    where?: StatementWhereInput
    /**
     * Limit how many Statements to delete.
     */
    limit?: number
  }

  /**
   * Statement.bankAccount
   */
  export type Statement$bankAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankAccount
     */
    select?: BankAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankAccount
     */
    omit?: BankAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankAccountInclude<ExtArgs> | null
    where?: BankAccountWhereInput
  }

  /**
   * Statement.transactions
   */
  export type Statement$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Statement.insights
   */
  export type Statement$insightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    where?: InsightWhereInput
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    cursor?: InsightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InsightScalarFieldEnum | InsightScalarFieldEnum[]
  }

  /**
   * Statement without action
   */
  export type StatementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    statementId: string | null
    date: Date | null
    merchant: string | null
    amount: number | null
    currency: string | null
    category: string | null
    description: string | null
    rawLine: string | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    statementId: string | null
    date: Date | null
    merchant: string | null
    amount: number | null
    currency: string | null
    category: string | null
    description: string | null
    rawLine: string | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    userId: number
    statementId: number
    date: number
    merchant: number
    amount: number
    currency: number
    category: number
    description: number
    rawLine: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    userId?: true
    statementId?: true
    date?: true
    merchant?: true
    amount?: true
    currency?: true
    category?: true
    description?: true
    rawLine?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    statementId?: true
    date?: true
    merchant?: true
    amount?: true
    currency?: true
    category?: true
    description?: true
    rawLine?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    userId?: true
    statementId?: true
    date?: true
    merchant?: true
    amount?: true
    currency?: true
    category?: true
    description?: true
    rawLine?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    userId: string
    statementId: string | null
    date: Date
    merchant: string
    amount: number
    currency: string
    category: string | null
    description: string | null
    rawLine: string
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statementId?: boolean
    date?: boolean
    merchant?: boolean
    amount?: boolean
    currency?: boolean
    category?: boolean
    description?: boolean
    rawLine?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Transaction$statementArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statementId?: boolean
    date?: boolean
    merchant?: boolean
    amount?: boolean
    currency?: boolean
    category?: boolean
    description?: boolean
    rawLine?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Transaction$statementArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statementId?: boolean
    date?: boolean
    merchant?: boolean
    amount?: boolean
    currency?: boolean
    category?: boolean
    description?: boolean
    rawLine?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Transaction$statementArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    statementId?: boolean
    date?: boolean
    merchant?: boolean
    amount?: boolean
    currency?: boolean
    category?: boolean
    description?: boolean
    rawLine?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "statementId" | "date" | "merchant" | "amount" | "currency" | "category" | "description" | "rawLine", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Transaction$statementArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Transaction$statementArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Transaction$statementArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      statement: Prisma.$StatementPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      statementId: string | null
      date: Date
      merchant: string
      amount: number
      currency: string
      category: string | null
      description: string | null
      rawLine: string
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    statement<T extends Transaction$statementArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$statementArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly userId: FieldRef<"Transaction", 'String'>
    readonly statementId: FieldRef<"Transaction", 'String'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly merchant: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Float'>
    readonly currency: FieldRef<"Transaction", 'String'>
    readonly category: FieldRef<"Transaction", 'String'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly rawLine: FieldRef<"Transaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.statement
   */
  export type Transaction$statementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    where?: StatementWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model Insight
   */

  export type AggregateInsight = {
    _count: InsightCountAggregateOutputType | null
    _avg: InsightAvgAggregateOutputType | null
    _sum: InsightSumAggregateOutputType | null
    _min: InsightMinAggregateOutputType | null
    _max: InsightMaxAggregateOutputType | null
  }

  export type InsightAvgAggregateOutputType = {
    score: number | null
  }

  export type InsightSumAggregateOutputType = {
    score: number | null
  }

  export type InsightMinAggregateOutputType = {
    id: string | null
    userId: string | null
    statementId: string | null
    month: string | null
    score: number | null
    summary: string | null
    createdAt: Date | null
  }

  export type InsightMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    statementId: string | null
    month: string | null
    score: number | null
    summary: string | null
    createdAt: Date | null
  }

  export type InsightCountAggregateOutputType = {
    id: number
    userId: number
    statementId: number
    month: number
    score: number
    summary: number
    recommendations: number
    createdAt: number
    _all: number
  }


  export type InsightAvgAggregateInputType = {
    score?: true
  }

  export type InsightSumAggregateInputType = {
    score?: true
  }

  export type InsightMinAggregateInputType = {
    id?: true
    userId?: true
    statementId?: true
    month?: true
    score?: true
    summary?: true
    createdAt?: true
  }

  export type InsightMaxAggregateInputType = {
    id?: true
    userId?: true
    statementId?: true
    month?: true
    score?: true
    summary?: true
    createdAt?: true
  }

  export type InsightCountAggregateInputType = {
    id?: true
    userId?: true
    statementId?: true
    month?: true
    score?: true
    summary?: true
    recommendations?: true
    createdAt?: true
    _all?: true
  }

  export type InsightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Insight to aggregate.
     */
    where?: InsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insights to fetch.
     */
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Insights
    **/
    _count?: true | InsightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InsightAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InsightSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InsightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InsightMaxAggregateInputType
  }

  export type GetInsightAggregateType<T extends InsightAggregateArgs> = {
        [P in keyof T & keyof AggregateInsight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInsight[P]>
      : GetScalarType<T[P], AggregateInsight[P]>
  }




  export type InsightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsightWhereInput
    orderBy?: InsightOrderByWithAggregationInput | InsightOrderByWithAggregationInput[]
    by: InsightScalarFieldEnum[] | InsightScalarFieldEnum
    having?: InsightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InsightCountAggregateInputType | true
    _avg?: InsightAvgAggregateInputType
    _sum?: InsightSumAggregateInputType
    _min?: InsightMinAggregateInputType
    _max?: InsightMaxAggregateInputType
  }

  export type InsightGroupByOutputType = {
    id: string
    userId: string
    statementId: string | null
    month: string
    score: number | null
    summary: string
    recommendations: JsonValue | null
    createdAt: Date
    _count: InsightCountAggregateOutputType | null
    _avg: InsightAvgAggregateOutputType | null
    _sum: InsightSumAggregateOutputType | null
    _min: InsightMinAggregateOutputType | null
    _max: InsightMaxAggregateOutputType | null
  }

  type GetInsightGroupByPayload<T extends InsightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InsightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InsightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InsightGroupByOutputType[P]>
            : GetScalarType<T[P], InsightGroupByOutputType[P]>
        }
      >
    >


  export type InsightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statementId?: boolean
    month?: boolean
    score?: boolean
    summary?: boolean
    recommendations?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Insight$statementArgs<ExtArgs>
  }, ExtArgs["result"]["insight"]>

  export type InsightSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statementId?: boolean
    month?: boolean
    score?: boolean
    summary?: boolean
    recommendations?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Insight$statementArgs<ExtArgs>
  }, ExtArgs["result"]["insight"]>

  export type InsightSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statementId?: boolean
    month?: boolean
    score?: boolean
    summary?: boolean
    recommendations?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Insight$statementArgs<ExtArgs>
  }, ExtArgs["result"]["insight"]>

  export type InsightSelectScalar = {
    id?: boolean
    userId?: boolean
    statementId?: boolean
    month?: boolean
    score?: boolean
    summary?: boolean
    recommendations?: boolean
    createdAt?: boolean
  }

  export type InsightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "statementId" | "month" | "score" | "summary" | "recommendations" | "createdAt", ExtArgs["result"]["insight"]>
  export type InsightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Insight$statementArgs<ExtArgs>
  }
  export type InsightIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Insight$statementArgs<ExtArgs>
  }
  export type InsightIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    statement?: boolean | Insight$statementArgs<ExtArgs>
  }

  export type $InsightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Insight"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      statement: Prisma.$StatementPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      statementId: string | null
      month: string
      score: number | null
      summary: string
      recommendations: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["insight"]>
    composites: {}
  }

  type InsightGetPayload<S extends boolean | null | undefined | InsightDefaultArgs> = $Result.GetResult<Prisma.$InsightPayload, S>

  type InsightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InsightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InsightCountAggregateInputType | true
    }

  export interface InsightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Insight'], meta: { name: 'Insight' } }
    /**
     * Find zero or one Insight that matches the filter.
     * @param {InsightFindUniqueArgs} args - Arguments to find a Insight
     * @example
     * // Get one Insight
     * const insight = await prisma.insight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InsightFindUniqueArgs>(args: SelectSubset<T, InsightFindUniqueArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Insight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InsightFindUniqueOrThrowArgs} args - Arguments to find a Insight
     * @example
     * // Get one Insight
     * const insight = await prisma.insight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InsightFindUniqueOrThrowArgs>(args: SelectSubset<T, InsightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Insight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightFindFirstArgs} args - Arguments to find a Insight
     * @example
     * // Get one Insight
     * const insight = await prisma.insight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InsightFindFirstArgs>(args?: SelectSubset<T, InsightFindFirstArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Insight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightFindFirstOrThrowArgs} args - Arguments to find a Insight
     * @example
     * // Get one Insight
     * const insight = await prisma.insight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InsightFindFirstOrThrowArgs>(args?: SelectSubset<T, InsightFindFirstOrThrowArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Insights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Insights
     * const insights = await prisma.insight.findMany()
     * 
     * // Get first 10 Insights
     * const insights = await prisma.insight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const insightWithIdOnly = await prisma.insight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InsightFindManyArgs>(args?: SelectSubset<T, InsightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Insight.
     * @param {InsightCreateArgs} args - Arguments to create a Insight.
     * @example
     * // Create one Insight
     * const Insight = await prisma.insight.create({
     *   data: {
     *     // ... data to create a Insight
     *   }
     * })
     * 
     */
    create<T extends InsightCreateArgs>(args: SelectSubset<T, InsightCreateArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Insights.
     * @param {InsightCreateManyArgs} args - Arguments to create many Insights.
     * @example
     * // Create many Insights
     * const insight = await prisma.insight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InsightCreateManyArgs>(args?: SelectSubset<T, InsightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Insights and returns the data saved in the database.
     * @param {InsightCreateManyAndReturnArgs} args - Arguments to create many Insights.
     * @example
     * // Create many Insights
     * const insight = await prisma.insight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Insights and only return the `id`
     * const insightWithIdOnly = await prisma.insight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InsightCreateManyAndReturnArgs>(args?: SelectSubset<T, InsightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Insight.
     * @param {InsightDeleteArgs} args - Arguments to delete one Insight.
     * @example
     * // Delete one Insight
     * const Insight = await prisma.insight.delete({
     *   where: {
     *     // ... filter to delete one Insight
     *   }
     * })
     * 
     */
    delete<T extends InsightDeleteArgs>(args: SelectSubset<T, InsightDeleteArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Insight.
     * @param {InsightUpdateArgs} args - Arguments to update one Insight.
     * @example
     * // Update one Insight
     * const insight = await prisma.insight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InsightUpdateArgs>(args: SelectSubset<T, InsightUpdateArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Insights.
     * @param {InsightDeleteManyArgs} args - Arguments to filter Insights to delete.
     * @example
     * // Delete a few Insights
     * const { count } = await prisma.insight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InsightDeleteManyArgs>(args?: SelectSubset<T, InsightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Insights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Insights
     * const insight = await prisma.insight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InsightUpdateManyArgs>(args: SelectSubset<T, InsightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Insights and returns the data updated in the database.
     * @param {InsightUpdateManyAndReturnArgs} args - Arguments to update many Insights.
     * @example
     * // Update many Insights
     * const insight = await prisma.insight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Insights and only return the `id`
     * const insightWithIdOnly = await prisma.insight.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InsightUpdateManyAndReturnArgs>(args: SelectSubset<T, InsightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Insight.
     * @param {InsightUpsertArgs} args - Arguments to update or create a Insight.
     * @example
     * // Update or create a Insight
     * const insight = await prisma.insight.upsert({
     *   create: {
     *     // ... data to create a Insight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Insight we want to update
     *   }
     * })
     */
    upsert<T extends InsightUpsertArgs>(args: SelectSubset<T, InsightUpsertArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Insights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightCountArgs} args - Arguments to filter Insights to count.
     * @example
     * // Count the number of Insights
     * const count = await prisma.insight.count({
     *   where: {
     *     // ... the filter for the Insights we want to count
     *   }
     * })
    **/
    count<T extends InsightCountArgs>(
      args?: Subset<T, InsightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InsightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Insight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InsightAggregateArgs>(args: Subset<T, InsightAggregateArgs>): Prisma.PrismaPromise<GetInsightAggregateType<T>>

    /**
     * Group by Insight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InsightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InsightGroupByArgs['orderBy'] }
        : { orderBy?: InsightGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InsightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInsightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Insight model
   */
  readonly fields: InsightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Insight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InsightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    statement<T extends Insight$statementArgs<ExtArgs> = {}>(args?: Subset<T, Insight$statementArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Insight model
   */
  interface InsightFieldRefs {
    readonly id: FieldRef<"Insight", 'String'>
    readonly userId: FieldRef<"Insight", 'String'>
    readonly statementId: FieldRef<"Insight", 'String'>
    readonly month: FieldRef<"Insight", 'String'>
    readonly score: FieldRef<"Insight", 'Int'>
    readonly summary: FieldRef<"Insight", 'String'>
    readonly recommendations: FieldRef<"Insight", 'Json'>
    readonly createdAt: FieldRef<"Insight", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Insight findUnique
   */
  export type InsightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insight to fetch.
     */
    where: InsightWhereUniqueInput
  }

  /**
   * Insight findUniqueOrThrow
   */
  export type InsightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insight to fetch.
     */
    where: InsightWhereUniqueInput
  }

  /**
   * Insight findFirst
   */
  export type InsightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insight to fetch.
     */
    where?: InsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insights to fetch.
     */
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Insights.
     */
    cursor?: InsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Insights.
     */
    distinct?: InsightScalarFieldEnum | InsightScalarFieldEnum[]
  }

  /**
   * Insight findFirstOrThrow
   */
  export type InsightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insight to fetch.
     */
    where?: InsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insights to fetch.
     */
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Insights.
     */
    cursor?: InsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Insights.
     */
    distinct?: InsightScalarFieldEnum | InsightScalarFieldEnum[]
  }

  /**
   * Insight findMany
   */
  export type InsightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insights to fetch.
     */
    where?: InsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insights to fetch.
     */
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Insights.
     */
    cursor?: InsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Insights.
     */
    distinct?: InsightScalarFieldEnum | InsightScalarFieldEnum[]
  }

  /**
   * Insight create
   */
  export type InsightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * The data needed to create a Insight.
     */
    data: XOR<InsightCreateInput, InsightUncheckedCreateInput>
  }

  /**
   * Insight createMany
   */
  export type InsightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Insights.
     */
    data: InsightCreateManyInput | InsightCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Insight createManyAndReturn
   */
  export type InsightCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * The data used to create many Insights.
     */
    data: InsightCreateManyInput | InsightCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Insight update
   */
  export type InsightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * The data needed to update a Insight.
     */
    data: XOR<InsightUpdateInput, InsightUncheckedUpdateInput>
    /**
     * Choose, which Insight to update.
     */
    where: InsightWhereUniqueInput
  }

  /**
   * Insight updateMany
   */
  export type InsightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Insights.
     */
    data: XOR<InsightUpdateManyMutationInput, InsightUncheckedUpdateManyInput>
    /**
     * Filter which Insights to update
     */
    where?: InsightWhereInput
    /**
     * Limit how many Insights to update.
     */
    limit?: number
  }

  /**
   * Insight updateManyAndReturn
   */
  export type InsightUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * The data used to update Insights.
     */
    data: XOR<InsightUpdateManyMutationInput, InsightUncheckedUpdateManyInput>
    /**
     * Filter which Insights to update
     */
    where?: InsightWhereInput
    /**
     * Limit how many Insights to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Insight upsert
   */
  export type InsightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * The filter to search for the Insight to update in case it exists.
     */
    where: InsightWhereUniqueInput
    /**
     * In case the Insight found by the `where` argument doesn't exist, create a new Insight with this data.
     */
    create: XOR<InsightCreateInput, InsightUncheckedCreateInput>
    /**
     * In case the Insight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InsightUpdateInput, InsightUncheckedUpdateInput>
  }

  /**
   * Insight delete
   */
  export type InsightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter which Insight to delete.
     */
    where: InsightWhereUniqueInput
  }

  /**
   * Insight deleteMany
   */
  export type InsightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Insights to delete
     */
    where?: InsightWhereInput
    /**
     * Limit how many Insights to delete.
     */
    limit?: number
  }

  /**
   * Insight.statement
   */
  export type Insight$statementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Statement
     */
    omit?: StatementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    where?: StatementWhereInput
  }

  /**
   * Insight without action
   */
  export type InsightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
  }


  /**
   * Model MerchantMap
   */

  export type AggregateMerchantMap = {
    _count: MerchantMapCountAggregateOutputType | null
    _min: MerchantMapMinAggregateOutputType | null
    _max: MerchantMapMaxAggregateOutputType | null
  }

  export type MerchantMapMinAggregateOutputType = {
    id: string | null
    normalizedName: string | null
    category: string | null
    createdBy: string | null
  }

  export type MerchantMapMaxAggregateOutputType = {
    id: string | null
    normalizedName: string | null
    category: string | null
    createdBy: string | null
  }

  export type MerchantMapCountAggregateOutputType = {
    id: number
    normalizedName: number
    category: number
    createdBy: number
    _all: number
  }


  export type MerchantMapMinAggregateInputType = {
    id?: true
    normalizedName?: true
    category?: true
    createdBy?: true
  }

  export type MerchantMapMaxAggregateInputType = {
    id?: true
    normalizedName?: true
    category?: true
    createdBy?: true
  }

  export type MerchantMapCountAggregateInputType = {
    id?: true
    normalizedName?: true
    category?: true
    createdBy?: true
    _all?: true
  }

  export type MerchantMapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerchantMap to aggregate.
     */
    where?: MerchantMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantMaps to fetch.
     */
    orderBy?: MerchantMapOrderByWithRelationInput | MerchantMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MerchantMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MerchantMaps
    **/
    _count?: true | MerchantMapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MerchantMapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MerchantMapMaxAggregateInputType
  }

  export type GetMerchantMapAggregateType<T extends MerchantMapAggregateArgs> = {
        [P in keyof T & keyof AggregateMerchantMap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMerchantMap[P]>
      : GetScalarType<T[P], AggregateMerchantMap[P]>
  }




  export type MerchantMapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MerchantMapWhereInput
    orderBy?: MerchantMapOrderByWithAggregationInput | MerchantMapOrderByWithAggregationInput[]
    by: MerchantMapScalarFieldEnum[] | MerchantMapScalarFieldEnum
    having?: MerchantMapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MerchantMapCountAggregateInputType | true
    _min?: MerchantMapMinAggregateInputType
    _max?: MerchantMapMaxAggregateInputType
  }

  export type MerchantMapGroupByOutputType = {
    id: string
    normalizedName: string
    category: string
    createdBy: string
    _count: MerchantMapCountAggregateOutputType | null
    _min: MerchantMapMinAggregateOutputType | null
    _max: MerchantMapMaxAggregateOutputType | null
  }

  type GetMerchantMapGroupByPayload<T extends MerchantMapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MerchantMapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MerchantMapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MerchantMapGroupByOutputType[P]>
            : GetScalarType<T[P], MerchantMapGroupByOutputType[P]>
        }
      >
    >


  export type MerchantMapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    normalizedName?: boolean
    category?: boolean
    createdBy?: boolean
  }, ExtArgs["result"]["merchantMap"]>

  export type MerchantMapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    normalizedName?: boolean
    category?: boolean
    createdBy?: boolean
  }, ExtArgs["result"]["merchantMap"]>

  export type MerchantMapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    normalizedName?: boolean
    category?: boolean
    createdBy?: boolean
  }, ExtArgs["result"]["merchantMap"]>

  export type MerchantMapSelectScalar = {
    id?: boolean
    normalizedName?: boolean
    category?: boolean
    createdBy?: boolean
  }

  export type MerchantMapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "normalizedName" | "category" | "createdBy", ExtArgs["result"]["merchantMap"]>

  export type $MerchantMapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MerchantMap"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      normalizedName: string
      category: string
      createdBy: string
    }, ExtArgs["result"]["merchantMap"]>
    composites: {}
  }

  type MerchantMapGetPayload<S extends boolean | null | undefined | MerchantMapDefaultArgs> = $Result.GetResult<Prisma.$MerchantMapPayload, S>

  type MerchantMapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MerchantMapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MerchantMapCountAggregateInputType | true
    }

  export interface MerchantMapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MerchantMap'], meta: { name: 'MerchantMap' } }
    /**
     * Find zero or one MerchantMap that matches the filter.
     * @param {MerchantMapFindUniqueArgs} args - Arguments to find a MerchantMap
     * @example
     * // Get one MerchantMap
     * const merchantMap = await prisma.merchantMap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MerchantMapFindUniqueArgs>(args: SelectSubset<T, MerchantMapFindUniqueArgs<ExtArgs>>): Prisma__MerchantMapClient<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MerchantMap that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MerchantMapFindUniqueOrThrowArgs} args - Arguments to find a MerchantMap
     * @example
     * // Get one MerchantMap
     * const merchantMap = await prisma.merchantMap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MerchantMapFindUniqueOrThrowArgs>(args: SelectSubset<T, MerchantMapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MerchantMapClient<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerchantMap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantMapFindFirstArgs} args - Arguments to find a MerchantMap
     * @example
     * // Get one MerchantMap
     * const merchantMap = await prisma.merchantMap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MerchantMapFindFirstArgs>(args?: SelectSubset<T, MerchantMapFindFirstArgs<ExtArgs>>): Prisma__MerchantMapClient<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerchantMap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantMapFindFirstOrThrowArgs} args - Arguments to find a MerchantMap
     * @example
     * // Get one MerchantMap
     * const merchantMap = await prisma.merchantMap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MerchantMapFindFirstOrThrowArgs>(args?: SelectSubset<T, MerchantMapFindFirstOrThrowArgs<ExtArgs>>): Prisma__MerchantMapClient<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MerchantMaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantMapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MerchantMaps
     * const merchantMaps = await prisma.merchantMap.findMany()
     * 
     * // Get first 10 MerchantMaps
     * const merchantMaps = await prisma.merchantMap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const merchantMapWithIdOnly = await prisma.merchantMap.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MerchantMapFindManyArgs>(args?: SelectSubset<T, MerchantMapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MerchantMap.
     * @param {MerchantMapCreateArgs} args - Arguments to create a MerchantMap.
     * @example
     * // Create one MerchantMap
     * const MerchantMap = await prisma.merchantMap.create({
     *   data: {
     *     // ... data to create a MerchantMap
     *   }
     * })
     * 
     */
    create<T extends MerchantMapCreateArgs>(args: SelectSubset<T, MerchantMapCreateArgs<ExtArgs>>): Prisma__MerchantMapClient<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MerchantMaps.
     * @param {MerchantMapCreateManyArgs} args - Arguments to create many MerchantMaps.
     * @example
     * // Create many MerchantMaps
     * const merchantMap = await prisma.merchantMap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MerchantMapCreateManyArgs>(args?: SelectSubset<T, MerchantMapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MerchantMaps and returns the data saved in the database.
     * @param {MerchantMapCreateManyAndReturnArgs} args - Arguments to create many MerchantMaps.
     * @example
     * // Create many MerchantMaps
     * const merchantMap = await prisma.merchantMap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MerchantMaps and only return the `id`
     * const merchantMapWithIdOnly = await prisma.merchantMap.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MerchantMapCreateManyAndReturnArgs>(args?: SelectSubset<T, MerchantMapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MerchantMap.
     * @param {MerchantMapDeleteArgs} args - Arguments to delete one MerchantMap.
     * @example
     * // Delete one MerchantMap
     * const MerchantMap = await prisma.merchantMap.delete({
     *   where: {
     *     // ... filter to delete one MerchantMap
     *   }
     * })
     * 
     */
    delete<T extends MerchantMapDeleteArgs>(args: SelectSubset<T, MerchantMapDeleteArgs<ExtArgs>>): Prisma__MerchantMapClient<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MerchantMap.
     * @param {MerchantMapUpdateArgs} args - Arguments to update one MerchantMap.
     * @example
     * // Update one MerchantMap
     * const merchantMap = await prisma.merchantMap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MerchantMapUpdateArgs>(args: SelectSubset<T, MerchantMapUpdateArgs<ExtArgs>>): Prisma__MerchantMapClient<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MerchantMaps.
     * @param {MerchantMapDeleteManyArgs} args - Arguments to filter MerchantMaps to delete.
     * @example
     * // Delete a few MerchantMaps
     * const { count } = await prisma.merchantMap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MerchantMapDeleteManyArgs>(args?: SelectSubset<T, MerchantMapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerchantMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantMapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MerchantMaps
     * const merchantMap = await prisma.merchantMap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MerchantMapUpdateManyArgs>(args: SelectSubset<T, MerchantMapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerchantMaps and returns the data updated in the database.
     * @param {MerchantMapUpdateManyAndReturnArgs} args - Arguments to update many MerchantMaps.
     * @example
     * // Update many MerchantMaps
     * const merchantMap = await prisma.merchantMap.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MerchantMaps and only return the `id`
     * const merchantMapWithIdOnly = await prisma.merchantMap.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MerchantMapUpdateManyAndReturnArgs>(args: SelectSubset<T, MerchantMapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MerchantMap.
     * @param {MerchantMapUpsertArgs} args - Arguments to update or create a MerchantMap.
     * @example
     * // Update or create a MerchantMap
     * const merchantMap = await prisma.merchantMap.upsert({
     *   create: {
     *     // ... data to create a MerchantMap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MerchantMap we want to update
     *   }
     * })
     */
    upsert<T extends MerchantMapUpsertArgs>(args: SelectSubset<T, MerchantMapUpsertArgs<ExtArgs>>): Prisma__MerchantMapClient<$Result.GetResult<Prisma.$MerchantMapPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MerchantMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantMapCountArgs} args - Arguments to filter MerchantMaps to count.
     * @example
     * // Count the number of MerchantMaps
     * const count = await prisma.merchantMap.count({
     *   where: {
     *     // ... the filter for the MerchantMaps we want to count
     *   }
     * })
    **/
    count<T extends MerchantMapCountArgs>(
      args?: Subset<T, MerchantMapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MerchantMapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MerchantMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantMapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MerchantMapAggregateArgs>(args: Subset<T, MerchantMapAggregateArgs>): Prisma.PrismaPromise<GetMerchantMapAggregateType<T>>

    /**
     * Group by MerchantMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantMapGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MerchantMapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MerchantMapGroupByArgs['orderBy'] }
        : { orderBy?: MerchantMapGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MerchantMapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMerchantMapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MerchantMap model
   */
  readonly fields: MerchantMapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MerchantMap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MerchantMapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MerchantMap model
   */
  interface MerchantMapFieldRefs {
    readonly id: FieldRef<"MerchantMap", 'String'>
    readonly normalizedName: FieldRef<"MerchantMap", 'String'>
    readonly category: FieldRef<"MerchantMap", 'String'>
    readonly createdBy: FieldRef<"MerchantMap", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MerchantMap findUnique
   */
  export type MerchantMapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * Filter, which MerchantMap to fetch.
     */
    where: MerchantMapWhereUniqueInput
  }

  /**
   * MerchantMap findUniqueOrThrow
   */
  export type MerchantMapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * Filter, which MerchantMap to fetch.
     */
    where: MerchantMapWhereUniqueInput
  }

  /**
   * MerchantMap findFirst
   */
  export type MerchantMapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * Filter, which MerchantMap to fetch.
     */
    where?: MerchantMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantMaps to fetch.
     */
    orderBy?: MerchantMapOrderByWithRelationInput | MerchantMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerchantMaps.
     */
    cursor?: MerchantMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantMaps.
     */
    distinct?: MerchantMapScalarFieldEnum | MerchantMapScalarFieldEnum[]
  }

  /**
   * MerchantMap findFirstOrThrow
   */
  export type MerchantMapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * Filter, which MerchantMap to fetch.
     */
    where?: MerchantMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantMaps to fetch.
     */
    orderBy?: MerchantMapOrderByWithRelationInput | MerchantMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerchantMaps.
     */
    cursor?: MerchantMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantMaps.
     */
    distinct?: MerchantMapScalarFieldEnum | MerchantMapScalarFieldEnum[]
  }

  /**
   * MerchantMap findMany
   */
  export type MerchantMapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * Filter, which MerchantMaps to fetch.
     */
    where?: MerchantMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantMaps to fetch.
     */
    orderBy?: MerchantMapOrderByWithRelationInput | MerchantMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MerchantMaps.
     */
    cursor?: MerchantMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantMaps.
     */
    distinct?: MerchantMapScalarFieldEnum | MerchantMapScalarFieldEnum[]
  }

  /**
   * MerchantMap create
   */
  export type MerchantMapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * The data needed to create a MerchantMap.
     */
    data: XOR<MerchantMapCreateInput, MerchantMapUncheckedCreateInput>
  }

  /**
   * MerchantMap createMany
   */
  export type MerchantMapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MerchantMaps.
     */
    data: MerchantMapCreateManyInput | MerchantMapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MerchantMap createManyAndReturn
   */
  export type MerchantMapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * The data used to create many MerchantMaps.
     */
    data: MerchantMapCreateManyInput | MerchantMapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MerchantMap update
   */
  export type MerchantMapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * The data needed to update a MerchantMap.
     */
    data: XOR<MerchantMapUpdateInput, MerchantMapUncheckedUpdateInput>
    /**
     * Choose, which MerchantMap to update.
     */
    where: MerchantMapWhereUniqueInput
  }

  /**
   * MerchantMap updateMany
   */
  export type MerchantMapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MerchantMaps.
     */
    data: XOR<MerchantMapUpdateManyMutationInput, MerchantMapUncheckedUpdateManyInput>
    /**
     * Filter which MerchantMaps to update
     */
    where?: MerchantMapWhereInput
    /**
     * Limit how many MerchantMaps to update.
     */
    limit?: number
  }

  /**
   * MerchantMap updateManyAndReturn
   */
  export type MerchantMapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * The data used to update MerchantMaps.
     */
    data: XOR<MerchantMapUpdateManyMutationInput, MerchantMapUncheckedUpdateManyInput>
    /**
     * Filter which MerchantMaps to update
     */
    where?: MerchantMapWhereInput
    /**
     * Limit how many MerchantMaps to update.
     */
    limit?: number
  }

  /**
   * MerchantMap upsert
   */
  export type MerchantMapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * The filter to search for the MerchantMap to update in case it exists.
     */
    where: MerchantMapWhereUniqueInput
    /**
     * In case the MerchantMap found by the `where` argument doesn't exist, create a new MerchantMap with this data.
     */
    create: XOR<MerchantMapCreateInput, MerchantMapUncheckedCreateInput>
    /**
     * In case the MerchantMap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MerchantMapUpdateInput, MerchantMapUncheckedUpdateInput>
  }

  /**
   * MerchantMap delete
   */
  export type MerchantMapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
    /**
     * Filter which MerchantMap to delete.
     */
    where: MerchantMapWhereUniqueInput
  }

  /**
   * MerchantMap deleteMany
   */
  export type MerchantMapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerchantMaps to delete
     */
    where?: MerchantMapWhereInput
    /**
     * Limit how many MerchantMaps to delete.
     */
    limit?: number
  }

  /**
   * MerchantMap without action
   */
  export type MerchantMapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantMap
     */
    select?: MerchantMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantMap
     */
    omit?: MerchantMapOmit<ExtArgs> | null
  }


  /**
   * Model LearningResource
   */

  export type AggregateLearningResource = {
    _count: LearningResourceCountAggregateOutputType | null
    _min: LearningResourceMinAggregateOutputType | null
    _max: LearningResourceMaxAggregateOutputType | null
  }

  export type LearningResourceMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: string | null
    category: string | null
    url: string | null
    thumbnailUrl: string | null
    author: string | null
    createdAt: Date | null
  }

  export type LearningResourceMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: string | null
    category: string | null
    url: string | null
    thumbnailUrl: string | null
    author: string | null
    createdAt: Date | null
  }

  export type LearningResourceCountAggregateOutputType = {
    id: number
    title: number
    description: number
    type: number
    category: number
    url: number
    thumbnailUrl: number
    author: number
    tags: number
    createdAt: number
    _all: number
  }


  export type LearningResourceMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    category?: true
    url?: true
    thumbnailUrl?: true
    author?: true
    createdAt?: true
  }

  export type LearningResourceMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    category?: true
    url?: true
    thumbnailUrl?: true
    author?: true
    createdAt?: true
  }

  export type LearningResourceCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    category?: true
    url?: true
    thumbnailUrl?: true
    author?: true
    tags?: true
    createdAt?: true
    _all?: true
  }

  export type LearningResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningResource to aggregate.
     */
    where?: LearningResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningResources to fetch.
     */
    orderBy?: LearningResourceOrderByWithRelationInput | LearningResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningResources
    **/
    _count?: true | LearningResourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningResourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningResourceMaxAggregateInputType
  }

  export type GetLearningResourceAggregateType<T extends LearningResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningResource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningResource[P]>
      : GetScalarType<T[P], AggregateLearningResource[P]>
  }




  export type LearningResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningResourceWhereInput
    orderBy?: LearningResourceOrderByWithAggregationInput | LearningResourceOrderByWithAggregationInput[]
    by: LearningResourceScalarFieldEnum[] | LearningResourceScalarFieldEnum
    having?: LearningResourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningResourceCountAggregateInputType | true
    _min?: LearningResourceMinAggregateInputType
    _max?: LearningResourceMaxAggregateInputType
  }

  export type LearningResourceGroupByOutputType = {
    id: string
    title: string
    description: string
    type: string
    category: string
    url: string
    thumbnailUrl: string | null
    author: string | null
    tags: string[]
    createdAt: Date
    _count: LearningResourceCountAggregateOutputType | null
    _min: LearningResourceMinAggregateOutputType | null
    _max: LearningResourceMaxAggregateOutputType | null
  }

  type GetLearningResourceGroupByPayload<T extends LearningResourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningResourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningResourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningResourceGroupByOutputType[P]>
            : GetScalarType<T[P], LearningResourceGroupByOutputType[P]>
        }
      >
    >


  export type LearningResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    category?: boolean
    url?: boolean
    thumbnailUrl?: boolean
    author?: boolean
    tags?: boolean
    createdAt?: boolean
    interactions?: boolean | LearningResource$interactionsArgs<ExtArgs>
    _count?: boolean | LearningResourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningResource"]>

  export type LearningResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    category?: boolean
    url?: boolean
    thumbnailUrl?: boolean
    author?: boolean
    tags?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["learningResource"]>

  export type LearningResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    category?: boolean
    url?: boolean
    thumbnailUrl?: boolean
    author?: boolean
    tags?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["learningResource"]>

  export type LearningResourceSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    category?: boolean
    url?: boolean
    thumbnailUrl?: boolean
    author?: boolean
    tags?: boolean
    createdAt?: boolean
  }

  export type LearningResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "type" | "category" | "url" | "thumbnailUrl" | "author" | "tags" | "createdAt", ExtArgs["result"]["learningResource"]>
  export type LearningResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interactions?: boolean | LearningResource$interactionsArgs<ExtArgs>
    _count?: boolean | LearningResourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LearningResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LearningResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LearningResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningResource"
    objects: {
      interactions: Prisma.$ResourceInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      type: string
      category: string
      url: string
      thumbnailUrl: string | null
      author: string | null
      tags: string[]
      createdAt: Date
    }, ExtArgs["result"]["learningResource"]>
    composites: {}
  }

  type LearningResourceGetPayload<S extends boolean | null | undefined | LearningResourceDefaultArgs> = $Result.GetResult<Prisma.$LearningResourcePayload, S>

  type LearningResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningResourceCountAggregateInputType | true
    }

  export interface LearningResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningResource'], meta: { name: 'LearningResource' } }
    /**
     * Find zero or one LearningResource that matches the filter.
     * @param {LearningResourceFindUniqueArgs} args - Arguments to find a LearningResource
     * @example
     * // Get one LearningResource
     * const learningResource = await prisma.learningResource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningResourceFindUniqueArgs>(args: SelectSubset<T, LearningResourceFindUniqueArgs<ExtArgs>>): Prisma__LearningResourceClient<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningResource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningResourceFindUniqueOrThrowArgs} args - Arguments to find a LearningResource
     * @example
     * // Get one LearningResource
     * const learningResource = await prisma.learningResource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningResourceClient<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningResource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningResourceFindFirstArgs} args - Arguments to find a LearningResource
     * @example
     * // Get one LearningResource
     * const learningResource = await prisma.learningResource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningResourceFindFirstArgs>(args?: SelectSubset<T, LearningResourceFindFirstArgs<ExtArgs>>): Prisma__LearningResourceClient<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningResource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningResourceFindFirstOrThrowArgs} args - Arguments to find a LearningResource
     * @example
     * // Get one LearningResource
     * const learningResource = await prisma.learningResource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningResourceClient<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningResources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningResources
     * const learningResources = await prisma.learningResource.findMany()
     * 
     * // Get first 10 LearningResources
     * const learningResources = await prisma.learningResource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningResourceWithIdOnly = await prisma.learningResource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningResourceFindManyArgs>(args?: SelectSubset<T, LearningResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningResource.
     * @param {LearningResourceCreateArgs} args - Arguments to create a LearningResource.
     * @example
     * // Create one LearningResource
     * const LearningResource = await prisma.learningResource.create({
     *   data: {
     *     // ... data to create a LearningResource
     *   }
     * })
     * 
     */
    create<T extends LearningResourceCreateArgs>(args: SelectSubset<T, LearningResourceCreateArgs<ExtArgs>>): Prisma__LearningResourceClient<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningResources.
     * @param {LearningResourceCreateManyArgs} args - Arguments to create many LearningResources.
     * @example
     * // Create many LearningResources
     * const learningResource = await prisma.learningResource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningResourceCreateManyArgs>(args?: SelectSubset<T, LearningResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningResources and returns the data saved in the database.
     * @param {LearningResourceCreateManyAndReturnArgs} args - Arguments to create many LearningResources.
     * @example
     * // Create many LearningResources
     * const learningResource = await prisma.learningResource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningResources and only return the `id`
     * const learningResourceWithIdOnly = await prisma.learningResource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningResource.
     * @param {LearningResourceDeleteArgs} args - Arguments to delete one LearningResource.
     * @example
     * // Delete one LearningResource
     * const LearningResource = await prisma.learningResource.delete({
     *   where: {
     *     // ... filter to delete one LearningResource
     *   }
     * })
     * 
     */
    delete<T extends LearningResourceDeleteArgs>(args: SelectSubset<T, LearningResourceDeleteArgs<ExtArgs>>): Prisma__LearningResourceClient<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningResource.
     * @param {LearningResourceUpdateArgs} args - Arguments to update one LearningResource.
     * @example
     * // Update one LearningResource
     * const learningResource = await prisma.learningResource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningResourceUpdateArgs>(args: SelectSubset<T, LearningResourceUpdateArgs<ExtArgs>>): Prisma__LearningResourceClient<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningResources.
     * @param {LearningResourceDeleteManyArgs} args - Arguments to filter LearningResources to delete.
     * @example
     * // Delete a few LearningResources
     * const { count } = await prisma.learningResource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningResourceDeleteManyArgs>(args?: SelectSubset<T, LearningResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningResources
     * const learningResource = await prisma.learningResource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningResourceUpdateManyArgs>(args: SelectSubset<T, LearningResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningResources and returns the data updated in the database.
     * @param {LearningResourceUpdateManyAndReturnArgs} args - Arguments to update many LearningResources.
     * @example
     * // Update many LearningResources
     * const learningResource = await prisma.learningResource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningResources and only return the `id`
     * const learningResourceWithIdOnly = await prisma.learningResource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningResource.
     * @param {LearningResourceUpsertArgs} args - Arguments to update or create a LearningResource.
     * @example
     * // Update or create a LearningResource
     * const learningResource = await prisma.learningResource.upsert({
     *   create: {
     *     // ... data to create a LearningResource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningResource we want to update
     *   }
     * })
     */
    upsert<T extends LearningResourceUpsertArgs>(args: SelectSubset<T, LearningResourceUpsertArgs<ExtArgs>>): Prisma__LearningResourceClient<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningResourceCountArgs} args - Arguments to filter LearningResources to count.
     * @example
     * // Count the number of LearningResources
     * const count = await prisma.learningResource.count({
     *   where: {
     *     // ... the filter for the LearningResources we want to count
     *   }
     * })
    **/
    count<T extends LearningResourceCountArgs>(
      args?: Subset<T, LearningResourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningResourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningResourceAggregateArgs>(args: Subset<T, LearningResourceAggregateArgs>): Prisma.PrismaPromise<GetLearningResourceAggregateType<T>>

    /**
     * Group by LearningResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningResourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningResourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningResourceGroupByArgs['orderBy'] }
        : { orderBy?: LearningResourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningResource model
   */
  readonly fields: LearningResourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningResource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    interactions<T extends LearningResource$interactionsArgs<ExtArgs> = {}>(args?: Subset<T, LearningResource$interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningResource model
   */
  interface LearningResourceFieldRefs {
    readonly id: FieldRef<"LearningResource", 'String'>
    readonly title: FieldRef<"LearningResource", 'String'>
    readonly description: FieldRef<"LearningResource", 'String'>
    readonly type: FieldRef<"LearningResource", 'String'>
    readonly category: FieldRef<"LearningResource", 'String'>
    readonly url: FieldRef<"LearningResource", 'String'>
    readonly thumbnailUrl: FieldRef<"LearningResource", 'String'>
    readonly author: FieldRef<"LearningResource", 'String'>
    readonly tags: FieldRef<"LearningResource", 'String[]'>
    readonly createdAt: FieldRef<"LearningResource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningResource findUnique
   */
  export type LearningResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
    /**
     * Filter, which LearningResource to fetch.
     */
    where: LearningResourceWhereUniqueInput
  }

  /**
   * LearningResource findUniqueOrThrow
   */
  export type LearningResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
    /**
     * Filter, which LearningResource to fetch.
     */
    where: LearningResourceWhereUniqueInput
  }

  /**
   * LearningResource findFirst
   */
  export type LearningResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
    /**
     * Filter, which LearningResource to fetch.
     */
    where?: LearningResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningResources to fetch.
     */
    orderBy?: LearningResourceOrderByWithRelationInput | LearningResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningResources.
     */
    cursor?: LearningResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningResources.
     */
    distinct?: LearningResourceScalarFieldEnum | LearningResourceScalarFieldEnum[]
  }

  /**
   * LearningResource findFirstOrThrow
   */
  export type LearningResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
    /**
     * Filter, which LearningResource to fetch.
     */
    where?: LearningResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningResources to fetch.
     */
    orderBy?: LearningResourceOrderByWithRelationInput | LearningResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningResources.
     */
    cursor?: LearningResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningResources.
     */
    distinct?: LearningResourceScalarFieldEnum | LearningResourceScalarFieldEnum[]
  }

  /**
   * LearningResource findMany
   */
  export type LearningResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
    /**
     * Filter, which LearningResources to fetch.
     */
    where?: LearningResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningResources to fetch.
     */
    orderBy?: LearningResourceOrderByWithRelationInput | LearningResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningResources.
     */
    cursor?: LearningResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningResources.
     */
    distinct?: LearningResourceScalarFieldEnum | LearningResourceScalarFieldEnum[]
  }

  /**
   * LearningResource create
   */
  export type LearningResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningResource.
     */
    data: XOR<LearningResourceCreateInput, LearningResourceUncheckedCreateInput>
  }

  /**
   * LearningResource createMany
   */
  export type LearningResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningResources.
     */
    data: LearningResourceCreateManyInput | LearningResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningResource createManyAndReturn
   */
  export type LearningResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * The data used to create many LearningResources.
     */
    data: LearningResourceCreateManyInput | LearningResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningResource update
   */
  export type LearningResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningResource.
     */
    data: XOR<LearningResourceUpdateInput, LearningResourceUncheckedUpdateInput>
    /**
     * Choose, which LearningResource to update.
     */
    where: LearningResourceWhereUniqueInput
  }

  /**
   * LearningResource updateMany
   */
  export type LearningResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningResources.
     */
    data: XOR<LearningResourceUpdateManyMutationInput, LearningResourceUncheckedUpdateManyInput>
    /**
     * Filter which LearningResources to update
     */
    where?: LearningResourceWhereInput
    /**
     * Limit how many LearningResources to update.
     */
    limit?: number
  }

  /**
   * LearningResource updateManyAndReturn
   */
  export type LearningResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * The data used to update LearningResources.
     */
    data: XOR<LearningResourceUpdateManyMutationInput, LearningResourceUncheckedUpdateManyInput>
    /**
     * Filter which LearningResources to update
     */
    where?: LearningResourceWhereInput
    /**
     * Limit how many LearningResources to update.
     */
    limit?: number
  }

  /**
   * LearningResource upsert
   */
  export type LearningResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningResource to update in case it exists.
     */
    where: LearningResourceWhereUniqueInput
    /**
     * In case the LearningResource found by the `where` argument doesn't exist, create a new LearningResource with this data.
     */
    create: XOR<LearningResourceCreateInput, LearningResourceUncheckedCreateInput>
    /**
     * In case the LearningResource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningResourceUpdateInput, LearningResourceUncheckedUpdateInput>
  }

  /**
   * LearningResource delete
   */
  export type LearningResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
    /**
     * Filter which LearningResource to delete.
     */
    where: LearningResourceWhereUniqueInput
  }

  /**
   * LearningResource deleteMany
   */
  export type LearningResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningResources to delete
     */
    where?: LearningResourceWhereInput
    /**
     * Limit how many LearningResources to delete.
     */
    limit?: number
  }

  /**
   * LearningResource.interactions
   */
  export type LearningResource$interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    where?: ResourceInteractionWhereInput
    orderBy?: ResourceInteractionOrderByWithRelationInput | ResourceInteractionOrderByWithRelationInput[]
    cursor?: ResourceInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceInteractionScalarFieldEnum | ResourceInteractionScalarFieldEnum[]
  }

  /**
   * LearningResource without action
   */
  export type LearningResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningResource
     */
    select?: LearningResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningResource
     */
    omit?: LearningResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningResourceInclude<ExtArgs> | null
  }


  /**
   * Model ResourceInteraction
   */

  export type AggregateResourceInteraction = {
    _count: ResourceInteractionCountAggregateOutputType | null
    _min: ResourceInteractionMinAggregateOutputType | null
    _max: ResourceInteractionMaxAggregateOutputType | null
  }

  export type ResourceInteractionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    resourceId: string | null
    type: string | null
    interactedAt: Date | null
  }

  export type ResourceInteractionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    resourceId: string | null
    type: string | null
    interactedAt: Date | null
  }

  export type ResourceInteractionCountAggregateOutputType = {
    id: number
    userId: number
    resourceId: number
    type: number
    interactedAt: number
    _all: number
  }


  export type ResourceInteractionMinAggregateInputType = {
    id?: true
    userId?: true
    resourceId?: true
    type?: true
    interactedAt?: true
  }

  export type ResourceInteractionMaxAggregateInputType = {
    id?: true
    userId?: true
    resourceId?: true
    type?: true
    interactedAt?: true
  }

  export type ResourceInteractionCountAggregateInputType = {
    id?: true
    userId?: true
    resourceId?: true
    type?: true
    interactedAt?: true
    _all?: true
  }

  export type ResourceInteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceInteraction to aggregate.
     */
    where?: ResourceInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceInteractions to fetch.
     */
    orderBy?: ResourceInteractionOrderByWithRelationInput | ResourceInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResourceInteractions
    **/
    _count?: true | ResourceInteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceInteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceInteractionMaxAggregateInputType
  }

  export type GetResourceInteractionAggregateType<T extends ResourceInteractionAggregateArgs> = {
        [P in keyof T & keyof AggregateResourceInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResourceInteraction[P]>
      : GetScalarType<T[P], AggregateResourceInteraction[P]>
  }




  export type ResourceInteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceInteractionWhereInput
    orderBy?: ResourceInteractionOrderByWithAggregationInput | ResourceInteractionOrderByWithAggregationInput[]
    by: ResourceInteractionScalarFieldEnum[] | ResourceInteractionScalarFieldEnum
    having?: ResourceInteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceInteractionCountAggregateInputType | true
    _min?: ResourceInteractionMinAggregateInputType
    _max?: ResourceInteractionMaxAggregateInputType
  }

  export type ResourceInteractionGroupByOutputType = {
    id: string
    userId: string
    resourceId: string
    type: string
    interactedAt: Date
    _count: ResourceInteractionCountAggregateOutputType | null
    _min: ResourceInteractionMinAggregateOutputType | null
    _max: ResourceInteractionMaxAggregateOutputType | null
  }

  type GetResourceInteractionGroupByPayload<T extends ResourceInteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceInteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceInteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceInteractionGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceInteractionGroupByOutputType[P]>
        }
      >
    >


  export type ResourceInteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    resourceId?: boolean
    type?: boolean
    interactedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | LearningResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceInteraction"]>

  export type ResourceInteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    resourceId?: boolean
    type?: boolean
    interactedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | LearningResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceInteraction"]>

  export type ResourceInteractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    resourceId?: boolean
    type?: boolean
    interactedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | LearningResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceInteraction"]>

  export type ResourceInteractionSelectScalar = {
    id?: boolean
    userId?: boolean
    resourceId?: boolean
    type?: boolean
    interactedAt?: boolean
  }

  export type ResourceInteractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "resourceId" | "type" | "interactedAt", ExtArgs["result"]["resourceInteraction"]>
  export type ResourceInteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | LearningResourceDefaultArgs<ExtArgs>
  }
  export type ResourceInteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | LearningResourceDefaultArgs<ExtArgs>
  }
  export type ResourceInteractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | LearningResourceDefaultArgs<ExtArgs>
  }

  export type $ResourceInteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResourceInteraction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      resource: Prisma.$LearningResourcePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      resourceId: string
      type: string
      interactedAt: Date
    }, ExtArgs["result"]["resourceInteraction"]>
    composites: {}
  }

  type ResourceInteractionGetPayload<S extends boolean | null | undefined | ResourceInteractionDefaultArgs> = $Result.GetResult<Prisma.$ResourceInteractionPayload, S>

  type ResourceInteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceInteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceInteractionCountAggregateInputType | true
    }

  export interface ResourceInteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResourceInteraction'], meta: { name: 'ResourceInteraction' } }
    /**
     * Find zero or one ResourceInteraction that matches the filter.
     * @param {ResourceInteractionFindUniqueArgs} args - Arguments to find a ResourceInteraction
     * @example
     * // Get one ResourceInteraction
     * const resourceInteraction = await prisma.resourceInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceInteractionFindUniqueArgs>(args: SelectSubset<T, ResourceInteractionFindUniqueArgs<ExtArgs>>): Prisma__ResourceInteractionClient<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResourceInteraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceInteractionFindUniqueOrThrowArgs} args - Arguments to find a ResourceInteraction
     * @example
     * // Get one ResourceInteraction
     * const resourceInteraction = await prisma.resourceInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceInteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceInteractionClient<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceInteractionFindFirstArgs} args - Arguments to find a ResourceInteraction
     * @example
     * // Get one ResourceInteraction
     * const resourceInteraction = await prisma.resourceInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceInteractionFindFirstArgs>(args?: SelectSubset<T, ResourceInteractionFindFirstArgs<ExtArgs>>): Prisma__ResourceInteractionClient<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceInteractionFindFirstOrThrowArgs} args - Arguments to find a ResourceInteraction
     * @example
     * // Get one ResourceInteraction
     * const resourceInteraction = await prisma.resourceInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceInteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceInteractionClient<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResourceInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResourceInteractions
     * const resourceInteractions = await prisma.resourceInteraction.findMany()
     * 
     * // Get first 10 ResourceInteractions
     * const resourceInteractions = await prisma.resourceInteraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceInteractionWithIdOnly = await prisma.resourceInteraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceInteractionFindManyArgs>(args?: SelectSubset<T, ResourceInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResourceInteraction.
     * @param {ResourceInteractionCreateArgs} args - Arguments to create a ResourceInteraction.
     * @example
     * // Create one ResourceInteraction
     * const ResourceInteraction = await prisma.resourceInteraction.create({
     *   data: {
     *     // ... data to create a ResourceInteraction
     *   }
     * })
     * 
     */
    create<T extends ResourceInteractionCreateArgs>(args: SelectSubset<T, ResourceInteractionCreateArgs<ExtArgs>>): Prisma__ResourceInteractionClient<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResourceInteractions.
     * @param {ResourceInteractionCreateManyArgs} args - Arguments to create many ResourceInteractions.
     * @example
     * // Create many ResourceInteractions
     * const resourceInteraction = await prisma.resourceInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceInteractionCreateManyArgs>(args?: SelectSubset<T, ResourceInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResourceInteractions and returns the data saved in the database.
     * @param {ResourceInteractionCreateManyAndReturnArgs} args - Arguments to create many ResourceInteractions.
     * @example
     * // Create many ResourceInteractions
     * const resourceInteraction = await prisma.resourceInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResourceInteractions and only return the `id`
     * const resourceInteractionWithIdOnly = await prisma.resourceInteraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceInteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResourceInteraction.
     * @param {ResourceInteractionDeleteArgs} args - Arguments to delete one ResourceInteraction.
     * @example
     * // Delete one ResourceInteraction
     * const ResourceInteraction = await prisma.resourceInteraction.delete({
     *   where: {
     *     // ... filter to delete one ResourceInteraction
     *   }
     * })
     * 
     */
    delete<T extends ResourceInteractionDeleteArgs>(args: SelectSubset<T, ResourceInteractionDeleteArgs<ExtArgs>>): Prisma__ResourceInteractionClient<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResourceInteraction.
     * @param {ResourceInteractionUpdateArgs} args - Arguments to update one ResourceInteraction.
     * @example
     * // Update one ResourceInteraction
     * const resourceInteraction = await prisma.resourceInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceInteractionUpdateArgs>(args: SelectSubset<T, ResourceInteractionUpdateArgs<ExtArgs>>): Prisma__ResourceInteractionClient<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResourceInteractions.
     * @param {ResourceInteractionDeleteManyArgs} args - Arguments to filter ResourceInteractions to delete.
     * @example
     * // Delete a few ResourceInteractions
     * const { count } = await prisma.resourceInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceInteractionDeleteManyArgs>(args?: SelectSubset<T, ResourceInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResourceInteractions
     * const resourceInteraction = await prisma.resourceInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceInteractionUpdateManyArgs>(args: SelectSubset<T, ResourceInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceInteractions and returns the data updated in the database.
     * @param {ResourceInteractionUpdateManyAndReturnArgs} args - Arguments to update many ResourceInteractions.
     * @example
     * // Update many ResourceInteractions
     * const resourceInteraction = await prisma.resourceInteraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResourceInteractions and only return the `id`
     * const resourceInteractionWithIdOnly = await prisma.resourceInteraction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceInteractionUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceInteractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResourceInteraction.
     * @param {ResourceInteractionUpsertArgs} args - Arguments to update or create a ResourceInteraction.
     * @example
     * // Update or create a ResourceInteraction
     * const resourceInteraction = await prisma.resourceInteraction.upsert({
     *   create: {
     *     // ... data to create a ResourceInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResourceInteraction we want to update
     *   }
     * })
     */
    upsert<T extends ResourceInteractionUpsertArgs>(args: SelectSubset<T, ResourceInteractionUpsertArgs<ExtArgs>>): Prisma__ResourceInteractionClient<$Result.GetResult<Prisma.$ResourceInteractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResourceInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceInteractionCountArgs} args - Arguments to filter ResourceInteractions to count.
     * @example
     * // Count the number of ResourceInteractions
     * const count = await prisma.resourceInteraction.count({
     *   where: {
     *     // ... the filter for the ResourceInteractions we want to count
     *   }
     * })
    **/
    count<T extends ResourceInteractionCountArgs>(
      args?: Subset<T, ResourceInteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceInteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResourceInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceInteractionAggregateArgs>(args: Subset<T, ResourceInteractionAggregateArgs>): Prisma.PrismaPromise<GetResourceInteractionAggregateType<T>>

    /**
     * Group by ResourceInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceInteractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceInteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceInteractionGroupByArgs['orderBy'] }
        : { orderBy?: ResourceInteractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResourceInteraction model
   */
  readonly fields: ResourceInteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResourceInteraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceInteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    resource<T extends LearningResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearningResourceDefaultArgs<ExtArgs>>): Prisma__LearningResourceClient<$Result.GetResult<Prisma.$LearningResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResourceInteraction model
   */
  interface ResourceInteractionFieldRefs {
    readonly id: FieldRef<"ResourceInteraction", 'String'>
    readonly userId: FieldRef<"ResourceInteraction", 'String'>
    readonly resourceId: FieldRef<"ResourceInteraction", 'String'>
    readonly type: FieldRef<"ResourceInteraction", 'String'>
    readonly interactedAt: FieldRef<"ResourceInteraction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResourceInteraction findUnique
   */
  export type ResourceInteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceInteraction to fetch.
     */
    where: ResourceInteractionWhereUniqueInput
  }

  /**
   * ResourceInteraction findUniqueOrThrow
   */
  export type ResourceInteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceInteraction to fetch.
     */
    where: ResourceInteractionWhereUniqueInput
  }

  /**
   * ResourceInteraction findFirst
   */
  export type ResourceInteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceInteraction to fetch.
     */
    where?: ResourceInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceInteractions to fetch.
     */
    orderBy?: ResourceInteractionOrderByWithRelationInput | ResourceInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceInteractions.
     */
    cursor?: ResourceInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceInteractions.
     */
    distinct?: ResourceInteractionScalarFieldEnum | ResourceInteractionScalarFieldEnum[]
  }

  /**
   * ResourceInteraction findFirstOrThrow
   */
  export type ResourceInteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceInteraction to fetch.
     */
    where?: ResourceInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceInteractions to fetch.
     */
    orderBy?: ResourceInteractionOrderByWithRelationInput | ResourceInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceInteractions.
     */
    cursor?: ResourceInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceInteractions.
     */
    distinct?: ResourceInteractionScalarFieldEnum | ResourceInteractionScalarFieldEnum[]
  }

  /**
   * ResourceInteraction findMany
   */
  export type ResourceInteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceInteractions to fetch.
     */
    where?: ResourceInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceInteractions to fetch.
     */
    orderBy?: ResourceInteractionOrderByWithRelationInput | ResourceInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResourceInteractions.
     */
    cursor?: ResourceInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceInteractions.
     */
    distinct?: ResourceInteractionScalarFieldEnum | ResourceInteractionScalarFieldEnum[]
  }

  /**
   * ResourceInteraction create
   */
  export type ResourceInteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a ResourceInteraction.
     */
    data: XOR<ResourceInteractionCreateInput, ResourceInteractionUncheckedCreateInput>
  }

  /**
   * ResourceInteraction createMany
   */
  export type ResourceInteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResourceInteractions.
     */
    data: ResourceInteractionCreateManyInput | ResourceInteractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResourceInteraction createManyAndReturn
   */
  export type ResourceInteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * The data used to create many ResourceInteractions.
     */
    data: ResourceInteractionCreateManyInput | ResourceInteractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceInteraction update
   */
  export type ResourceInteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a ResourceInteraction.
     */
    data: XOR<ResourceInteractionUpdateInput, ResourceInteractionUncheckedUpdateInput>
    /**
     * Choose, which ResourceInteraction to update.
     */
    where: ResourceInteractionWhereUniqueInput
  }

  /**
   * ResourceInteraction updateMany
   */
  export type ResourceInteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResourceInteractions.
     */
    data: XOR<ResourceInteractionUpdateManyMutationInput, ResourceInteractionUncheckedUpdateManyInput>
    /**
     * Filter which ResourceInteractions to update
     */
    where?: ResourceInteractionWhereInput
    /**
     * Limit how many ResourceInteractions to update.
     */
    limit?: number
  }

  /**
   * ResourceInteraction updateManyAndReturn
   */
  export type ResourceInteractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * The data used to update ResourceInteractions.
     */
    data: XOR<ResourceInteractionUpdateManyMutationInput, ResourceInteractionUncheckedUpdateManyInput>
    /**
     * Filter which ResourceInteractions to update
     */
    where?: ResourceInteractionWhereInput
    /**
     * Limit how many ResourceInteractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceInteraction upsert
   */
  export type ResourceInteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the ResourceInteraction to update in case it exists.
     */
    where: ResourceInteractionWhereUniqueInput
    /**
     * In case the ResourceInteraction found by the `where` argument doesn't exist, create a new ResourceInteraction with this data.
     */
    create: XOR<ResourceInteractionCreateInput, ResourceInteractionUncheckedCreateInput>
    /**
     * In case the ResourceInteraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceInteractionUpdateInput, ResourceInteractionUncheckedUpdateInput>
  }

  /**
   * ResourceInteraction delete
   */
  export type ResourceInteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
    /**
     * Filter which ResourceInteraction to delete.
     */
    where: ResourceInteractionWhereUniqueInput
  }

  /**
   * ResourceInteraction deleteMany
   */
  export type ResourceInteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceInteractions to delete
     */
    where?: ResourceInteractionWhereInput
    /**
     * Limit how many ResourceInteractions to delete.
     */
    limit?: number
  }

  /**
   * ResourceInteraction without action
   */
  export type ResourceInteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceInteraction
     */
    select?: ResourceInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceInteraction
     */
    omit?: ResourceInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInteractionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ChatScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    role: 'role',
    content: 'content',
    imageUrl: 'imageUrl',
    recommendations: 'recommendations',
    createdAt: 'createdAt'
  };

  export type ChatScalarFieldEnum = (typeof ChatScalarFieldEnum)[keyof typeof ChatScalarFieldEnum]


  export const BankAccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    accountHolderName: 'accountHolderName',
    accountNumber: 'accountNumber',
    ifscCode: 'ifscCode',
    bankName: 'bankName',
    branch: 'branch',
    createdAt: 'createdAt'
  };

  export type BankAccountScalarFieldEnum = (typeof BankAccountScalarFieldEnum)[keyof typeof BankAccountScalarFieldEnum]


  export const StatementScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    filePath: 'filePath',
    originalFilename: 'originalFilename',
    uploadedAt: 'uploadedAt',
    status: 'status',
    meta: 'meta',
    bankAccountId: 'bankAccountId'
  };

  export type StatementScalarFieldEnum = (typeof StatementScalarFieldEnum)[keyof typeof StatementScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    statementId: 'statementId',
    date: 'date',
    merchant: 'merchant',
    amount: 'amount',
    currency: 'currency',
    category: 'category',
    description: 'description',
    rawLine: 'rawLine'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const InsightScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    statementId: 'statementId',
    month: 'month',
    score: 'score',
    summary: 'summary',
    recommendations: 'recommendations',
    createdAt: 'createdAt'
  };

  export type InsightScalarFieldEnum = (typeof InsightScalarFieldEnum)[keyof typeof InsightScalarFieldEnum]


  export const MerchantMapScalarFieldEnum: {
    id: 'id',
    normalizedName: 'normalizedName',
    category: 'category',
    createdBy: 'createdBy'
  };

  export type MerchantMapScalarFieldEnum = (typeof MerchantMapScalarFieldEnum)[keyof typeof MerchantMapScalarFieldEnum]


  export const LearningResourceScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    type: 'type',
    category: 'category',
    url: 'url',
    thumbnailUrl: 'thumbnailUrl',
    author: 'author',
    tags: 'tags',
    createdAt: 'createdAt'
  };

  export type LearningResourceScalarFieldEnum = (typeof LearningResourceScalarFieldEnum)[keyof typeof LearningResourceScalarFieldEnum]


  export const ResourceInteractionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    resourceId: 'resourceId',
    type: 'type',
    interactedAt: 'interactedAt'
  };

  export type ResourceInteractionScalarFieldEnum = (typeof ResourceInteractionScalarFieldEnum)[keyof typeof ResourceInteractionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    statements?: StatementListRelationFilter
    transactions?: TransactionListRelationFilter
    insights?: InsightListRelationFilter
    chats?: ChatListRelationFilter
    bankAccounts?: BankAccountListRelationFilter
    resourceInteractions?: ResourceInteractionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    statements?: StatementOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    insights?: InsightOrderByRelationAggregateInput
    chats?: ChatOrderByRelationAggregateInput
    bankAccounts?: BankAccountOrderByRelationAggregateInput
    resourceInteractions?: ResourceInteractionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    statements?: StatementListRelationFilter
    transactions?: TransactionListRelationFilter
    insights?: InsightListRelationFilter
    chats?: ChatListRelationFilter
    bankAccounts?: BankAccountListRelationFilter
    resourceInteractions?: ResourceInteractionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ChatWhereInput = {
    AND?: ChatWhereInput | ChatWhereInput[]
    OR?: ChatWhereInput[]
    NOT?: ChatWhereInput | ChatWhereInput[]
    id?: StringFilter<"Chat"> | string
    userId?: StringFilter<"Chat"> | string
    role?: StringFilter<"Chat"> | string
    content?: StringFilter<"Chat"> | string
    imageUrl?: StringNullableFilter<"Chat"> | string | null
    recommendations?: JsonNullableFilter<"Chat">
    createdAt?: DateTimeFilter<"Chat"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ChatOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ChatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatWhereInput | ChatWhereInput[]
    OR?: ChatWhereInput[]
    NOT?: ChatWhereInput | ChatWhereInput[]
    userId?: StringFilter<"Chat"> | string
    role?: StringFilter<"Chat"> | string
    content?: StringFilter<"Chat"> | string
    imageUrl?: StringNullableFilter<"Chat"> | string | null
    recommendations?: JsonNullableFilter<"Chat">
    createdAt?: DateTimeFilter<"Chat"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ChatOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ChatCountOrderByAggregateInput
    _max?: ChatMaxOrderByAggregateInput
    _min?: ChatMinOrderByAggregateInput
  }

  export type ChatScalarWhereWithAggregatesInput = {
    AND?: ChatScalarWhereWithAggregatesInput | ChatScalarWhereWithAggregatesInput[]
    OR?: ChatScalarWhereWithAggregatesInput[]
    NOT?: ChatScalarWhereWithAggregatesInput | ChatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Chat"> | string
    userId?: StringWithAggregatesFilter<"Chat"> | string
    role?: StringWithAggregatesFilter<"Chat"> | string
    content?: StringWithAggregatesFilter<"Chat"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Chat"> | string | null
    recommendations?: JsonNullableWithAggregatesFilter<"Chat">
    createdAt?: DateTimeWithAggregatesFilter<"Chat"> | Date | string
  }

  export type BankAccountWhereInput = {
    AND?: BankAccountWhereInput | BankAccountWhereInput[]
    OR?: BankAccountWhereInput[]
    NOT?: BankAccountWhereInput | BankAccountWhereInput[]
    id?: StringFilter<"BankAccount"> | string
    userId?: StringFilter<"BankAccount"> | string
    accountHolderName?: StringFilter<"BankAccount"> | string
    accountNumber?: StringFilter<"BankAccount"> | string
    ifscCode?: StringNullableFilter<"BankAccount"> | string | null
    bankName?: StringFilter<"BankAccount"> | string
    branch?: StringNullableFilter<"BankAccount"> | string | null
    createdAt?: DateTimeFilter<"BankAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    statements?: StatementListRelationFilter
  }

  export type BankAccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountHolderName?: SortOrder
    accountNumber?: SortOrder
    ifscCode?: SortOrderInput | SortOrder
    bankName?: SortOrder
    branch?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    statements?: StatementOrderByRelationAggregateInput
  }

  export type BankAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_accountNumber?: BankAccountUserIdAccountNumberCompoundUniqueInput
    AND?: BankAccountWhereInput | BankAccountWhereInput[]
    OR?: BankAccountWhereInput[]
    NOT?: BankAccountWhereInput | BankAccountWhereInput[]
    userId?: StringFilter<"BankAccount"> | string
    accountHolderName?: StringFilter<"BankAccount"> | string
    accountNumber?: StringFilter<"BankAccount"> | string
    ifscCode?: StringNullableFilter<"BankAccount"> | string | null
    bankName?: StringFilter<"BankAccount"> | string
    branch?: StringNullableFilter<"BankAccount"> | string | null
    createdAt?: DateTimeFilter<"BankAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    statements?: StatementListRelationFilter
  }, "id" | "userId_accountNumber">

  export type BankAccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountHolderName?: SortOrder
    accountNumber?: SortOrder
    ifscCode?: SortOrderInput | SortOrder
    bankName?: SortOrder
    branch?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: BankAccountCountOrderByAggregateInput
    _max?: BankAccountMaxOrderByAggregateInput
    _min?: BankAccountMinOrderByAggregateInput
  }

  export type BankAccountScalarWhereWithAggregatesInput = {
    AND?: BankAccountScalarWhereWithAggregatesInput | BankAccountScalarWhereWithAggregatesInput[]
    OR?: BankAccountScalarWhereWithAggregatesInput[]
    NOT?: BankAccountScalarWhereWithAggregatesInput | BankAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BankAccount"> | string
    userId?: StringWithAggregatesFilter<"BankAccount"> | string
    accountHolderName?: StringWithAggregatesFilter<"BankAccount"> | string
    accountNumber?: StringWithAggregatesFilter<"BankAccount"> | string
    ifscCode?: StringNullableWithAggregatesFilter<"BankAccount"> | string | null
    bankName?: StringWithAggregatesFilter<"BankAccount"> | string
    branch?: StringNullableWithAggregatesFilter<"BankAccount"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BankAccount"> | Date | string
  }

  export type StatementWhereInput = {
    AND?: StatementWhereInput | StatementWhereInput[]
    OR?: StatementWhereInput[]
    NOT?: StatementWhereInput | StatementWhereInput[]
    id?: StringFilter<"Statement"> | string
    userId?: StringFilter<"Statement"> | string
    filePath?: StringFilter<"Statement"> | string
    originalFilename?: StringFilter<"Statement"> | string
    uploadedAt?: DateTimeFilter<"Statement"> | Date | string
    status?: StringFilter<"Statement"> | string
    meta?: JsonNullableFilter<"Statement">
    bankAccountId?: StringNullableFilter<"Statement"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    bankAccount?: XOR<BankAccountNullableScalarRelationFilter, BankAccountWhereInput> | null
    transactions?: TransactionListRelationFilter
    insights?: InsightListRelationFilter
  }

  export type StatementOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    filePath?: SortOrder
    originalFilename?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    meta?: SortOrderInput | SortOrder
    bankAccountId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    bankAccount?: BankAccountOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
    insights?: InsightOrderByRelationAggregateInput
  }

  export type StatementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StatementWhereInput | StatementWhereInput[]
    OR?: StatementWhereInput[]
    NOT?: StatementWhereInput | StatementWhereInput[]
    userId?: StringFilter<"Statement"> | string
    filePath?: StringFilter<"Statement"> | string
    originalFilename?: StringFilter<"Statement"> | string
    uploadedAt?: DateTimeFilter<"Statement"> | Date | string
    status?: StringFilter<"Statement"> | string
    meta?: JsonNullableFilter<"Statement">
    bankAccountId?: StringNullableFilter<"Statement"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    bankAccount?: XOR<BankAccountNullableScalarRelationFilter, BankAccountWhereInput> | null
    transactions?: TransactionListRelationFilter
    insights?: InsightListRelationFilter
  }, "id">

  export type StatementOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    filePath?: SortOrder
    originalFilename?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    meta?: SortOrderInput | SortOrder
    bankAccountId?: SortOrderInput | SortOrder
    _count?: StatementCountOrderByAggregateInput
    _max?: StatementMaxOrderByAggregateInput
    _min?: StatementMinOrderByAggregateInput
  }

  export type StatementScalarWhereWithAggregatesInput = {
    AND?: StatementScalarWhereWithAggregatesInput | StatementScalarWhereWithAggregatesInput[]
    OR?: StatementScalarWhereWithAggregatesInput[]
    NOT?: StatementScalarWhereWithAggregatesInput | StatementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Statement"> | string
    userId?: StringWithAggregatesFilter<"Statement"> | string
    filePath?: StringWithAggregatesFilter<"Statement"> | string
    originalFilename?: StringWithAggregatesFilter<"Statement"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"Statement"> | Date | string
    status?: StringWithAggregatesFilter<"Statement"> | string
    meta?: JsonNullableWithAggregatesFilter<"Statement">
    bankAccountId?: StringNullableWithAggregatesFilter<"Statement"> | string | null
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    statementId?: StringNullableFilter<"Transaction"> | string | null
    date?: DateTimeFilter<"Transaction"> | Date | string
    merchant?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    currency?: StringFilter<"Transaction"> | string
    category?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    rawLine?: StringFilter<"Transaction"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    statement?: XOR<StatementNullableScalarRelationFilter, StatementWhereInput> | null
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrderInput | SortOrder
    date?: SortOrder
    merchant?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    rawLine?: SortOrder
    user?: UserOrderByWithRelationInput
    statement?: StatementOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    userId?: StringFilter<"Transaction"> | string
    statementId?: StringNullableFilter<"Transaction"> | string | null
    date?: DateTimeFilter<"Transaction"> | Date | string
    merchant?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    currency?: StringFilter<"Transaction"> | string
    category?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    rawLine?: StringFilter<"Transaction"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    statement?: XOR<StatementNullableScalarRelationFilter, StatementWhereInput> | null
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrderInput | SortOrder
    date?: SortOrder
    merchant?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    rawLine?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    userId?: StringWithAggregatesFilter<"Transaction"> | string
    statementId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    merchant?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: FloatWithAggregatesFilter<"Transaction"> | number
    currency?: StringWithAggregatesFilter<"Transaction"> | string
    category?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    description?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    rawLine?: StringWithAggregatesFilter<"Transaction"> | string
  }

  export type InsightWhereInput = {
    AND?: InsightWhereInput | InsightWhereInput[]
    OR?: InsightWhereInput[]
    NOT?: InsightWhereInput | InsightWhereInput[]
    id?: StringFilter<"Insight"> | string
    userId?: StringFilter<"Insight"> | string
    statementId?: StringNullableFilter<"Insight"> | string | null
    month?: StringFilter<"Insight"> | string
    score?: IntNullableFilter<"Insight"> | number | null
    summary?: StringFilter<"Insight"> | string
    recommendations?: JsonNullableFilter<"Insight">
    createdAt?: DateTimeFilter<"Insight"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    statement?: XOR<StatementNullableScalarRelationFilter, StatementWhereInput> | null
  }

  export type InsightOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrderInput | SortOrder
    month?: SortOrder
    score?: SortOrderInput | SortOrder
    summary?: SortOrder
    recommendations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    statement?: StatementOrderByWithRelationInput
  }

  export type InsightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InsightWhereInput | InsightWhereInput[]
    OR?: InsightWhereInput[]
    NOT?: InsightWhereInput | InsightWhereInput[]
    userId?: StringFilter<"Insight"> | string
    statementId?: StringNullableFilter<"Insight"> | string | null
    month?: StringFilter<"Insight"> | string
    score?: IntNullableFilter<"Insight"> | number | null
    summary?: StringFilter<"Insight"> | string
    recommendations?: JsonNullableFilter<"Insight">
    createdAt?: DateTimeFilter<"Insight"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    statement?: XOR<StatementNullableScalarRelationFilter, StatementWhereInput> | null
  }, "id">

  export type InsightOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrderInput | SortOrder
    month?: SortOrder
    score?: SortOrderInput | SortOrder
    summary?: SortOrder
    recommendations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: InsightCountOrderByAggregateInput
    _avg?: InsightAvgOrderByAggregateInput
    _max?: InsightMaxOrderByAggregateInput
    _min?: InsightMinOrderByAggregateInput
    _sum?: InsightSumOrderByAggregateInput
  }

  export type InsightScalarWhereWithAggregatesInput = {
    AND?: InsightScalarWhereWithAggregatesInput | InsightScalarWhereWithAggregatesInput[]
    OR?: InsightScalarWhereWithAggregatesInput[]
    NOT?: InsightScalarWhereWithAggregatesInput | InsightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Insight"> | string
    userId?: StringWithAggregatesFilter<"Insight"> | string
    statementId?: StringNullableWithAggregatesFilter<"Insight"> | string | null
    month?: StringWithAggregatesFilter<"Insight"> | string
    score?: IntNullableWithAggregatesFilter<"Insight"> | number | null
    summary?: StringWithAggregatesFilter<"Insight"> | string
    recommendations?: JsonNullableWithAggregatesFilter<"Insight">
    createdAt?: DateTimeWithAggregatesFilter<"Insight"> | Date | string
  }

  export type MerchantMapWhereInput = {
    AND?: MerchantMapWhereInput | MerchantMapWhereInput[]
    OR?: MerchantMapWhereInput[]
    NOT?: MerchantMapWhereInput | MerchantMapWhereInput[]
    id?: StringFilter<"MerchantMap"> | string
    normalizedName?: StringFilter<"MerchantMap"> | string
    category?: StringFilter<"MerchantMap"> | string
    createdBy?: StringFilter<"MerchantMap"> | string
  }

  export type MerchantMapOrderByWithRelationInput = {
    id?: SortOrder
    normalizedName?: SortOrder
    category?: SortOrder
    createdBy?: SortOrder
  }

  export type MerchantMapWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    normalizedName?: string
    AND?: MerchantMapWhereInput | MerchantMapWhereInput[]
    OR?: MerchantMapWhereInput[]
    NOT?: MerchantMapWhereInput | MerchantMapWhereInput[]
    category?: StringFilter<"MerchantMap"> | string
    createdBy?: StringFilter<"MerchantMap"> | string
  }, "id" | "normalizedName">

  export type MerchantMapOrderByWithAggregationInput = {
    id?: SortOrder
    normalizedName?: SortOrder
    category?: SortOrder
    createdBy?: SortOrder
    _count?: MerchantMapCountOrderByAggregateInput
    _max?: MerchantMapMaxOrderByAggregateInput
    _min?: MerchantMapMinOrderByAggregateInput
  }

  export type MerchantMapScalarWhereWithAggregatesInput = {
    AND?: MerchantMapScalarWhereWithAggregatesInput | MerchantMapScalarWhereWithAggregatesInput[]
    OR?: MerchantMapScalarWhereWithAggregatesInput[]
    NOT?: MerchantMapScalarWhereWithAggregatesInput | MerchantMapScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MerchantMap"> | string
    normalizedName?: StringWithAggregatesFilter<"MerchantMap"> | string
    category?: StringWithAggregatesFilter<"MerchantMap"> | string
    createdBy?: StringWithAggregatesFilter<"MerchantMap"> | string
  }

  export type LearningResourceWhereInput = {
    AND?: LearningResourceWhereInput | LearningResourceWhereInput[]
    OR?: LearningResourceWhereInput[]
    NOT?: LearningResourceWhereInput | LearningResourceWhereInput[]
    id?: StringFilter<"LearningResource"> | string
    title?: StringFilter<"LearningResource"> | string
    description?: StringFilter<"LearningResource"> | string
    type?: StringFilter<"LearningResource"> | string
    category?: StringFilter<"LearningResource"> | string
    url?: StringFilter<"LearningResource"> | string
    thumbnailUrl?: StringNullableFilter<"LearningResource"> | string | null
    author?: StringNullableFilter<"LearningResource"> | string | null
    tags?: StringNullableListFilter<"LearningResource">
    createdAt?: DateTimeFilter<"LearningResource"> | Date | string
    interactions?: ResourceInteractionListRelationFilter
  }

  export type LearningResourceOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    category?: SortOrder
    url?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    interactions?: ResourceInteractionOrderByRelationAggregateInput
  }

  export type LearningResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LearningResourceWhereInput | LearningResourceWhereInput[]
    OR?: LearningResourceWhereInput[]
    NOT?: LearningResourceWhereInput | LearningResourceWhereInput[]
    title?: StringFilter<"LearningResource"> | string
    description?: StringFilter<"LearningResource"> | string
    type?: StringFilter<"LearningResource"> | string
    category?: StringFilter<"LearningResource"> | string
    url?: StringFilter<"LearningResource"> | string
    thumbnailUrl?: StringNullableFilter<"LearningResource"> | string | null
    author?: StringNullableFilter<"LearningResource"> | string | null
    tags?: StringNullableListFilter<"LearningResource">
    createdAt?: DateTimeFilter<"LearningResource"> | Date | string
    interactions?: ResourceInteractionListRelationFilter
  }, "id">

  export type LearningResourceOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    category?: SortOrder
    url?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    _count?: LearningResourceCountOrderByAggregateInput
    _max?: LearningResourceMaxOrderByAggregateInput
    _min?: LearningResourceMinOrderByAggregateInput
  }

  export type LearningResourceScalarWhereWithAggregatesInput = {
    AND?: LearningResourceScalarWhereWithAggregatesInput | LearningResourceScalarWhereWithAggregatesInput[]
    OR?: LearningResourceScalarWhereWithAggregatesInput[]
    NOT?: LearningResourceScalarWhereWithAggregatesInput | LearningResourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LearningResource"> | string
    title?: StringWithAggregatesFilter<"LearningResource"> | string
    description?: StringWithAggregatesFilter<"LearningResource"> | string
    type?: StringWithAggregatesFilter<"LearningResource"> | string
    category?: StringWithAggregatesFilter<"LearningResource"> | string
    url?: StringWithAggregatesFilter<"LearningResource"> | string
    thumbnailUrl?: StringNullableWithAggregatesFilter<"LearningResource"> | string | null
    author?: StringNullableWithAggregatesFilter<"LearningResource"> | string | null
    tags?: StringNullableListFilter<"LearningResource">
    createdAt?: DateTimeWithAggregatesFilter<"LearningResource"> | Date | string
  }

  export type ResourceInteractionWhereInput = {
    AND?: ResourceInteractionWhereInput | ResourceInteractionWhereInput[]
    OR?: ResourceInteractionWhereInput[]
    NOT?: ResourceInteractionWhereInput | ResourceInteractionWhereInput[]
    id?: StringFilter<"ResourceInteraction"> | string
    userId?: StringFilter<"ResourceInteraction"> | string
    resourceId?: StringFilter<"ResourceInteraction"> | string
    type?: StringFilter<"ResourceInteraction"> | string
    interactedAt?: DateTimeFilter<"ResourceInteraction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    resource?: XOR<LearningResourceScalarRelationFilter, LearningResourceWhereInput>
  }

  export type ResourceInteractionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
    type?: SortOrder
    interactedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    resource?: LearningResourceOrderByWithRelationInput
  }

  export type ResourceInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResourceInteractionWhereInput | ResourceInteractionWhereInput[]
    OR?: ResourceInteractionWhereInput[]
    NOT?: ResourceInteractionWhereInput | ResourceInteractionWhereInput[]
    userId?: StringFilter<"ResourceInteraction"> | string
    resourceId?: StringFilter<"ResourceInteraction"> | string
    type?: StringFilter<"ResourceInteraction"> | string
    interactedAt?: DateTimeFilter<"ResourceInteraction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    resource?: XOR<LearningResourceScalarRelationFilter, LearningResourceWhereInput>
  }, "id">

  export type ResourceInteractionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
    type?: SortOrder
    interactedAt?: SortOrder
    _count?: ResourceInteractionCountOrderByAggregateInput
    _max?: ResourceInteractionMaxOrderByAggregateInput
    _min?: ResourceInteractionMinOrderByAggregateInput
  }

  export type ResourceInteractionScalarWhereWithAggregatesInput = {
    AND?: ResourceInteractionScalarWhereWithAggregatesInput | ResourceInteractionScalarWhereWithAggregatesInput[]
    OR?: ResourceInteractionScalarWhereWithAggregatesInput[]
    NOT?: ResourceInteractionScalarWhereWithAggregatesInput | ResourceInteractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResourceInteraction"> | string
    userId?: StringWithAggregatesFilter<"ResourceInteraction"> | string
    resourceId?: StringWithAggregatesFilter<"ResourceInteraction"> | string
    type?: StringWithAggregatesFilter<"ResourceInteraction"> | string
    interactedAt?: DateTimeWithAggregatesFilter<"ResourceInteraction"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    insights?: InsightCreateNestedManyWithoutUserInput
    chats?: ChatCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    insights?: InsightUncheckedCreateNestedManyWithoutUserInput
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    insights?: InsightUpdateManyWithoutUserNestedInput
    chats?: ChatUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUserNestedInput
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatCreateInput = {
    id?: string
    role: string
    content: string
    imageUrl?: string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutChatsInput
  }

  export type ChatUncheckedCreateInput = {
    id?: string
    userId: string
    role: string
    content: string
    imageUrl?: string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ChatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChatsNestedInput
  }

  export type ChatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatCreateManyInput = {
    id?: string
    userId: string
    role: string
    content: string
    imageUrl?: string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ChatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankAccountCreateInput = {
    id?: string
    accountHolderName: string
    accountNumber: string
    ifscCode?: string | null
    bankName: string
    branch?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBankAccountsInput
    statements?: StatementCreateNestedManyWithoutBankAccountInput
  }

  export type BankAccountUncheckedCreateInput = {
    id?: string
    userId: string
    accountHolderName: string
    accountNumber: string
    ifscCode?: string | null
    bankName: string
    branch?: string | null
    createdAt?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutBankAccountInput
  }

  export type BankAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolderName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBankAccountsNestedInput
    statements?: StatementUpdateManyWithoutBankAccountNestedInput
  }

  export type BankAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountHolderName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutBankAccountNestedInput
  }

  export type BankAccountCreateManyInput = {
    id?: string
    userId: string
    accountHolderName: string
    accountNumber: string
    ifscCode?: string | null
    bankName: string
    branch?: string | null
    createdAt?: Date | string
  }

  export type BankAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolderName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountHolderName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementCreateInput = {
    id?: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutStatementsInput
    bankAccount?: BankAccountCreateNestedOneWithoutStatementsInput
    transactions?: TransactionCreateNestedManyWithoutStatementInput
    insights?: InsightCreateNestedManyWithoutStatementInput
  }

  export type StatementUncheckedCreateInput = {
    id?: string
    userId: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutStatementInput
    insights?: InsightUncheckedCreateNestedManyWithoutStatementInput
  }

  export type StatementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutStatementsNestedInput
    bankAccount?: BankAccountUpdateOneWithoutStatementsNestedInput
    transactions?: TransactionUpdateManyWithoutStatementNestedInput
    insights?: InsightUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutStatementNestedInput
    insights?: InsightUncheckedUpdateManyWithoutStatementNestedInput
  }

  export type StatementCreateManyInput = {
    id?: string
    userId: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: string | null
  }

  export type StatementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type StatementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionCreateInput = {
    id?: string
    date: Date | string
    merchant: string
    amount: number
    currency?: string
    category?: string | null
    description?: string | null
    rawLine: string
    user: UserCreateNestedOneWithoutTransactionsInput
    statement?: StatementCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    userId: string
    statementId?: string | null
    date: Date | string
    merchant: string
    amount: number
    currency?: string
    category?: string | null
    description?: string | null
    rawLine: string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    statement?: StatementUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statementId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    userId: string
    statementId?: string | null
    date: Date | string
    merchant: string
    amount: number
    currency?: string
    category?: string | null
    description?: string | null
    rawLine: string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statementId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
  }

  export type InsightCreateInput = {
    id?: string
    month: string
    score?: number | null
    summary: string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutInsightsInput
    statement?: StatementCreateNestedOneWithoutInsightsInput
  }

  export type InsightUncheckedCreateInput = {
    id?: string
    userId: string
    statementId?: string | null
    month: string
    score?: number | null
    summary: string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type InsightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInsightsNestedInput
    statement?: StatementUpdateOneWithoutInsightsNestedInput
  }

  export type InsightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statementId?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsightCreateManyInput = {
    id?: string
    userId: string
    statementId?: string | null
    month: string
    score?: number | null
    summary: string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type InsightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statementId?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantMapCreateInput = {
    id?: string
    normalizedName: string
    category: string
    createdBy?: string
  }

  export type MerchantMapUncheckedCreateInput = {
    id?: string
    normalizedName: string
    category: string
    createdBy?: string
  }

  export type MerchantMapUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type MerchantMapUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type MerchantMapCreateManyInput = {
    id?: string
    normalizedName: string
    category: string
    createdBy?: string
  }

  export type MerchantMapUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type MerchantMapUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type LearningResourceCreateInput = {
    id?: string
    title: string
    description: string
    type: string
    category: string
    url: string
    thumbnailUrl?: string | null
    author?: string | null
    tags?: LearningResourceCreatetagsInput | string[]
    createdAt?: Date | string
    interactions?: ResourceInteractionCreateNestedManyWithoutResourceInput
  }

  export type LearningResourceUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    type: string
    category: string
    url: string
    thumbnailUrl?: string | null
    author?: string | null
    tags?: LearningResourceCreatetagsInput | string[]
    createdAt?: Date | string
    interactions?: ResourceInteractionUncheckedCreateNestedManyWithoutResourceInput
  }

  export type LearningResourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LearningResourceUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interactions?: ResourceInteractionUpdateManyWithoutResourceNestedInput
  }

  export type LearningResourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LearningResourceUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interactions?: ResourceInteractionUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type LearningResourceCreateManyInput = {
    id?: string
    title: string
    description: string
    type: string
    category: string
    url: string
    thumbnailUrl?: string | null
    author?: string | null
    tags?: LearningResourceCreatetagsInput | string[]
    createdAt?: Date | string
  }

  export type LearningResourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LearningResourceUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningResourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LearningResourceUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceInteractionCreateInput = {
    id?: string
    type: string
    interactedAt?: Date | string
    user: UserCreateNestedOneWithoutResourceInteractionsInput
    resource: LearningResourceCreateNestedOneWithoutInteractionsInput
  }

  export type ResourceInteractionUncheckedCreateInput = {
    id?: string
    userId: string
    resourceId: string
    type: string
    interactedAt?: Date | string
  }

  export type ResourceInteractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResourceInteractionsNestedInput
    resource?: LearningResourceUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type ResourceInteractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceInteractionCreateManyInput = {
    id?: string
    userId: string
    resourceId: string
    type: string
    interactedAt?: Date | string
  }

  export type ResourceInteractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceInteractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StatementListRelationFilter = {
    every?: StatementWhereInput
    some?: StatementWhereInput
    none?: StatementWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type InsightListRelationFilter = {
    every?: InsightWhereInput
    some?: InsightWhereInput
    none?: InsightWhereInput
  }

  export type ChatListRelationFilter = {
    every?: ChatWhereInput
    some?: ChatWhereInput
    none?: ChatWhereInput
  }

  export type BankAccountListRelationFilter = {
    every?: BankAccountWhereInput
    some?: BankAccountWhereInput
    none?: BankAccountWhereInput
  }

  export type ResourceInteractionListRelationFilter = {
    every?: ResourceInteractionWhereInput
    some?: ResourceInteractionWhereInput
    none?: ResourceInteractionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StatementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InsightOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BankAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResourceInteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ChatCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BankAccountUserIdAccountNumberCompoundUniqueInput = {
    userId: string
    accountNumber: string
  }

  export type BankAccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountHolderName?: SortOrder
    accountNumber?: SortOrder
    ifscCode?: SortOrder
    bankName?: SortOrder
    branch?: SortOrder
    createdAt?: SortOrder
  }

  export type BankAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountHolderName?: SortOrder
    accountNumber?: SortOrder
    ifscCode?: SortOrder
    bankName?: SortOrder
    branch?: SortOrder
    createdAt?: SortOrder
  }

  export type BankAccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountHolderName?: SortOrder
    accountNumber?: SortOrder
    ifscCode?: SortOrder
    bankName?: SortOrder
    branch?: SortOrder
    createdAt?: SortOrder
  }

  export type BankAccountNullableScalarRelationFilter = {
    is?: BankAccountWhereInput | null
    isNot?: BankAccountWhereInput | null
  }

  export type StatementCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filePath?: SortOrder
    originalFilename?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    meta?: SortOrder
    bankAccountId?: SortOrder
  }

  export type StatementMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filePath?: SortOrder
    originalFilename?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    bankAccountId?: SortOrder
  }

  export type StatementMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filePath?: SortOrder
    originalFilename?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    bankAccountId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StatementNullableScalarRelationFilter = {
    is?: StatementWhereInput | null
    isNot?: StatementWhereInput | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrder
    date?: SortOrder
    merchant?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    description?: SortOrder
    rawLine?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrder
    date?: SortOrder
    merchant?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    description?: SortOrder
    rawLine?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrder
    date?: SortOrder
    merchant?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    description?: SortOrder
    rawLine?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type InsightCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrder
    month?: SortOrder
    score?: SortOrder
    summary?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
  }

  export type InsightAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type InsightMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrder
    month?: SortOrder
    score?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
  }

  export type InsightMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statementId?: SortOrder
    month?: SortOrder
    score?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
  }

  export type InsightSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type MerchantMapCountOrderByAggregateInput = {
    id?: SortOrder
    normalizedName?: SortOrder
    category?: SortOrder
    createdBy?: SortOrder
  }

  export type MerchantMapMaxOrderByAggregateInput = {
    id?: SortOrder
    normalizedName?: SortOrder
    category?: SortOrder
    createdBy?: SortOrder
  }

  export type MerchantMapMinOrderByAggregateInput = {
    id?: SortOrder
    normalizedName?: SortOrder
    category?: SortOrder
    createdBy?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type LearningResourceCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    category?: SortOrder
    url?: SortOrder
    thumbnailUrl?: SortOrder
    author?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
  }

  export type LearningResourceMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    category?: SortOrder
    url?: SortOrder
    thumbnailUrl?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type LearningResourceMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    category?: SortOrder
    url?: SortOrder
    thumbnailUrl?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type LearningResourceScalarRelationFilter = {
    is?: LearningResourceWhereInput
    isNot?: LearningResourceWhereInput
  }

  export type ResourceInteractionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
    type?: SortOrder
    interactedAt?: SortOrder
  }

  export type ResourceInteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
    type?: SortOrder
    interactedAt?: SortOrder
  }

  export type ResourceInteractionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
    type?: SortOrder
    interactedAt?: SortOrder
  }

  export type StatementCreateNestedManyWithoutUserInput = {
    create?: XOR<StatementCreateWithoutUserInput, StatementUncheckedCreateWithoutUserInput> | StatementCreateWithoutUserInput[] | StatementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutUserInput | StatementCreateOrConnectWithoutUserInput[]
    createMany?: StatementCreateManyUserInputEnvelope
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type InsightCreateNestedManyWithoutUserInput = {
    create?: XOR<InsightCreateWithoutUserInput, InsightUncheckedCreateWithoutUserInput> | InsightCreateWithoutUserInput[] | InsightUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutUserInput | InsightCreateOrConnectWithoutUserInput[]
    createMany?: InsightCreateManyUserInputEnvelope
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
  }

  export type ChatCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput> | ChatCreateWithoutUserInput[] | ChatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatCreateOrConnectWithoutUserInput | ChatCreateOrConnectWithoutUserInput[]
    createMany?: ChatCreateManyUserInputEnvelope
    connect?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
  }

  export type BankAccountCreateNestedManyWithoutUserInput = {
    create?: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput> | BankAccountCreateWithoutUserInput[] | BankAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BankAccountCreateOrConnectWithoutUserInput | BankAccountCreateOrConnectWithoutUserInput[]
    createMany?: BankAccountCreateManyUserInputEnvelope
    connect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
  }

  export type ResourceInteractionCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceInteractionCreateWithoutUserInput, ResourceInteractionUncheckedCreateWithoutUserInput> | ResourceInteractionCreateWithoutUserInput[] | ResourceInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceInteractionCreateOrConnectWithoutUserInput | ResourceInteractionCreateOrConnectWithoutUserInput[]
    createMany?: ResourceInteractionCreateManyUserInputEnvelope
    connect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
  }

  export type StatementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StatementCreateWithoutUserInput, StatementUncheckedCreateWithoutUserInput> | StatementCreateWithoutUserInput[] | StatementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutUserInput | StatementCreateOrConnectWithoutUserInput[]
    createMany?: StatementCreateManyUserInputEnvelope
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type InsightUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InsightCreateWithoutUserInput, InsightUncheckedCreateWithoutUserInput> | InsightCreateWithoutUserInput[] | InsightUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutUserInput | InsightCreateOrConnectWithoutUserInput[]
    createMany?: InsightCreateManyUserInputEnvelope
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
  }

  export type ChatUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput> | ChatCreateWithoutUserInput[] | ChatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatCreateOrConnectWithoutUserInput | ChatCreateOrConnectWithoutUserInput[]
    createMany?: ChatCreateManyUserInputEnvelope
    connect?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
  }

  export type BankAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput> | BankAccountCreateWithoutUserInput[] | BankAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BankAccountCreateOrConnectWithoutUserInput | BankAccountCreateOrConnectWithoutUserInput[]
    createMany?: BankAccountCreateManyUserInputEnvelope
    connect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
  }

  export type ResourceInteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceInteractionCreateWithoutUserInput, ResourceInteractionUncheckedCreateWithoutUserInput> | ResourceInteractionCreateWithoutUserInput[] | ResourceInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceInteractionCreateOrConnectWithoutUserInput | ResourceInteractionCreateOrConnectWithoutUserInput[]
    createMany?: ResourceInteractionCreateManyUserInputEnvelope
    connect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StatementUpdateManyWithoutUserNestedInput = {
    create?: XOR<StatementCreateWithoutUserInput, StatementUncheckedCreateWithoutUserInput> | StatementCreateWithoutUserInput[] | StatementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutUserInput | StatementCreateOrConnectWithoutUserInput[]
    upsert?: StatementUpsertWithWhereUniqueWithoutUserInput | StatementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StatementCreateManyUserInputEnvelope
    set?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    disconnect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    delete?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    update?: StatementUpdateWithWhereUniqueWithoutUserInput | StatementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StatementUpdateManyWithWhereWithoutUserInput | StatementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StatementScalarWhereInput | StatementScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type InsightUpdateManyWithoutUserNestedInput = {
    create?: XOR<InsightCreateWithoutUserInput, InsightUncheckedCreateWithoutUserInput> | InsightCreateWithoutUserInput[] | InsightUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutUserInput | InsightCreateOrConnectWithoutUserInput[]
    upsert?: InsightUpsertWithWhereUniqueWithoutUserInput | InsightUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InsightCreateManyUserInputEnvelope
    set?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    disconnect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    delete?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    update?: InsightUpdateWithWhereUniqueWithoutUserInput | InsightUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InsightUpdateManyWithWhereWithoutUserInput | InsightUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InsightScalarWhereInput | InsightScalarWhereInput[]
  }

  export type ChatUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput> | ChatCreateWithoutUserInput[] | ChatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatCreateOrConnectWithoutUserInput | ChatCreateOrConnectWithoutUserInput[]
    upsert?: ChatUpsertWithWhereUniqueWithoutUserInput | ChatUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatCreateManyUserInputEnvelope
    set?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
    disconnect?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
    delete?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
    connect?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
    update?: ChatUpdateWithWhereUniqueWithoutUserInput | ChatUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatUpdateManyWithWhereWithoutUserInput | ChatUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatScalarWhereInput | ChatScalarWhereInput[]
  }

  export type BankAccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput> | BankAccountCreateWithoutUserInput[] | BankAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BankAccountCreateOrConnectWithoutUserInput | BankAccountCreateOrConnectWithoutUserInput[]
    upsert?: BankAccountUpsertWithWhereUniqueWithoutUserInput | BankAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BankAccountCreateManyUserInputEnvelope
    set?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    disconnect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    delete?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    connect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    update?: BankAccountUpdateWithWhereUniqueWithoutUserInput | BankAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BankAccountUpdateManyWithWhereWithoutUserInput | BankAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BankAccountScalarWhereInput | BankAccountScalarWhereInput[]
  }

  export type ResourceInteractionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceInteractionCreateWithoutUserInput, ResourceInteractionUncheckedCreateWithoutUserInput> | ResourceInteractionCreateWithoutUserInput[] | ResourceInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceInteractionCreateOrConnectWithoutUserInput | ResourceInteractionCreateOrConnectWithoutUserInput[]
    upsert?: ResourceInteractionUpsertWithWhereUniqueWithoutUserInput | ResourceInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceInteractionCreateManyUserInputEnvelope
    set?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    disconnect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    delete?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    connect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    update?: ResourceInteractionUpdateWithWhereUniqueWithoutUserInput | ResourceInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceInteractionUpdateManyWithWhereWithoutUserInput | ResourceInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceInteractionScalarWhereInput | ResourceInteractionScalarWhereInput[]
  }

  export type StatementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StatementCreateWithoutUserInput, StatementUncheckedCreateWithoutUserInput> | StatementCreateWithoutUserInput[] | StatementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutUserInput | StatementCreateOrConnectWithoutUserInput[]
    upsert?: StatementUpsertWithWhereUniqueWithoutUserInput | StatementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StatementCreateManyUserInputEnvelope
    set?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    disconnect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    delete?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    update?: StatementUpdateWithWhereUniqueWithoutUserInput | StatementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StatementUpdateManyWithWhereWithoutUserInput | StatementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StatementScalarWhereInput | StatementScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type InsightUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InsightCreateWithoutUserInput, InsightUncheckedCreateWithoutUserInput> | InsightCreateWithoutUserInput[] | InsightUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutUserInput | InsightCreateOrConnectWithoutUserInput[]
    upsert?: InsightUpsertWithWhereUniqueWithoutUserInput | InsightUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InsightCreateManyUserInputEnvelope
    set?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    disconnect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    delete?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    update?: InsightUpdateWithWhereUniqueWithoutUserInput | InsightUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InsightUpdateManyWithWhereWithoutUserInput | InsightUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InsightScalarWhereInput | InsightScalarWhereInput[]
  }

  export type ChatUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput> | ChatCreateWithoutUserInput[] | ChatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatCreateOrConnectWithoutUserInput | ChatCreateOrConnectWithoutUserInput[]
    upsert?: ChatUpsertWithWhereUniqueWithoutUserInput | ChatUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatCreateManyUserInputEnvelope
    set?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
    disconnect?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
    delete?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
    connect?: ChatWhereUniqueInput | ChatWhereUniqueInput[]
    update?: ChatUpdateWithWhereUniqueWithoutUserInput | ChatUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatUpdateManyWithWhereWithoutUserInput | ChatUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatScalarWhereInput | ChatScalarWhereInput[]
  }

  export type BankAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput> | BankAccountCreateWithoutUserInput[] | BankAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BankAccountCreateOrConnectWithoutUserInput | BankAccountCreateOrConnectWithoutUserInput[]
    upsert?: BankAccountUpsertWithWhereUniqueWithoutUserInput | BankAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BankAccountCreateManyUserInputEnvelope
    set?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    disconnect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    delete?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    connect?: BankAccountWhereUniqueInput | BankAccountWhereUniqueInput[]
    update?: BankAccountUpdateWithWhereUniqueWithoutUserInput | BankAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BankAccountUpdateManyWithWhereWithoutUserInput | BankAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BankAccountScalarWhereInput | BankAccountScalarWhereInput[]
  }

  export type ResourceInteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceInteractionCreateWithoutUserInput, ResourceInteractionUncheckedCreateWithoutUserInput> | ResourceInteractionCreateWithoutUserInput[] | ResourceInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceInteractionCreateOrConnectWithoutUserInput | ResourceInteractionCreateOrConnectWithoutUserInput[]
    upsert?: ResourceInteractionUpsertWithWhereUniqueWithoutUserInput | ResourceInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceInteractionCreateManyUserInputEnvelope
    set?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    disconnect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    delete?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    connect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    update?: ResourceInteractionUpdateWithWhereUniqueWithoutUserInput | ResourceInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceInteractionUpdateManyWithWhereWithoutUserInput | ResourceInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceInteractionScalarWhereInput | ResourceInteractionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutChatsInput = {
    create?: XOR<UserCreateWithoutChatsInput, UserUncheckedCreateWithoutChatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutChatsNestedInput = {
    create?: XOR<UserCreateWithoutChatsInput, UserUncheckedCreateWithoutChatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatsInput
    upsert?: UserUpsertWithoutChatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChatsInput, UserUpdateWithoutChatsInput>, UserUncheckedUpdateWithoutChatsInput>
  }

  export type UserCreateNestedOneWithoutBankAccountsInput = {
    create?: XOR<UserCreateWithoutBankAccountsInput, UserUncheckedCreateWithoutBankAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBankAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StatementCreateNestedManyWithoutBankAccountInput = {
    create?: XOR<StatementCreateWithoutBankAccountInput, StatementUncheckedCreateWithoutBankAccountInput> | StatementCreateWithoutBankAccountInput[] | StatementUncheckedCreateWithoutBankAccountInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutBankAccountInput | StatementCreateOrConnectWithoutBankAccountInput[]
    createMany?: StatementCreateManyBankAccountInputEnvelope
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
  }

  export type StatementUncheckedCreateNestedManyWithoutBankAccountInput = {
    create?: XOR<StatementCreateWithoutBankAccountInput, StatementUncheckedCreateWithoutBankAccountInput> | StatementCreateWithoutBankAccountInput[] | StatementUncheckedCreateWithoutBankAccountInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutBankAccountInput | StatementCreateOrConnectWithoutBankAccountInput[]
    createMany?: StatementCreateManyBankAccountInputEnvelope
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutBankAccountsNestedInput = {
    create?: XOR<UserCreateWithoutBankAccountsInput, UserUncheckedCreateWithoutBankAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBankAccountsInput
    upsert?: UserUpsertWithoutBankAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBankAccountsInput, UserUpdateWithoutBankAccountsInput>, UserUncheckedUpdateWithoutBankAccountsInput>
  }

  export type StatementUpdateManyWithoutBankAccountNestedInput = {
    create?: XOR<StatementCreateWithoutBankAccountInput, StatementUncheckedCreateWithoutBankAccountInput> | StatementCreateWithoutBankAccountInput[] | StatementUncheckedCreateWithoutBankAccountInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutBankAccountInput | StatementCreateOrConnectWithoutBankAccountInput[]
    upsert?: StatementUpsertWithWhereUniqueWithoutBankAccountInput | StatementUpsertWithWhereUniqueWithoutBankAccountInput[]
    createMany?: StatementCreateManyBankAccountInputEnvelope
    set?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    disconnect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    delete?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    update?: StatementUpdateWithWhereUniqueWithoutBankAccountInput | StatementUpdateWithWhereUniqueWithoutBankAccountInput[]
    updateMany?: StatementUpdateManyWithWhereWithoutBankAccountInput | StatementUpdateManyWithWhereWithoutBankAccountInput[]
    deleteMany?: StatementScalarWhereInput | StatementScalarWhereInput[]
  }

  export type StatementUncheckedUpdateManyWithoutBankAccountNestedInput = {
    create?: XOR<StatementCreateWithoutBankAccountInput, StatementUncheckedCreateWithoutBankAccountInput> | StatementCreateWithoutBankAccountInput[] | StatementUncheckedCreateWithoutBankAccountInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutBankAccountInput | StatementCreateOrConnectWithoutBankAccountInput[]
    upsert?: StatementUpsertWithWhereUniqueWithoutBankAccountInput | StatementUpsertWithWhereUniqueWithoutBankAccountInput[]
    createMany?: StatementCreateManyBankAccountInputEnvelope
    set?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    disconnect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    delete?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    update?: StatementUpdateWithWhereUniqueWithoutBankAccountInput | StatementUpdateWithWhereUniqueWithoutBankAccountInput[]
    updateMany?: StatementUpdateManyWithWhereWithoutBankAccountInput | StatementUpdateManyWithWhereWithoutBankAccountInput[]
    deleteMany?: StatementScalarWhereInput | StatementScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStatementsInput = {
    create?: XOR<UserCreateWithoutStatementsInput, UserUncheckedCreateWithoutStatementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatementsInput
    connect?: UserWhereUniqueInput
  }

  export type BankAccountCreateNestedOneWithoutStatementsInput = {
    create?: XOR<BankAccountCreateWithoutStatementsInput, BankAccountUncheckedCreateWithoutStatementsInput>
    connectOrCreate?: BankAccountCreateOrConnectWithoutStatementsInput
    connect?: BankAccountWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutStatementInput = {
    create?: XOR<TransactionCreateWithoutStatementInput, TransactionUncheckedCreateWithoutStatementInput> | TransactionCreateWithoutStatementInput[] | TransactionUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutStatementInput | TransactionCreateOrConnectWithoutStatementInput[]
    createMany?: TransactionCreateManyStatementInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type InsightCreateNestedManyWithoutStatementInput = {
    create?: XOR<InsightCreateWithoutStatementInput, InsightUncheckedCreateWithoutStatementInput> | InsightCreateWithoutStatementInput[] | InsightUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutStatementInput | InsightCreateOrConnectWithoutStatementInput[]
    createMany?: InsightCreateManyStatementInputEnvelope
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutStatementInput = {
    create?: XOR<TransactionCreateWithoutStatementInput, TransactionUncheckedCreateWithoutStatementInput> | TransactionCreateWithoutStatementInput[] | TransactionUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutStatementInput | TransactionCreateOrConnectWithoutStatementInput[]
    createMany?: TransactionCreateManyStatementInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type InsightUncheckedCreateNestedManyWithoutStatementInput = {
    create?: XOR<InsightCreateWithoutStatementInput, InsightUncheckedCreateWithoutStatementInput> | InsightCreateWithoutStatementInput[] | InsightUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutStatementInput | InsightCreateOrConnectWithoutStatementInput[]
    createMany?: InsightCreateManyStatementInputEnvelope
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutStatementsNestedInput = {
    create?: XOR<UserCreateWithoutStatementsInput, UserUncheckedCreateWithoutStatementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatementsInput
    upsert?: UserUpsertWithoutStatementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatementsInput, UserUpdateWithoutStatementsInput>, UserUncheckedUpdateWithoutStatementsInput>
  }

  export type BankAccountUpdateOneWithoutStatementsNestedInput = {
    create?: XOR<BankAccountCreateWithoutStatementsInput, BankAccountUncheckedCreateWithoutStatementsInput>
    connectOrCreate?: BankAccountCreateOrConnectWithoutStatementsInput
    upsert?: BankAccountUpsertWithoutStatementsInput
    disconnect?: BankAccountWhereInput | boolean
    delete?: BankAccountWhereInput | boolean
    connect?: BankAccountWhereUniqueInput
    update?: XOR<XOR<BankAccountUpdateToOneWithWhereWithoutStatementsInput, BankAccountUpdateWithoutStatementsInput>, BankAccountUncheckedUpdateWithoutStatementsInput>
  }

  export type TransactionUpdateManyWithoutStatementNestedInput = {
    create?: XOR<TransactionCreateWithoutStatementInput, TransactionUncheckedCreateWithoutStatementInput> | TransactionCreateWithoutStatementInput[] | TransactionUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutStatementInput | TransactionCreateOrConnectWithoutStatementInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutStatementInput | TransactionUpsertWithWhereUniqueWithoutStatementInput[]
    createMany?: TransactionCreateManyStatementInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutStatementInput | TransactionUpdateWithWhereUniqueWithoutStatementInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutStatementInput | TransactionUpdateManyWithWhereWithoutStatementInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type InsightUpdateManyWithoutStatementNestedInput = {
    create?: XOR<InsightCreateWithoutStatementInput, InsightUncheckedCreateWithoutStatementInput> | InsightCreateWithoutStatementInput[] | InsightUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutStatementInput | InsightCreateOrConnectWithoutStatementInput[]
    upsert?: InsightUpsertWithWhereUniqueWithoutStatementInput | InsightUpsertWithWhereUniqueWithoutStatementInput[]
    createMany?: InsightCreateManyStatementInputEnvelope
    set?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    disconnect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    delete?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    update?: InsightUpdateWithWhereUniqueWithoutStatementInput | InsightUpdateWithWhereUniqueWithoutStatementInput[]
    updateMany?: InsightUpdateManyWithWhereWithoutStatementInput | InsightUpdateManyWithWhereWithoutStatementInput[]
    deleteMany?: InsightScalarWhereInput | InsightScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutStatementNestedInput = {
    create?: XOR<TransactionCreateWithoutStatementInput, TransactionUncheckedCreateWithoutStatementInput> | TransactionCreateWithoutStatementInput[] | TransactionUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutStatementInput | TransactionCreateOrConnectWithoutStatementInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutStatementInput | TransactionUpsertWithWhereUniqueWithoutStatementInput[]
    createMany?: TransactionCreateManyStatementInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutStatementInput | TransactionUpdateWithWhereUniqueWithoutStatementInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutStatementInput | TransactionUpdateManyWithWhereWithoutStatementInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type InsightUncheckedUpdateManyWithoutStatementNestedInput = {
    create?: XOR<InsightCreateWithoutStatementInput, InsightUncheckedCreateWithoutStatementInput> | InsightCreateWithoutStatementInput[] | InsightUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutStatementInput | InsightCreateOrConnectWithoutStatementInput[]
    upsert?: InsightUpsertWithWhereUniqueWithoutStatementInput | InsightUpsertWithWhereUniqueWithoutStatementInput[]
    createMany?: InsightCreateManyStatementInputEnvelope
    set?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    disconnect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    delete?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    update?: InsightUpdateWithWhereUniqueWithoutStatementInput | InsightUpdateWithWhereUniqueWithoutStatementInput[]
    updateMany?: InsightUpdateManyWithWhereWithoutStatementInput | InsightUpdateManyWithWhereWithoutStatementInput[]
    deleteMany?: InsightScalarWhereInput | InsightScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type StatementCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<StatementCreateWithoutTransactionsInput, StatementUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: StatementCreateOrConnectWithoutTransactionsInput
    connect?: StatementWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type StatementUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<StatementCreateWithoutTransactionsInput, StatementUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: StatementCreateOrConnectWithoutTransactionsInput
    upsert?: StatementUpsertWithoutTransactionsInput
    disconnect?: StatementWhereInput | boolean
    delete?: StatementWhereInput | boolean
    connect?: StatementWhereUniqueInput
    update?: XOR<XOR<StatementUpdateToOneWithWhereWithoutTransactionsInput, StatementUpdateWithoutTransactionsInput>, StatementUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserCreateNestedOneWithoutInsightsInput = {
    create?: XOR<UserCreateWithoutInsightsInput, UserUncheckedCreateWithoutInsightsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInsightsInput
    connect?: UserWhereUniqueInput
  }

  export type StatementCreateNestedOneWithoutInsightsInput = {
    create?: XOR<StatementCreateWithoutInsightsInput, StatementUncheckedCreateWithoutInsightsInput>
    connectOrCreate?: StatementCreateOrConnectWithoutInsightsInput
    connect?: StatementWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutInsightsNestedInput = {
    create?: XOR<UserCreateWithoutInsightsInput, UserUncheckedCreateWithoutInsightsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInsightsInput
    upsert?: UserUpsertWithoutInsightsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInsightsInput, UserUpdateWithoutInsightsInput>, UserUncheckedUpdateWithoutInsightsInput>
  }

  export type StatementUpdateOneWithoutInsightsNestedInput = {
    create?: XOR<StatementCreateWithoutInsightsInput, StatementUncheckedCreateWithoutInsightsInput>
    connectOrCreate?: StatementCreateOrConnectWithoutInsightsInput
    upsert?: StatementUpsertWithoutInsightsInput
    disconnect?: StatementWhereInput | boolean
    delete?: StatementWhereInput | boolean
    connect?: StatementWhereUniqueInput
    update?: XOR<XOR<StatementUpdateToOneWithWhereWithoutInsightsInput, StatementUpdateWithoutInsightsInput>, StatementUncheckedUpdateWithoutInsightsInput>
  }

  export type LearningResourceCreatetagsInput = {
    set: string[]
  }

  export type ResourceInteractionCreateNestedManyWithoutResourceInput = {
    create?: XOR<ResourceInteractionCreateWithoutResourceInput, ResourceInteractionUncheckedCreateWithoutResourceInput> | ResourceInteractionCreateWithoutResourceInput[] | ResourceInteractionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceInteractionCreateOrConnectWithoutResourceInput | ResourceInteractionCreateOrConnectWithoutResourceInput[]
    createMany?: ResourceInteractionCreateManyResourceInputEnvelope
    connect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
  }

  export type ResourceInteractionUncheckedCreateNestedManyWithoutResourceInput = {
    create?: XOR<ResourceInteractionCreateWithoutResourceInput, ResourceInteractionUncheckedCreateWithoutResourceInput> | ResourceInteractionCreateWithoutResourceInput[] | ResourceInteractionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceInteractionCreateOrConnectWithoutResourceInput | ResourceInteractionCreateOrConnectWithoutResourceInput[]
    createMany?: ResourceInteractionCreateManyResourceInputEnvelope
    connect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
  }

  export type LearningResourceUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ResourceInteractionUpdateManyWithoutResourceNestedInput = {
    create?: XOR<ResourceInteractionCreateWithoutResourceInput, ResourceInteractionUncheckedCreateWithoutResourceInput> | ResourceInteractionCreateWithoutResourceInput[] | ResourceInteractionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceInteractionCreateOrConnectWithoutResourceInput | ResourceInteractionCreateOrConnectWithoutResourceInput[]
    upsert?: ResourceInteractionUpsertWithWhereUniqueWithoutResourceInput | ResourceInteractionUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: ResourceInteractionCreateManyResourceInputEnvelope
    set?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    disconnect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    delete?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    connect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    update?: ResourceInteractionUpdateWithWhereUniqueWithoutResourceInput | ResourceInteractionUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: ResourceInteractionUpdateManyWithWhereWithoutResourceInput | ResourceInteractionUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: ResourceInteractionScalarWhereInput | ResourceInteractionScalarWhereInput[]
  }

  export type ResourceInteractionUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: XOR<ResourceInteractionCreateWithoutResourceInput, ResourceInteractionUncheckedCreateWithoutResourceInput> | ResourceInteractionCreateWithoutResourceInput[] | ResourceInteractionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceInteractionCreateOrConnectWithoutResourceInput | ResourceInteractionCreateOrConnectWithoutResourceInput[]
    upsert?: ResourceInteractionUpsertWithWhereUniqueWithoutResourceInput | ResourceInteractionUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: ResourceInteractionCreateManyResourceInputEnvelope
    set?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    disconnect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    delete?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    connect?: ResourceInteractionWhereUniqueInput | ResourceInteractionWhereUniqueInput[]
    update?: ResourceInteractionUpdateWithWhereUniqueWithoutResourceInput | ResourceInteractionUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: ResourceInteractionUpdateManyWithWhereWithoutResourceInput | ResourceInteractionUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: ResourceInteractionScalarWhereInput | ResourceInteractionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutResourceInteractionsInput = {
    create?: XOR<UserCreateWithoutResourceInteractionsInput, UserUncheckedCreateWithoutResourceInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutResourceInteractionsInput
    connect?: UserWhereUniqueInput
  }

  export type LearningResourceCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<LearningResourceCreateWithoutInteractionsInput, LearningResourceUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: LearningResourceCreateOrConnectWithoutInteractionsInput
    connect?: LearningResourceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutResourceInteractionsNestedInput = {
    create?: XOR<UserCreateWithoutResourceInteractionsInput, UserUncheckedCreateWithoutResourceInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutResourceInteractionsInput
    upsert?: UserUpsertWithoutResourceInteractionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResourceInteractionsInput, UserUpdateWithoutResourceInteractionsInput>, UserUncheckedUpdateWithoutResourceInteractionsInput>
  }

  export type LearningResourceUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<LearningResourceCreateWithoutInteractionsInput, LearningResourceUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: LearningResourceCreateOrConnectWithoutInteractionsInput
    upsert?: LearningResourceUpsertWithoutInteractionsInput
    connect?: LearningResourceWhereUniqueInput
    update?: XOR<XOR<LearningResourceUpdateToOneWithWhereWithoutInteractionsInput, LearningResourceUpdateWithoutInteractionsInput>, LearningResourceUncheckedUpdateWithoutInteractionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StatementCreateWithoutUserInput = {
    id?: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccount?: BankAccountCreateNestedOneWithoutStatementsInput
    transactions?: TransactionCreateNestedManyWithoutStatementInput
    insights?: InsightCreateNestedManyWithoutStatementInput
  }

  export type StatementUncheckedCreateWithoutUserInput = {
    id?: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutStatementInput
    insights?: InsightUncheckedCreateNestedManyWithoutStatementInput
  }

  export type StatementCreateOrConnectWithoutUserInput = {
    where: StatementWhereUniqueInput
    create: XOR<StatementCreateWithoutUserInput, StatementUncheckedCreateWithoutUserInput>
  }

  export type StatementCreateManyUserInputEnvelope = {
    data: StatementCreateManyUserInput | StatementCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutUserInput = {
    id?: string
    date: Date | string
    merchant: string
    amount: number
    currency?: string
    category?: string | null
    description?: string | null
    rawLine: string
    statement?: StatementCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string
    statementId?: string | null
    date: Date | string
    merchant: string
    amount: number
    currency?: string
    category?: string | null
    description?: string | null
    rawLine: string
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InsightCreateWithoutUserInput = {
    id?: string
    month: string
    score?: number | null
    summary: string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    statement?: StatementCreateNestedOneWithoutInsightsInput
  }

  export type InsightUncheckedCreateWithoutUserInput = {
    id?: string
    statementId?: string | null
    month: string
    score?: number | null
    summary: string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type InsightCreateOrConnectWithoutUserInput = {
    where: InsightWhereUniqueInput
    create: XOR<InsightCreateWithoutUserInput, InsightUncheckedCreateWithoutUserInput>
  }

  export type InsightCreateManyUserInputEnvelope = {
    data: InsightCreateManyUserInput | InsightCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChatCreateWithoutUserInput = {
    id?: string
    role: string
    content: string
    imageUrl?: string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ChatUncheckedCreateWithoutUserInput = {
    id?: string
    role: string
    content: string
    imageUrl?: string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ChatCreateOrConnectWithoutUserInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput>
  }

  export type ChatCreateManyUserInputEnvelope = {
    data: ChatCreateManyUserInput | ChatCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BankAccountCreateWithoutUserInput = {
    id?: string
    accountHolderName: string
    accountNumber: string
    ifscCode?: string | null
    bankName: string
    branch?: string | null
    createdAt?: Date | string
    statements?: StatementCreateNestedManyWithoutBankAccountInput
  }

  export type BankAccountUncheckedCreateWithoutUserInput = {
    id?: string
    accountHolderName: string
    accountNumber: string
    ifscCode?: string | null
    bankName: string
    branch?: string | null
    createdAt?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutBankAccountInput
  }

  export type BankAccountCreateOrConnectWithoutUserInput = {
    where: BankAccountWhereUniqueInput
    create: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput>
  }

  export type BankAccountCreateManyUserInputEnvelope = {
    data: BankAccountCreateManyUserInput | BankAccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResourceInteractionCreateWithoutUserInput = {
    id?: string
    type: string
    interactedAt?: Date | string
    resource: LearningResourceCreateNestedOneWithoutInteractionsInput
  }

  export type ResourceInteractionUncheckedCreateWithoutUserInput = {
    id?: string
    resourceId: string
    type: string
    interactedAt?: Date | string
  }

  export type ResourceInteractionCreateOrConnectWithoutUserInput = {
    where: ResourceInteractionWhereUniqueInput
    create: XOR<ResourceInteractionCreateWithoutUserInput, ResourceInteractionUncheckedCreateWithoutUserInput>
  }

  export type ResourceInteractionCreateManyUserInputEnvelope = {
    data: ResourceInteractionCreateManyUserInput | ResourceInteractionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StatementUpsertWithWhereUniqueWithoutUserInput = {
    where: StatementWhereUniqueInput
    update: XOR<StatementUpdateWithoutUserInput, StatementUncheckedUpdateWithoutUserInput>
    create: XOR<StatementCreateWithoutUserInput, StatementUncheckedCreateWithoutUserInput>
  }

  export type StatementUpdateWithWhereUniqueWithoutUserInput = {
    where: StatementWhereUniqueInput
    data: XOR<StatementUpdateWithoutUserInput, StatementUncheckedUpdateWithoutUserInput>
  }

  export type StatementUpdateManyWithWhereWithoutUserInput = {
    where: StatementScalarWhereInput
    data: XOR<StatementUpdateManyMutationInput, StatementUncheckedUpdateManyWithoutUserInput>
  }

  export type StatementScalarWhereInput = {
    AND?: StatementScalarWhereInput | StatementScalarWhereInput[]
    OR?: StatementScalarWhereInput[]
    NOT?: StatementScalarWhereInput | StatementScalarWhereInput[]
    id?: StringFilter<"Statement"> | string
    userId?: StringFilter<"Statement"> | string
    filePath?: StringFilter<"Statement"> | string
    originalFilename?: StringFilter<"Statement"> | string
    uploadedAt?: DateTimeFilter<"Statement"> | Date | string
    status?: StringFilter<"Statement"> | string
    meta?: JsonNullableFilter<"Statement">
    bankAccountId?: StringNullableFilter<"Statement"> | string | null
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    statementId?: StringNullableFilter<"Transaction"> | string | null
    date?: DateTimeFilter<"Transaction"> | Date | string
    merchant?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    currency?: StringFilter<"Transaction"> | string
    category?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    rawLine?: StringFilter<"Transaction"> | string
  }

  export type InsightUpsertWithWhereUniqueWithoutUserInput = {
    where: InsightWhereUniqueInput
    update: XOR<InsightUpdateWithoutUserInput, InsightUncheckedUpdateWithoutUserInput>
    create: XOR<InsightCreateWithoutUserInput, InsightUncheckedCreateWithoutUserInput>
  }

  export type InsightUpdateWithWhereUniqueWithoutUserInput = {
    where: InsightWhereUniqueInput
    data: XOR<InsightUpdateWithoutUserInput, InsightUncheckedUpdateWithoutUserInput>
  }

  export type InsightUpdateManyWithWhereWithoutUserInput = {
    where: InsightScalarWhereInput
    data: XOR<InsightUpdateManyMutationInput, InsightUncheckedUpdateManyWithoutUserInput>
  }

  export type InsightScalarWhereInput = {
    AND?: InsightScalarWhereInput | InsightScalarWhereInput[]
    OR?: InsightScalarWhereInput[]
    NOT?: InsightScalarWhereInput | InsightScalarWhereInput[]
    id?: StringFilter<"Insight"> | string
    userId?: StringFilter<"Insight"> | string
    statementId?: StringNullableFilter<"Insight"> | string | null
    month?: StringFilter<"Insight"> | string
    score?: IntNullableFilter<"Insight"> | number | null
    summary?: StringFilter<"Insight"> | string
    recommendations?: JsonNullableFilter<"Insight">
    createdAt?: DateTimeFilter<"Insight"> | Date | string
  }

  export type ChatUpsertWithWhereUniqueWithoutUserInput = {
    where: ChatWhereUniqueInput
    update: XOR<ChatUpdateWithoutUserInput, ChatUncheckedUpdateWithoutUserInput>
    create: XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput>
  }

  export type ChatUpdateWithWhereUniqueWithoutUserInput = {
    where: ChatWhereUniqueInput
    data: XOR<ChatUpdateWithoutUserInput, ChatUncheckedUpdateWithoutUserInput>
  }

  export type ChatUpdateManyWithWhereWithoutUserInput = {
    where: ChatScalarWhereInput
    data: XOR<ChatUpdateManyMutationInput, ChatUncheckedUpdateManyWithoutUserInput>
  }

  export type ChatScalarWhereInput = {
    AND?: ChatScalarWhereInput | ChatScalarWhereInput[]
    OR?: ChatScalarWhereInput[]
    NOT?: ChatScalarWhereInput | ChatScalarWhereInput[]
    id?: StringFilter<"Chat"> | string
    userId?: StringFilter<"Chat"> | string
    role?: StringFilter<"Chat"> | string
    content?: StringFilter<"Chat"> | string
    imageUrl?: StringNullableFilter<"Chat"> | string | null
    recommendations?: JsonNullableFilter<"Chat">
    createdAt?: DateTimeFilter<"Chat"> | Date | string
  }

  export type BankAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: BankAccountWhereUniqueInput
    update: XOR<BankAccountUpdateWithoutUserInput, BankAccountUncheckedUpdateWithoutUserInput>
    create: XOR<BankAccountCreateWithoutUserInput, BankAccountUncheckedCreateWithoutUserInput>
  }

  export type BankAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: BankAccountWhereUniqueInput
    data: XOR<BankAccountUpdateWithoutUserInput, BankAccountUncheckedUpdateWithoutUserInput>
  }

  export type BankAccountUpdateManyWithWhereWithoutUserInput = {
    where: BankAccountScalarWhereInput
    data: XOR<BankAccountUpdateManyMutationInput, BankAccountUncheckedUpdateManyWithoutUserInput>
  }

  export type BankAccountScalarWhereInput = {
    AND?: BankAccountScalarWhereInput | BankAccountScalarWhereInput[]
    OR?: BankAccountScalarWhereInput[]
    NOT?: BankAccountScalarWhereInput | BankAccountScalarWhereInput[]
    id?: StringFilter<"BankAccount"> | string
    userId?: StringFilter<"BankAccount"> | string
    accountHolderName?: StringFilter<"BankAccount"> | string
    accountNumber?: StringFilter<"BankAccount"> | string
    ifscCode?: StringNullableFilter<"BankAccount"> | string | null
    bankName?: StringFilter<"BankAccount"> | string
    branch?: StringNullableFilter<"BankAccount"> | string | null
    createdAt?: DateTimeFilter<"BankAccount"> | Date | string
  }

  export type ResourceInteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: ResourceInteractionWhereUniqueInput
    update: XOR<ResourceInteractionUpdateWithoutUserInput, ResourceInteractionUncheckedUpdateWithoutUserInput>
    create: XOR<ResourceInteractionCreateWithoutUserInput, ResourceInteractionUncheckedCreateWithoutUserInput>
  }

  export type ResourceInteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: ResourceInteractionWhereUniqueInput
    data: XOR<ResourceInteractionUpdateWithoutUserInput, ResourceInteractionUncheckedUpdateWithoutUserInput>
  }

  export type ResourceInteractionUpdateManyWithWhereWithoutUserInput = {
    where: ResourceInteractionScalarWhereInput
    data: XOR<ResourceInteractionUpdateManyMutationInput, ResourceInteractionUncheckedUpdateManyWithoutUserInput>
  }

  export type ResourceInteractionScalarWhereInput = {
    AND?: ResourceInteractionScalarWhereInput | ResourceInteractionScalarWhereInput[]
    OR?: ResourceInteractionScalarWhereInput[]
    NOT?: ResourceInteractionScalarWhereInput | ResourceInteractionScalarWhereInput[]
    id?: StringFilter<"ResourceInteraction"> | string
    userId?: StringFilter<"ResourceInteraction"> | string
    resourceId?: StringFilter<"ResourceInteraction"> | string
    type?: StringFilter<"ResourceInteraction"> | string
    interactedAt?: DateTimeFilter<"ResourceInteraction"> | Date | string
  }

  export type UserCreateWithoutChatsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    insights?: InsightCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChatsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    insights?: InsightUncheckedCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChatsInput, UserUncheckedCreateWithoutChatsInput>
  }

  export type UserUpsertWithoutChatsInput = {
    update: XOR<UserUpdateWithoutChatsInput, UserUncheckedUpdateWithoutChatsInput>
    create: XOR<UserCreateWithoutChatsInput, UserUncheckedCreateWithoutChatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChatsInput, UserUncheckedUpdateWithoutChatsInput>
  }

  export type UserUpdateWithoutChatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    insights?: InsightUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutBankAccountsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    insights?: InsightCreateNestedManyWithoutUserInput
    chats?: ChatCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBankAccountsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    insights?: InsightUncheckedCreateNestedManyWithoutUserInput
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBankAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBankAccountsInput, UserUncheckedCreateWithoutBankAccountsInput>
  }

  export type StatementCreateWithoutBankAccountInput = {
    id?: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutStatementsInput
    transactions?: TransactionCreateNestedManyWithoutStatementInput
    insights?: InsightCreateNestedManyWithoutStatementInput
  }

  export type StatementUncheckedCreateWithoutBankAccountInput = {
    id?: string
    userId: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedCreateNestedManyWithoutStatementInput
    insights?: InsightUncheckedCreateNestedManyWithoutStatementInput
  }

  export type StatementCreateOrConnectWithoutBankAccountInput = {
    where: StatementWhereUniqueInput
    create: XOR<StatementCreateWithoutBankAccountInput, StatementUncheckedCreateWithoutBankAccountInput>
  }

  export type StatementCreateManyBankAccountInputEnvelope = {
    data: StatementCreateManyBankAccountInput | StatementCreateManyBankAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBankAccountsInput = {
    update: XOR<UserUpdateWithoutBankAccountsInput, UserUncheckedUpdateWithoutBankAccountsInput>
    create: XOR<UserCreateWithoutBankAccountsInput, UserUncheckedCreateWithoutBankAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBankAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBankAccountsInput, UserUncheckedUpdateWithoutBankAccountsInput>
  }

  export type UserUpdateWithoutBankAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    insights?: InsightUpdateManyWithoutUserNestedInput
    chats?: ChatUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBankAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUserNestedInput
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StatementUpsertWithWhereUniqueWithoutBankAccountInput = {
    where: StatementWhereUniqueInput
    update: XOR<StatementUpdateWithoutBankAccountInput, StatementUncheckedUpdateWithoutBankAccountInput>
    create: XOR<StatementCreateWithoutBankAccountInput, StatementUncheckedCreateWithoutBankAccountInput>
  }

  export type StatementUpdateWithWhereUniqueWithoutBankAccountInput = {
    where: StatementWhereUniqueInput
    data: XOR<StatementUpdateWithoutBankAccountInput, StatementUncheckedUpdateWithoutBankAccountInput>
  }

  export type StatementUpdateManyWithWhereWithoutBankAccountInput = {
    where: StatementScalarWhereInput
    data: XOR<StatementUpdateManyMutationInput, StatementUncheckedUpdateManyWithoutBankAccountInput>
  }

  export type UserCreateWithoutStatementsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutUserInput
    insights?: InsightCreateNestedManyWithoutUserInput
    chats?: ChatCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStatementsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    insights?: InsightUncheckedCreateNestedManyWithoutUserInput
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStatementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatementsInput, UserUncheckedCreateWithoutStatementsInput>
  }

  export type BankAccountCreateWithoutStatementsInput = {
    id?: string
    accountHolderName: string
    accountNumber: string
    ifscCode?: string | null
    bankName: string
    branch?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBankAccountsInput
  }

  export type BankAccountUncheckedCreateWithoutStatementsInput = {
    id?: string
    userId: string
    accountHolderName: string
    accountNumber: string
    ifscCode?: string | null
    bankName: string
    branch?: string | null
    createdAt?: Date | string
  }

  export type BankAccountCreateOrConnectWithoutStatementsInput = {
    where: BankAccountWhereUniqueInput
    create: XOR<BankAccountCreateWithoutStatementsInput, BankAccountUncheckedCreateWithoutStatementsInput>
  }

  export type TransactionCreateWithoutStatementInput = {
    id?: string
    date: Date | string
    merchant: string
    amount: number
    currency?: string
    category?: string | null
    description?: string | null
    rawLine: string
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutStatementInput = {
    id?: string
    userId: string
    date: Date | string
    merchant: string
    amount: number
    currency?: string
    category?: string | null
    description?: string | null
    rawLine: string
  }

  export type TransactionCreateOrConnectWithoutStatementInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutStatementInput, TransactionUncheckedCreateWithoutStatementInput>
  }

  export type TransactionCreateManyStatementInputEnvelope = {
    data: TransactionCreateManyStatementInput | TransactionCreateManyStatementInput[]
    skipDuplicates?: boolean
  }

  export type InsightCreateWithoutStatementInput = {
    id?: string
    month: string
    score?: number | null
    summary: string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutInsightsInput
  }

  export type InsightUncheckedCreateWithoutStatementInput = {
    id?: string
    userId: string
    month: string
    score?: number | null
    summary: string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type InsightCreateOrConnectWithoutStatementInput = {
    where: InsightWhereUniqueInput
    create: XOR<InsightCreateWithoutStatementInput, InsightUncheckedCreateWithoutStatementInput>
  }

  export type InsightCreateManyStatementInputEnvelope = {
    data: InsightCreateManyStatementInput | InsightCreateManyStatementInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStatementsInput = {
    update: XOR<UserUpdateWithoutStatementsInput, UserUncheckedUpdateWithoutStatementsInput>
    create: XOR<UserCreateWithoutStatementsInput, UserUncheckedCreateWithoutStatementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatementsInput, UserUncheckedUpdateWithoutStatementsInput>
  }

  export type UserUpdateWithoutStatementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    insights?: InsightUpdateManyWithoutUserNestedInput
    chats?: ChatUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStatementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUserNestedInput
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BankAccountUpsertWithoutStatementsInput = {
    update: XOR<BankAccountUpdateWithoutStatementsInput, BankAccountUncheckedUpdateWithoutStatementsInput>
    create: XOR<BankAccountCreateWithoutStatementsInput, BankAccountUncheckedCreateWithoutStatementsInput>
    where?: BankAccountWhereInput
  }

  export type BankAccountUpdateToOneWithWhereWithoutStatementsInput = {
    where?: BankAccountWhereInput
    data: XOR<BankAccountUpdateWithoutStatementsInput, BankAccountUncheckedUpdateWithoutStatementsInput>
  }

  export type BankAccountUpdateWithoutStatementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolderName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBankAccountsNestedInput
  }

  export type BankAccountUncheckedUpdateWithoutStatementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountHolderName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutStatementInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutStatementInput, TransactionUncheckedUpdateWithoutStatementInput>
    create: XOR<TransactionCreateWithoutStatementInput, TransactionUncheckedCreateWithoutStatementInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutStatementInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutStatementInput, TransactionUncheckedUpdateWithoutStatementInput>
  }

  export type TransactionUpdateManyWithWhereWithoutStatementInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutStatementInput>
  }

  export type InsightUpsertWithWhereUniqueWithoutStatementInput = {
    where: InsightWhereUniqueInput
    update: XOR<InsightUpdateWithoutStatementInput, InsightUncheckedUpdateWithoutStatementInput>
    create: XOR<InsightCreateWithoutStatementInput, InsightUncheckedCreateWithoutStatementInput>
  }

  export type InsightUpdateWithWhereUniqueWithoutStatementInput = {
    where: InsightWhereUniqueInput
    data: XOR<InsightUpdateWithoutStatementInput, InsightUncheckedUpdateWithoutStatementInput>
  }

  export type InsightUpdateManyWithWhereWithoutStatementInput = {
    where: InsightScalarWhereInput
    data: XOR<InsightUpdateManyMutationInput, InsightUncheckedUpdateManyWithoutStatementInput>
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementCreateNestedManyWithoutUserInput
    insights?: InsightCreateNestedManyWithoutUserInput
    chats?: ChatCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutUserInput
    insights?: InsightUncheckedCreateNestedManyWithoutUserInput
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type StatementCreateWithoutTransactionsInput = {
    id?: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutStatementsInput
    bankAccount?: BankAccountCreateNestedOneWithoutStatementsInput
    insights?: InsightCreateNestedManyWithoutStatementInput
  }

  export type StatementUncheckedCreateWithoutTransactionsInput = {
    id?: string
    userId: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: string | null
    insights?: InsightUncheckedCreateNestedManyWithoutStatementInput
  }

  export type StatementCreateOrConnectWithoutTransactionsInput = {
    where: StatementWhereUniqueInput
    create: XOR<StatementCreateWithoutTransactionsInput, StatementUncheckedCreateWithoutTransactionsInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUpdateManyWithoutUserNestedInput
    insights?: InsightUpdateManyWithoutUserNestedInput
    chats?: ChatUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutUserNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUserNestedInput
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StatementUpsertWithoutTransactionsInput = {
    update: XOR<StatementUpdateWithoutTransactionsInput, StatementUncheckedUpdateWithoutTransactionsInput>
    create: XOR<StatementCreateWithoutTransactionsInput, StatementUncheckedCreateWithoutTransactionsInput>
    where?: StatementWhereInput
  }

  export type StatementUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: StatementWhereInput
    data: XOR<StatementUpdateWithoutTransactionsInput, StatementUncheckedUpdateWithoutTransactionsInput>
  }

  export type StatementUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutStatementsNestedInput
    bankAccount?: BankAccountUpdateOneWithoutStatementsNestedInput
    insights?: InsightUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    insights?: InsightUncheckedUpdateManyWithoutStatementNestedInput
  }

  export type UserCreateWithoutInsightsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    chats?: ChatCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInsightsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
    resourceInteractions?: ResourceInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInsightsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInsightsInput, UserUncheckedCreateWithoutInsightsInput>
  }

  export type StatementCreateWithoutInsightsInput = {
    id?: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutStatementsInput
    bankAccount?: BankAccountCreateNestedOneWithoutStatementsInput
    transactions?: TransactionCreateNestedManyWithoutStatementInput
  }

  export type StatementUncheckedCreateWithoutInsightsInput = {
    id?: string
    userId: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutStatementInput
  }

  export type StatementCreateOrConnectWithoutInsightsInput = {
    where: StatementWhereUniqueInput
    create: XOR<StatementCreateWithoutInsightsInput, StatementUncheckedCreateWithoutInsightsInput>
  }

  export type UserUpsertWithoutInsightsInput = {
    update: XOR<UserUpdateWithoutInsightsInput, UserUncheckedUpdateWithoutInsightsInput>
    create: XOR<UserCreateWithoutInsightsInput, UserUncheckedCreateWithoutInsightsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInsightsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInsightsInput, UserUncheckedUpdateWithoutInsightsInput>
  }

  export type UserUpdateWithoutInsightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    chats?: ChatUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInsightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
    resourceInteractions?: ResourceInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StatementUpsertWithoutInsightsInput = {
    update: XOR<StatementUpdateWithoutInsightsInput, StatementUncheckedUpdateWithoutInsightsInput>
    create: XOR<StatementCreateWithoutInsightsInput, StatementUncheckedCreateWithoutInsightsInput>
    where?: StatementWhereInput
  }

  export type StatementUpdateToOneWithWhereWithoutInsightsInput = {
    where?: StatementWhereInput
    data: XOR<StatementUpdateWithoutInsightsInput, StatementUncheckedUpdateWithoutInsightsInput>
  }

  export type StatementUpdateWithoutInsightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutStatementsNestedInput
    bankAccount?: BankAccountUpdateOneWithoutStatementsNestedInput
    transactions?: TransactionUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateWithoutInsightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutStatementNestedInput
  }

  export type ResourceInteractionCreateWithoutResourceInput = {
    id?: string
    type: string
    interactedAt?: Date | string
    user: UserCreateNestedOneWithoutResourceInteractionsInput
  }

  export type ResourceInteractionUncheckedCreateWithoutResourceInput = {
    id?: string
    userId: string
    type: string
    interactedAt?: Date | string
  }

  export type ResourceInteractionCreateOrConnectWithoutResourceInput = {
    where: ResourceInteractionWhereUniqueInput
    create: XOR<ResourceInteractionCreateWithoutResourceInput, ResourceInteractionUncheckedCreateWithoutResourceInput>
  }

  export type ResourceInteractionCreateManyResourceInputEnvelope = {
    data: ResourceInteractionCreateManyResourceInput | ResourceInteractionCreateManyResourceInput[]
    skipDuplicates?: boolean
  }

  export type ResourceInteractionUpsertWithWhereUniqueWithoutResourceInput = {
    where: ResourceInteractionWhereUniqueInput
    update: XOR<ResourceInteractionUpdateWithoutResourceInput, ResourceInteractionUncheckedUpdateWithoutResourceInput>
    create: XOR<ResourceInteractionCreateWithoutResourceInput, ResourceInteractionUncheckedCreateWithoutResourceInput>
  }

  export type ResourceInteractionUpdateWithWhereUniqueWithoutResourceInput = {
    where: ResourceInteractionWhereUniqueInput
    data: XOR<ResourceInteractionUpdateWithoutResourceInput, ResourceInteractionUncheckedUpdateWithoutResourceInput>
  }

  export type ResourceInteractionUpdateManyWithWhereWithoutResourceInput = {
    where: ResourceInteractionScalarWhereInput
    data: XOR<ResourceInteractionUpdateManyMutationInput, ResourceInteractionUncheckedUpdateManyWithoutResourceInput>
  }

  export type UserCreateWithoutResourceInteractionsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    insights?: InsightCreateNestedManyWithoutUserInput
    chats?: ChatCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResourceInteractionsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    insights?: InsightUncheckedCreateNestedManyWithoutUserInput
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput
    bankAccounts?: BankAccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResourceInteractionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResourceInteractionsInput, UserUncheckedCreateWithoutResourceInteractionsInput>
  }

  export type LearningResourceCreateWithoutInteractionsInput = {
    id?: string
    title: string
    description: string
    type: string
    category: string
    url: string
    thumbnailUrl?: string | null
    author?: string | null
    tags?: LearningResourceCreatetagsInput | string[]
    createdAt?: Date | string
  }

  export type LearningResourceUncheckedCreateWithoutInteractionsInput = {
    id?: string
    title: string
    description: string
    type: string
    category: string
    url: string
    thumbnailUrl?: string | null
    author?: string | null
    tags?: LearningResourceCreatetagsInput | string[]
    createdAt?: Date | string
  }

  export type LearningResourceCreateOrConnectWithoutInteractionsInput = {
    where: LearningResourceWhereUniqueInput
    create: XOR<LearningResourceCreateWithoutInteractionsInput, LearningResourceUncheckedCreateWithoutInteractionsInput>
  }

  export type UserUpsertWithoutResourceInteractionsInput = {
    update: XOR<UserUpdateWithoutResourceInteractionsInput, UserUncheckedUpdateWithoutResourceInteractionsInput>
    create: XOR<UserCreateWithoutResourceInteractionsInput, UserUncheckedCreateWithoutResourceInteractionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResourceInteractionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResourceInteractionsInput, UserUncheckedUpdateWithoutResourceInteractionsInput>
  }

  export type UserUpdateWithoutResourceInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    insights?: InsightUpdateManyWithoutUserNestedInput
    chats?: ChatUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResourceInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUserNestedInput
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput
    bankAccounts?: BankAccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LearningResourceUpsertWithoutInteractionsInput = {
    update: XOR<LearningResourceUpdateWithoutInteractionsInput, LearningResourceUncheckedUpdateWithoutInteractionsInput>
    create: XOR<LearningResourceCreateWithoutInteractionsInput, LearningResourceUncheckedCreateWithoutInteractionsInput>
    where?: LearningResourceWhereInput
  }

  export type LearningResourceUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: LearningResourceWhereInput
    data: XOR<LearningResourceUpdateWithoutInteractionsInput, LearningResourceUncheckedUpdateWithoutInteractionsInput>
  }

  export type LearningResourceUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LearningResourceUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningResourceUncheckedUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LearningResourceUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementCreateManyUserInput = {
    id?: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: string | null
  }

  export type TransactionCreateManyUserInput = {
    id?: string
    statementId?: string | null
    date: Date | string
    merchant: string
    amount: number
    currency?: string
    category?: string | null
    description?: string | null
    rawLine: string
  }

  export type InsightCreateManyUserInput = {
    id?: string
    statementId?: string | null
    month: string
    score?: number | null
    summary: string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ChatCreateManyUserInput = {
    id?: string
    role: string
    content: string
    imageUrl?: string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type BankAccountCreateManyUserInput = {
    id?: string
    accountHolderName: string
    accountNumber: string
    ifscCode?: string | null
    bankName: string
    branch?: string | null
    createdAt?: Date | string
  }

  export type ResourceInteractionCreateManyUserInput = {
    id?: string
    resourceId: string
    type: string
    interactedAt?: Date | string
  }

  export type StatementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccount?: BankAccountUpdateOneWithoutStatementsNestedInput
    transactions?: TransactionUpdateManyWithoutStatementNestedInput
    insights?: InsightUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutStatementNestedInput
    insights?: InsightUncheckedUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    bankAccountId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
    statement?: StatementUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
  }

  export type InsightUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statement?: StatementUpdateOneWithoutInsightsNestedInput
  }

  export type InsightUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementId?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsightUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementId?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolderName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUpdateManyWithoutBankAccountNestedInput
  }

  export type BankAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolderName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutBankAccountNestedInput
  }

  export type BankAccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolderName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceInteractionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: LearningResourceUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type ResourceInteractionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceInteractionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementCreateManyBankAccountInput = {
    id?: string
    userId: string
    filePath: string
    originalFilename: string
    uploadedAt?: Date | string
    status?: string
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type StatementUpdateWithoutBankAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutStatementsNestedInput
    transactions?: TransactionUpdateManyWithoutStatementNestedInput
    insights?: InsightUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateWithoutBankAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedUpdateManyWithoutStatementNestedInput
    insights?: InsightUncheckedUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateManyWithoutBankAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionCreateManyStatementInput = {
    id?: string
    userId: string
    date: Date | string
    merchant: string
    amount: number
    currency?: string
    category?: string | null
    description?: string | null
    rawLine: string
  }

  export type InsightCreateManyStatementInput = {
    id?: string
    userId: string
    month: string
    score?: number | null
    summary: string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutStatementInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutStatementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateManyWithoutStatementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    merchant?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rawLine?: StringFieldUpdateOperationsInput | string
  }

  export type InsightUpdateWithoutStatementInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInsightsNestedInput
  }

  export type InsightUncheckedUpdateWithoutStatementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsightUncheckedUpdateManyWithoutStatementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceInteractionCreateManyResourceInput = {
    id?: string
    userId: string
    type: string
    interactedAt?: Date | string
  }

  export type ResourceInteractionUpdateWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResourceInteractionsNestedInput
  }

  export type ResourceInteractionUncheckedUpdateWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceInteractionUncheckedUpdateManyWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interactedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}