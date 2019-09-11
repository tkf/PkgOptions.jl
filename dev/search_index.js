var documenterSearchIndex = {"docs":
[{"location":"#PkgOptions.jl-1","page":"Home","title":"PkgOptions.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Modules = [PkgOptions, PkgOptionsLoader]","category":"page"},{"location":"#PkgOptions.PkgOptions","page":"Home","title":"PkgOptions.PkgOptions","text":"PkgOptions: package configuration system for Julia\n\n(Image: Stable) (Image: Dev) (Image: Build Status) (Image: Codecov) (Image: Coveralls)\n\nFeatures\n\nProject/environment-local per-package configuration options.\nPrecompilation is triggered when package options are changed.\nMinimal dependency (PkgOptionsLoader) for a package to support package options.\n\nInstallation\n\npkg> add https://github.com/tkf/PkgOptionsLoader.jl.git\n\npkg> add https://github.com/tkf/PkgOptions.jl.git\n\npkg> add https://github.com/tkf/PkgOptionsDemo.jl.git  # a demo\n\nUsage\n\nEnd-users\n\nUse PkgOptions.set(pkg; ...) to configure package options for package pkg:\n\njulia> using PkgOptions\n\njulia> PkgOptions.set(:PkgOptionsDemo, some_option=true)\n\njulia> using PkgOptionsDemo\n       PkgOptionsDemo.pkgoptions\n[ Info: Precompiling PkgOptionsDemo [bb3b8621-5970-400b-8acd-051caadabee1]\nDict{String,Any} with 1 entry:\n  \"some_option\" => true\n\nNote that package options are precompile-time options.  You need to reload package to re-configure it.\n\nTo use the default option, remove the package option by:\n\njulia> PkgOptions.rm(:PkgOptionsDemo)\n\nSee more details in the documentation.\n\nPackage authors\n\nTo support package options, use PkgOptionsLoader.@load to load package options (a Dict{String,Any}).  For example, PkgOptionsDemo.jl used above in the demo is defined as\n\nmodule PkgOptionsDemo\nusing PkgOptionsLoader\nconst pkgoptions = PkgOptionsLoader.@load\nend\n\nSee more details in the PkgOptionsLoader.@load documentation.\n\nHow it works\n\nPkgOptions.set, PkgOptionsLoader.@load, etc. read and write the package options in a TOML file at\n\n~/.julia/options/$project_slug/$package_slug/$package_name.toml\n\nwhere\n\n$project_slug is a hash determined by the project path (Base.active_project()).\n$package_slug is a hash determined by the UUID of the package whose options are configured.\n$package_name is the name of the package whose options are configured.\n~/.julia may be different if you configure Base.DEPOT_PATH[1]\n\nChanging the TOML file triggers precompilation using Base.include_dependency mechanism.\n\n\n\n\n\n","category":"module"},{"location":"#PkgOptions.load","page":"Home","title":"PkgOptions.load","text":"PkgOptions.load(pkg::Symbol)\n\n\n\n\n\n","category":"function"},{"location":"#PkgOptions.rm","page":"Home","title":"PkgOptions.rm","text":"PkgOptions.rm(pkg::Symbol)\n\nRemove package options (use the defaults) of package pkg.\n\n\n\n\n\n","category":"function"},{"location":"#PkgOptions.set","page":"Home","title":"PkgOptions.set","text":"PkgOptions.set(pkg::Symbol, options::Pair...)\nPkgOptions.set(pkg::Symbol; options...)\n\nSet and/or add options to package options for package pkg.\n\nPkgOptions.set(pkg::Symbol, options::AbstractDict)\n\nSet package options of package pkg to options, removing the ones not specified by options.\n\n\n\n\n\n","category":"function"},{"location":"#PkgOptionsLoader.@load-Tuple{}","page":"Home","title":"PkgOptionsLoader.@load","text":"PkgOptionsLoader.@load\n\nLoad package options for current module at expansion time.  It evaluates to a Dict.  It is recommended to load it at the top level of your package module:\n\nconst pkgoptions = PkgOptionsLoader.@load\n\nIt also is a good idea to verify options and then assign it to a const:\n\nget!(pkgoptions, \"FEATURE_FLAG\", false)  # default\n\nif !(pkgoptions[\"FEATURE_FLAG\"] isa Bool)\n    error(\"some helpful error message\")\nend\n\nconst FEATURE_FLAG::Bool = pkgoptions[\"FEATURE_FLAG\"]\n\n\n\n\n\n","category":"macro"}]
}