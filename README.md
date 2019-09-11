# PkgOptions: package configuration system for Julia

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://tkf.github.io/PkgOptions.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://tkf.github.io/PkgOptions.jl/dev)
[![Build Status](https://travis-ci.com/tkf/PkgOptions.jl.svg?branch=master)](https://travis-ci.com/tkf/PkgOptions.jl)
[![Codecov](https://codecov.io/gh/tkf/PkgOptions.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/tkf/PkgOptions.jl)
[![Coveralls](https://coveralls.io/repos/github/tkf/PkgOptions.jl/badge.svg?branch=master)](https://coveralls.io/github/tkf/PkgOptions.jl?branch=master)

## Features

* Project/environment-local per-package configuration options.
* Precompilation is triggered when package options are changed.
* Minimal dependency (`PkgOptionsLoader`) for a package to support
  package options.

## Installation

```
pkg> add https://github.com/tkf/PkgOptionsLoader.jl.git

pkg> add https://github.com/tkf/PkgOptions.jl.git

pkg> add https://github.com/tkf/PkgOptionsDemo.jl.git  # a demo
```

## Usage

### End-users

Use `PkgOptions.set(pkg; ...)` to configure package options for package `pkg`:

```julia
julia> using PkgOptions

julia> PkgOptions.set(:PkgOptionsDemo, some_option=true)

julia> using PkgOptionsDemo
       PkgOptionsDemo.pkgoptions
[ Info: Precompiling PkgOptionsDemo [bb3b8621-5970-400b-8acd-051caadabee1]
Dict{String,Any} with 1 entry:
  "some_option" => true
```

Note that package options are precompile-time options.  You need to reload
package to re-configure it.

To use the default option, remove the package option by:

```julia
julia> PkgOptions.rm(:PkgOptionsDemo)
```

See more details in the documentation.

### Package authors

To support package options, use `PkgOptionsLoader.@load` to load
package options (a `Dict{String,Any}`).  For example,
PkgOptionsDemo.jl used above in the demo is defined as

```julia
module PkgOptionsDemo
using PkgOptionsLoader
const pkgoptions = PkgOptionsLoader.@load
end
```

See more details in the `PkgOptionsLoader.@load` documentation.

## How it works

`PkgOptions.set`, `PkgOptionsLoader.@load`, etc. read and write the
package options in a TOML file at

```
~/.julia/options/$project_slug/$package_slug/$package_name.toml
```

where

* `$project_slug` is a hash determined by the project path (`Base.active_project()`).
* `$package_slug` is a hash determined by the UUID of the package
  whose options are configured.
* `$package_name` is the name of the package whose options are
  configured.
* `~/.julia` may be different if you configure `Base.DEPOT_PATH[1]`

Changing the TOML file triggers precompilation using
`Base.include_dependency` mechanism.
