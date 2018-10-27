## [PureMVC](http://puremvc.github.com/) TypeScript MultiCore Framework
PureMVC is a lightweight framework for creating applications based upon the classic [Model-View-Controller](http://en.wikipedia.org/wiki/Model-view-controller) design meta-pattern. This is a TypeScript port of the [AS3 reference implementation of the MultiCore Version](https://github.com/PureMVC/puremvc-as3-multicore-framework/wiki). It supports [modular programming](http://en.wikipedia.org/wiki/Modular_programming) through the use of [Multiton](http://en.wikipedia.org/wiki/Multiton) Core actors instead of the [Singleton](http://en.wikipedia.org/wiki/Singleton_pattern)s used in the [Standard Version](https://github.com/PureMVC/puremvc-typescript-standard-framework/wiki).

* [Discussion](http://forums.puremvc.org/index.php?board=113.0)
* [Live Unit Test Runner](http://puremvc.org/pages/demos/TS/PureMVC_TS_MultiCore_UnitTests/)

## Status
Production - [Version 1.1](https://github.com/PureMVC/puremvc-typescript-multicore-framework/blob/master/VERSION)

## Platforms / Technologies
* [TypeScript](http://www.typescriptlang.org/)
* [require.js](http://jqueryui.com/)
* [YUI Test](https://github.com/yui/yuitest)
* [YUI Compressor](http://developer.yahoo.com/yui/compressor/)
* [YUIAnt](http://www.ubik-ingenierie.com/miscellanous/YUIAnt/)
* [Ant](http://ant.apache.org/)

## Usage

As this port depends on the TypeScript language you may want to start by reading [TypeScript getting started guide](http://www.typescriptlang.org/).

Unit Test can be run live in the browser using included HTML file [test.html](https://github.com/PureMVC/puremvc-typescript-multicore-framework/blob/master/test-minified.html)

## Build

To build the project you'll need to download and install :
* [TypeScript compiler](http://www.typescriptlang.org/#Download)
* [Ant](http://ant.apache.org/)
* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html/) (Ant need a JDK not a JRE, also don't forget to change environment var JAVA_HOME to the JDK path).

1. Rename the file [user.properties.sample](https://github.com/PureMVC/puremvc-typescript-multicore-framework/blob/master/user.properties.sample) to **user.properties**
2. Edit the file and replace **MY_TYPESCRIPT_COMPILER_PATH** by the real TypeScript compiler full
system path. e.g. on windows: <code>typescript.compiler.path = C:/Documents and Settings/{USER NAME HERE}/Application Data/npm/tsc.cmd
3. Use your favorite editor to run Ant or simply type <code>ant puremvc-typescript-multicore-framework/build

## License
* PureMVC TypeScript Multicore Framework - Copyright © 2014 Frederic Saunier
* PureMVC - Copyright © 2006-2014 Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
