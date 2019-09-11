module PkgOptions

using Base: PkgId
using Pkg: TOML
using PkgOptionsLoader: optionspath
using UUIDs

aspkgid(pkg::PkgId) = pkg
aspkgid((name, uuid)::Tuple{Symbol, Any}) = PkgId(UUID(uuid), String(name))
aspkgid(pkg::Symbol) = Base.identify_package(String(pkg))

function _optionspath(pkg)
    pkgid = aspkgid(pkg)
    if pkgid === nothing
        error("Package $pkg cannot be identified.  Please check that package ",
              pkg, " is installed and importable.")
    end
    return optionspath(pkgid)
end

function load(pkg)
    tomlpath = _optionspath(pkg)
    if tomlpath === nothing || !isfile(tomlpath)
        return Dict{String,Any}()
    end
    return TOML.parsefile(tomlpath)
end

function set(pkg, options::AbstractDict)
    tomlpath = _optionspath(pkg)
    dirpath = dirname(tomlpath)
    isdir(dirpath) || mkpath(dirpath)
    open(tomlpath, "w") do io
        TOML.print(io, options)
    end
    return nothing
end

function set(pkg, option::Pair, options::Pair...)
    stroptions = (string(key) => value for (key, value) in (option, options...))
    newoptions = foldl(push!, stroptions; init=load(pkg))
    set(pkg, newoptions)
end

function set(pkg; options...)
    if isempty(options)
        error("Require options: `set(pkg; OPTION_1=VALUE_1, ...)`")
    end
    set(pkg, options...)
end

rm(pkg) = Base.rm(_optionspath(pkg), force=true)

"""
    PkgOptions.set(pkg::Symbol, options::Pair...)
    PkgOptions.set(pkg::Symbol; options...)

Set and/or add `options` to package options for package `pkg`.

    PkgOptions.set(pkg::Symbol, options::AbstractDict)

Set package options of package `pkg` to `options`, removing the ones not
specified by `options`.
"""
function set end

"""
    PkgOptions.rm(pkg::Symbol)

Remove package options (use the defaults) of package `pkg`.
"""
function rm end

"""
    PkgOptions.load(pkg::Symbol)
"""
function load end

end # module
