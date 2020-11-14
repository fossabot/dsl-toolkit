<!--- destination qa rewrite begin -->
### QA monorepo
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/dsl-toolkit/dsl-toolkit/tree/master.svg?style=svg)](https://circleci.com/gh/311ecode/dsl-toolkit/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/0fbd6b842ef4ad099067/maintainability)](https://codeclimate.com/github/dsl-toolkit/dsl-framework/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/dsl-toolkit/dsl-framework/badge.svg?targetFile=packages%2Fdsl-framework%2Fpackage.json)](https://snyk.io/test/github/311ecode/dsl-toolkit?targetFile=packages%2Fdsl-framework%2Fpackage.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fdsl-toolkit.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fdsl-toolkit?ref=badge_shield)
[![Known Vulnerabilities](https://snyk.io/test/github/dsl-toolkit/dsl-framework/badge.svg)](https://snyk.io/test/github/{username}/{repo})
[![HitCount](http://hits.dwyl.com/dsl-toolkit/dsl-framework.svg)](http://hits.dwyl.com/dsl-toolkit/dsl-framework)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
<!--- destination qa rewrite end -->


# Installation
```bash
npm install require-a-lot
```
# Motivation
Sometimes it is better to have a different way to load your node modules.

## Examples
basic use:
```javascript 1.8
const requireALot = require('require-a-lot')
const {camelcase, chai, babelCli, testSpec} =
requireALot(require)('camelcase', 'chai', 'license-checker', './test-spec')()
```
Please remember the closing empty function call at the end.

using aliases:
```javascript 1.8
const {cc, lc, testSpec} =
requireALot(require)('camelcase', 'license-checker', './test-spec')
    .alias('camelcase', 'cc')
    .alias('license-checker', 'lc')()
```
The returning object will contain only the aliases for the aliased entries.

getting object tag of a library (like expect in chai?)
```javascript 1.8
const {expect} = require('chai')
```

Instead of the previous you can do:
```javascript 1.8
const {chai, expect} =
requireALot(require)('chai', 'license-checker', './test-spec')
    .from('chai', 'expect')()
```
Of course, you can chain .form calls as much as you want.

Just for the sake of the convenience, maybe you don't want to write the left part of the equation for yourself.
Add the .log chaining call any time and it will console.log it for you if you:
```javascript 1.8
const {chai, expect, test-spec,license-checker} =
requireALot(require)('chai', 'license-checker', './test-spec')
    .log
    .from('chai', 'expect')()

```
You will see in your console:
```
const {chai, expect, test-spec,license-checker} =

```

So you can easily copy and paste it to your code so just run your code, and copy the console output save some typing for yourself. But this library does much more don't stop here.

Sometimes you don't need the chai, so you say:
```javascript 1.8
const {
    expect,
    testSpec,
    licenseChecker,
 } =
requireALot(require)('chai', 'license-checker', './test-spec')
    .log
    .from('chai', 'expect').hide('chai')()
```
You will see in your console:
```
const { expect, testSpec, licenseChecker, } =
```
Of course, you can call as much time .hide as you want to, with as much parameter as you want.

Ahh, and one more thing using .info will give you some decent information about your dependencies required by the library.
If you see it practically it gives you a nice overview of your code. Please don't stop here, it will give you even more.
```javascript 1.8
{
  l, //alias of cowlog | cowlog@1.6.18 (+?) | homepage: https://github.com/311ecode/cowlog/tree/master/packages/cow...
  chai, //chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the ...
  expect //tag of chai | chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for n...
} =
requireALot(require)('cowlog','chai')
    .from('chai',['expect'])
    .log
    .info
    .alias('cowlog', 'l')()
```
As you can see sometimes it is useful to create aliases from existing libraries, indeed, in this case, the naming is
really bad, but I keep it like this, so no one will do such crazy thing. But for instance, I like to use the object-path
library. If I use in a file quite often I have used it often, so I just say `.alias('object-path', 'op')` indeed this is
not elegant, but let's face it at least less typing, less space used in the line, and with the .info call it is actually
easy to trace, because, well you see why.

Indeed, you will see in your console:
```
{
  l, //alias of cowlog | cowlog@1.6.18 (+?) | homepage: https://github.com/311ecode/cowlog/tree/master/packages/cowlog | description: Development time logging for NodeJs
  chai, //chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
  expect, //tag of chai | chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
} =
```

The .info feature is useful if you include the requiring part from the other module like:
```javascript 1.8
const {
  l, //alias of cowlog | cowlog@1.6.18 (+?) | homepage: https://github.com/311ecode/cowlog/tree/master/packages/cowlog | description: Development time logging for NodeJs
  chai, //chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
  expect, //tag of chai | chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
} = require('./your_module')
```
so `./your_module` will contain all the require-a-lot magic only like :
```javascript 1.8
module.exports = requireALot(require)('cowlog','chai')
    .from('chai',['expect'])
    .log
    .info
    .alias('cowlog', 'l')()
```
Because it caches the output, because that is just an object you can use it in multiple modules. Please, go on this
library can do much more for you than this.

To make it useful please use .tag together with the .linkDirectory and indeed in real life put the requireALot line in a
a separate module like above, in the example I don't do it because of the size of this document, but all the examples from
now on is implemented optimally if it is in a separate module:
```javascript 1.8
const path = require('path')
// [require-a-lot] testIncludes begin
const {
  capture, //reative path: ../lib/capture
  assert, //assert@1.4.1 (+?) | homepage: https://github.com/defunctzombie/commonjs-assert | description: commonjs assert - node.js api compatible
  cowlog, //cowlog@1.6.18 (+?) | homepage: https://github.com/311ecode/cowlog/tree/master/packages/cowlog | description: Development time logging for NodeJs
}  
// [require-a-lot] testIncludes end
 =  requireALot(require)('../lib/capture','assert', 'cowlog')
      .log
      .info
      .tag("testIncludes").linkDirectory(path.join(__dirname))()
```
It adds two extra comment lines for the library, that helps the engine to identify the location of your dependencies
in the code. If you add or remove more it will be updated automatically upon running your application if you think on
it, you can implement in a way that your application will be updated before it evaluates the files where you use the
library, so every time your application get the dependencies are defined in the library.
The best feature is ahead, keep reading :D

```javascript 1.8
const path = require('path')
// [require-a-lot] testIncludes begin
const {
  assert, //assert@1.4.1 (+?) | homepage: https://github.com/defunctzombie/commonjs-assert | description: commonjs assert - node.js api compatible
}  
// [require-a-lot] testIncludes end
 =  requireALot(require)('../lib/capture','assert', 'cowlog')
      // .log
      .info
      .tag("testIncludes").linkDirectory(path.join(__dirname))
      .removeUnused
      ()

      assert(1 === 1)
```

As you see above the .removeUnused utilizes the esprima javascript parser and tries to find out what dependencies you
actually, use and removes the ones that you don't refer to in the actual module. This is not over yet!

There is one more thing!

## Dependency Injection

You can use this package as your Dependency Injection container. Well sort of a container, because it will put the used items of them
to your modules just it did all the dependencies you defined in it.
with the
### .define
call you can declare values you want to get back as they are it can be pretty much anything like:

`.define('one',1)
.define('incrementals', [1,2,3])
.define('addTwoItem', (a,b)=>a+b)`

### .compose
Let's say you want to create an object based on all the values your object have till now.
for instance your object uses the assert library and all the defines a few lines above.
so you can say:
.compose('safeAdd', (assert, addTwoItem)=>(a, b){
    try{
      assert(!isNaN(a) && !isNaN(b))    
      return addTwoItem(a,b)
    }catch(e){
      return false
    }
  }, ['assert', 'addTwoItem'])

it will create the safeAdd tag for the output object and that will be the output of the function
you declare ass second parameter, the third parameter contains all the strings of the object tags
the output object contains. Those values form the object will be passed to the second parameter,
in that order the keys are in the the third parameter.  

you can define values that will be given back as those are with the .define

Actually I made it a lazy evaluation dependency injection container too. I only needed to add the .compose
chain function to the already existing dsl.

```javascript 1.8
const path = require('path')
// [require-a-lot] testIncludes begin
const {
  sayHelloToName,
}  
// [require-a-lot] testIncludes end
 =  requireALot(require)('assert', 'cowlog')
      // .log
      .compose('logger', cowlog=>cowlog().log, 'cowlog')
      .compose('sayHelloToName', (logger)=>(name)=>logger(`hello ${name}`)(), 'logger')
      .compose('somethingComplex', (logger, sayHelloToName, assert)=>(name, success=true)=>{
        sayHelloToName(name)
        try {
          assert(success)
        } catch (e) {
          logger (name, "unfortunately not success")()
        }

        return({name, success})
      }, ['logger', 'sayHelloToName', 'assert'])
      .info
      .tag("testIncludes").linkDirectory(path.join(__dirname))
      .removeUnused
      ()

      somethingComplex('Justin', true)
```
More features are coming...
