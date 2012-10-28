## [PureMVC](http://puremvc.github.com/) Standard Framework for [TypeScript](https://github.com/PureMVC/puremvc-typescript-standard-framework/wiki)

These are sources, unit tests and minified library for PureMVC Standard Framework for TypeScript.

## Status
Development - [Version 1.0](https://github.com/PureMVC/puremvc-typescript-standard/blob/master/VERSION)

Best to consider it development while the TypeScript language specification is not finalized.

## Platforms / Technologies
* [TypeScript](http://www.typescriptlang.org/)
* [YUI Test](https://github.com/yui/yuitest)
* [YUI Compressor](http://developer.yahoo.com/yui/compressor/)
* [Ant](http://ant.apache.org/)

## Usage

As this port depends on the TypeScript language you may want to start by reading TypeScript "getting started":http://www.typescriptlang.org/.

Unit Test can be run live in the browser using included HTML files :
* One PureMVC Framework plain JavaScript (compiled from TypeScript) file per test [test-plain.html](https://github.com/PureMVC/puremvc-typescript-standard/blob/master/test-plain.html)
* Minified PureMVC Framework JavaScript library (compiled from TypeScript) [test-minified.html](https://github.com/PureMVC/puremvc-typescript-standard/blob/master/test-minified.html)

## Build

To build the project you'll need to download and install :
* [TypeScript compiler](http://www.typescriptlang.org/#Download)
* [Ant](http://ant.apache.org/)

1. Rename the file [user.properties.sample](https://github.com/PureMVC/puremvc-typescript-standard/blob/master/user.properties.sample) to **user.properties**
2. Edit the file and replace **MY_TYPESCRIPT_COMPILER_PATH** bt the real TypeScript compiler full
system path. e.g. on windows: `<code>`typescript.compiler.path = C:/Documents and Settings/{USER NAME HERE}/Application Data/npm/tsc.cmd
3. Use your favorite editor to run Ant or simply type `<code>`ant puremvc-typescript-standard/build

## License
* PureMVC TypeScript Standard Framework - Copyright © 2012 Frederic Saunier
* PureMVC - Copyright © 2006-2012 Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.