// Call usecase
// When we want to reuse the function or function from another object, we can borrow it using call
// It takes context and other parameters as its parameters

// Apply usecase
// It is more like call method, only difference is we need to pass the args to the function as array 

// *** Learning Call method prototype is enough to solve apply and bind function ***

let anbu = {
    name: "Anbarasan",
    age: 25,
    displayname: function (address) {
        console.log(`Name ${this.name}, Age ${this.age}, Address ${address}`)
    }
}
let ram = {
    name: "Ram",
    age: 22,
}

/*
    Approach : Basic call function will take thisArgs and ...args and it will call a function with those values
    Function (displayname), will be available as "this" keyword inside custom call  method,
    In order to handle null, undefined we just check thisArgs, If anything is null or undefined use window object
    There is a possibility of sending primitive value as thisArgs, so convert everything to object using Object(context)

    Now to call a function on context object, we need to first attach the function inside it. context => { func : displayname}
    To reduce name coliision, create unique name using symbol() and attach the function context => {func1234 : displayname}
    Now call the function with args and delete the identifier after it 
*/

Function.prototype.customCall_Apply = function(thisArg, ...args) {
    const func = this;
    let context = thisArg ?? window;
    context = Object(context);
    
    // Attach the function inside the context
    const identifier = Symbol('func');
    context[identifier] = func;
    //For Call Method
    const callResponse = context[identifier](...args);
   
    //For Apply Method
    const applyResponse = context[identifier](args);

    delete context[identifier];
  
    return callResponse;
}


// anbu.displayname.call(ram);
anbu.displayname.customCall(ram, 'Pondicherry');