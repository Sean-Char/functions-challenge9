// Make an aray wrapper object w/ methods get, store, and append, such that an attacker cannot get access to the private array.

function vector() {
  var array = [];

  return {
    get: function get(i) {
      return array[i];
    },
    store: function store(i, v) { // i param. is string, making it vulnarable.
      array[i] = v;
    },
    append: function append(v) {
      array.push(v);
    }
  };
}

myvector = vector();
console.log(myvector.append(7));
console.log(myvector.store(1, 8));
console.log(myvector.get(0));  // 7
console.log(myvector.get(1)); // 8

// *************************** ATTACKERS CODE ****************************
var stash;
myvector.store('push', function(){
  stash.this;
})
myvector.append(); // stash is array

//*************************** FIXED CODE SOLUTION ************************

function vector() {
  var array = [];

  return {
    get: function(i) {
      return array[+i]; // +i turns string into a number
    },
    store: function(i, v) {
      array[+i] = v;
    },
    append: function append(v) {
      array[array.length] = v;
    }
  };
}

//*********************************************************************
// Make a function taht makes a publish/ subscribe object. It will reliably deliver all publications to all subscribers in the right order.

function pubsub() {
  var subscribers = [];
  return {
    subscribe: function(subscriber) {
      subscribers.push(subscriber);
    },
    publish: function(publication) {
      var i, length = subscribers.length;
      for (var i = 0; i < length; i += 1) {
        subscribers[i](publication);
      }
    }
  };
}

my_pubsub = pubsub();
console.log(my_pubsub.subscribe(console.log));
console.log(my_pubsub.publish("It works!")); // log It works!

//***************************** ATTACKERS CODE ************************
my_pubsub.subscribe() // invocation with nothing: will cause undefined and everything after will break

my_pubsub.subscribe(function() {
  this.length = 0;
})

my_pubsub.subscribe(limit(function() {
  my_pubsub.publish("Out of order");
}, 1));

//******************************* FIXED CODE **************************
function pubsub() {
  var subscribers = [];
  return Object.freeze({ // will fix attacks. no one can tamper with the instance.
    subscribe: function(subscriber) {
      subscribers.push(subscriber);
    },
    publish: function(publication) {
      subscribers.forEach(function(s) {
        try {
          s(publication);
        } catch (ignore) { }

        // setTimeout(function() {
        //   s(publication);
        // }, 0);
      });
    }
  });
}
