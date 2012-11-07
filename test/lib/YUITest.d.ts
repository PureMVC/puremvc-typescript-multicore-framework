/**
 * Minimalist TypeScript description file for YUITest including only Asserts to give the compiler
 * near the exact necessary to be able to compile the PureMVC framework Unit Tests.
 */
declare module YUITest
{
	export class Assert
	{
		/**
		 * Forces an assertion error to occur.
		 * @param message The message to display with the failure.
		 */
		static fail( message?:string ):void;
	
		//-------------------------------------------------------------------------
		// Equality Assertion Methods
		//-------------------------------------------------------------------------
	
		/**
		 * Asserts that a value is equal to another. This uses the double equals sign
		 * so type cohersion may occur.
		 * @param expected The expected value.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static areEqual( expected:any, actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is not equal to another. This uses the double equals sign
		 * so type cohersion may occur.
		 * @param unexpected The unexpected value.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static areNotEqual( unexpected:any, actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is not the same as another. This uses the triple equals sign
		 * so no type cohersion may occur.
		 * @param unexpected The unexpected value.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static areNotSame(unexpected:any, actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is the same as another. This uses the triple equals sign
		 * so no type cohersion may occur.
		 * @param expected The expected value.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static areSame(expected:any, actual:any, message?:string ):void;
	
		//-------------------------------------------------------------------------
		// Boolean Assertion Methods
		//-------------------------------------------------------------------------
	
		/**
		 * Asserts that a value is false. This uses the triple equals sign
		 * so no type cohersion may occur.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isFalse( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is true. This uses the triple equals sign
		 * so no type cohersion may occur.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isTrue( actual:any, message?:string ):void;
	
		//-------------------------------------------------------------------------
		// Special Value Assertion Methods
		//-------------------------------------------------------------------------
	
		/**
		 * Asserts that a value is not a number.
		 * @param actual The value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isNaN( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is not the special NaN value.
		 * @param actual The value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isNotNaN( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is not null. This uses the triple equals sign
		 * so no type cohersion may occur.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isNotNull( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is not undefined. This uses the triple equals sign
		 * so no type cohersion may occur.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isNotUndefined( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is null. This uses the triple equals sign
		 * so no type cohersion may occur.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isNull( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is undefined. This uses the triple equals sign
		 * so no type cohersion may occur.
		 * @param actual The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isUndefined( actual:any, message?:string ):void;
	
		//--------------------------------------------------------------------------
		// Instance Assertion Methods
		//--------------------------------------------------------------------------
	
		/**
		 * Asserts that a value is an array.
		 * @param actual The value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isArray( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is a Boolean.
		 * @param actual The value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isBoolean( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is a function.
		 * @param actual The value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isFunction( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is an instance of a particular object. This may return
		 * incorrect results when comparing objects from one frame to constructors in
		 * another frame. For best results, don't use in a cross-frame manner.
		 * @param {Function} expected The function that the object should be an instance of.
		 * @param actual The object to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isInstanceOf( expected:any, actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is a number.
		 * @param actual The value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isNumber( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is an object.
		 * @param actual The value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isObject( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is a string.
		 * @param actual The value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isString( actual:any, message?:string ):void;
	
		/**
		 * Asserts that a value is of a particular type.
		 * @param expectedType The expected type of the variable.
		 * @param actualValue The actual value to test.
		 * @param message The message to display if the assertion fails.
		 */
		static isTypeOf( expectedType:string, actualValue:any, message?:string ):void;
	
	
		//--------------------------------------------------------------------------
		// Error Detection Methods
		//--------------------------------------------------------------------------
	
		/**
		 * Asserts that executing a particular method should throw an error of
		 * a specific type. This is a replacement for _should.error.
		 *
		 * @param {String|Function|Object} expectedError
		 *      If a string, this  is the error message that the error must have; if a function,
		 *      this is the constructor that should have been used to create the thrown error; if an
		 *      object, this is an instance of a particular error type with a specific error message
		 *      (both must match).
		 * @param method The method to execute that should throw the error.
		 * @param message The message to display if the assertion
		 *      fails.
		 */
		static throwsError( expectedError:any, method:Function, message?:string ):void;
	}
}