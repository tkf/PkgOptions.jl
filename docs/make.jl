using Documenter, PkgOptions, PkgOptionsLoader

makedocs(;
    modules=[PkgOptions],
    format=Documenter.HTML(),
    pages=[
        "Home" => "index.md",
    ],
    repo="https://github.com/tkf/PkgOptions.jl/blob/{commit}{path}#L{line}",
    sitename="PkgOptions.jl",
    authors="Takafumi Arakaki <aka.tkf@gmail.com>",
)

deploydocs(;
    repo="github.com/tkf/PkgOptions.jl",
)
